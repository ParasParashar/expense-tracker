import { useQuery } from "@apollo/client";
import Card from "./Card";
import { GET_TRANSACTIONS } from "../graphql/queries/transaction.query";
import { FaSpinner } from "react-icons/fa6";

const Cards = () => {
  const { loading, data } = useQuery(GET_TRANSACTIONS);
  return (
    <div className="w-full px-10 min-h-[40vh]">
      <p className="text-5xl font-bold text-center my-10">History</p>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start mb-20">
        {loading && <FaSpinner className=" animate-spin  text-xl" />}
        {data?.transactions?.map((item) => (
          <Card key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};
export default Cards;
