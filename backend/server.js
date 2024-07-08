import express from "express";
import http from "http";
import dotenv from "dotenv";
import cors from "cors";
// apllo server imports
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import passport from "passport";
import connectMongo from "connect-mongodb-session";
import session from "express-session";

// file imports
import mergedResolvers from "./resolvers/index.js";
import mergedTypeDefs from "./typeDefs/index.js";
import connectToMongoDb from "./db/connectDb.js";
import { buildContext } from "graphql-passport";
import { configurePassport } from "./passport/passport.config.js";

dotenv.config();
configurePassport();

const app = express();
const httpServer = http.createServer(app);

// creating store for the mongoDB session
const MongoDBStore = connectMongo(session);

const store = new MongoDBStore({
  uri: process.env.MONOGDB_URL,
  collection: "sessions",
});
store.on("error", (err) => console.error("Mongodb store error: " + err));
// setting up the mongoDB session middeware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    },
    store: store,
  })
);
app.use(passport.initialize());
app.use(passport.session());
// setting up the graphql server
const server = new ApolloServer({
  typeDefs: mergedTypeDefs,
  resolvers: mergedResolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();

// Set up our Express middleware to handle CORS, body parsing,
// and our expressMiddleware function.
app.use(
  "/graphql",
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
  express.json(),
  // expressMiddleware accepts the same arguments:
  // an Apollo Server instance and optional configuration options
  expressMiddleware(server, {
    context: async ({ req, res }) => buildContext({ req, res }),
  })
);

// Modified server startup
await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
await connectToMongoDb();

console.log(`🚀 Server ready at http://localhost:4000/graphql`);
