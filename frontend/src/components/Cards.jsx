import { useQuery } from "@apollo/client";
import React from "react";
import { FaSpinner } from "react-icons/fa6";
import {
  GET_AUTHENTICATED_USER,
  GET_USER_TRANSACTION,
} from "../graphql/queries/user.query";
import { Suspense } from "react";

const Cards = () => {
  // const { loading, data } = useQuery(GET_TRANSACTIONS);
  const { data: authUserData } = useQuery(GET_AUTHENTICATED_USER);
  // query with implementation of relationship
  const { loading, data: userTransactions } = useQuery(GET_USER_TRANSACTION, {
    variables: {
      userId: authUserData?.authUser?._id,
    },
  });

  const Card = React.lazy(() => import("./Card"));

  return (
    <div className="w-full px-10 min-h-[40vh]">
      <p className="text-5xl font-bold text-center my-10">Records</p>
      {loading && <FaSpinner className=" animate-spin  mx-auto text-xl" />}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start mb-20">
        {userTransactions?.user?.transactions?.map((item) => (
          <Suspense key={item._id} fallback="loading..">
            <Card
              key={item._id}
              item={item}
              profilePicture={userTransactions?.user?.profilePicture}
            />
          </Suspense>
        ))}
      </div>
    </div>
  );
};
export default Cards;
