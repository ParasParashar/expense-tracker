import { useQuery } from "@apollo/client";
import React from "react";
import { GET_TRANSACTIONS } from "../graphql/queries/transaction.query";
import { FaSpinner } from "react-icons/fa6";
import { GET_AUTHENTICATED_USER } from "../graphql/queries/user.query";
import { Suspense } from "react";

const Cards = () => {
  const { loading, data } = useQuery(GET_TRANSACTIONS);
  const { data: authUserData } = useQuery(GET_AUTHENTICATED_USER);
  const Card = React.lazy(() => import("./Card"));
  return (
    <div className="w-full px-10 min-h-[40vh]">
      <p className="text-5xl font-bold text-center my-10">Records</p>
      {loading && <FaSpinner className=" animate-spin  mx-auto text-xl" />}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start mb-20">
        {data?.transactions?.map((item) => (
          <Suspense fallback="loading..">
            <Card
              key={item._id}
              item={item}
              authUser={authUserData?.authUser}
            />
          </Suspense>
        ))}
      </div>
    </div>
  );
};
export default Cards;
