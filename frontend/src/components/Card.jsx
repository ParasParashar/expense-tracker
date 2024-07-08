import { FaLocationDot } from "react-icons/fa6";
import { BsCardText } from "react-icons/bs";
import { MdOutlinePayments } from "react-icons/md";
import { FaSackDollar } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { HiPencilAlt } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { DELETE_TRANSACTION } from "../graphql/mutations/transaction.mutation";
import toast from "react-hot-toast";
import { formatDate } from "../utils/date";

const categoryColorMap = {
  saving: "from-green-700 to-green-400",
  expense: "from-pink-800 to-pink-600",
  investment: "from-blue-700 to-blue-400",
};

const Card = ({ item, authUser }) => {
  const [deleteTransaction, { loading }] = useMutation(DELETE_TRANSACTION, {
    refetchQueries: ["GetTransactions", "GetTransactionStatus"],
  });
  const cardClass = categoryColorMap[item.category];
  const handleDelete = async () => {
    try {
      await deleteTransaction({ variables: { transactionId: item._id } });
      toast.success("Transaction deleted successfully");
    } catch (error) {
      console.log("error in deleting transaction", error.message);
    }
  };

  return (
    <div className={`rounded-md p-4 bg-gradient-to-br ${cardClass}`}>
      <div className="flex flex-col gap-3">
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-lg font-bold text-white">
            {item.category[0].toUpperCase() + item.category.slice(1)}
          </h2>
          <div className="flex items-center gap-2">
            <button disabled={loading} onClick={handleDelete}>
              <FaTrash className={"cursor-pointer"} onClick={handleDelete} />
            </button>
            <Link to={`/transaction/${item._id}`}>
              <HiPencilAlt className="cursor-pointer" size={20} />
            </Link>
          </div>
        </div>
        <p className="text-white flex items-center gap-1">
          <BsCardText />
          Description:{" "}
          {item.description[0].toUpperCase() + item.description.slice(1)}
        </p>
        <p className="text-white flex items-center gap-1">
          <MdOutlinePayments />
          Payment Type: {item.paymentType}
        </p>
        <p className="text-white flex items-center gap-1">
          <FaSackDollar />
          Amount: {item.amount}
        </p>
        <p className="text-white flex items-center gap-1">
          <FaLocationDot />
          Location: {item.location}
        </p>
        <div className="flex justify-between items-center">
          <p className="text-xs text-black font-bold">
            {formatDate(item.date)}
          </p>
          <img
            src={authUser?.profilePicture}
            className="h-8 w-8 border rounded-full"
            alt="Avatar Image"
          />
        </div>
      </div>
    </div>
  );
};
export default Card;
