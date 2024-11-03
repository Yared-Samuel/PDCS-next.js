"use client";
import moment from "moment";
import React from "react";

export default function Home() {
  const [error, setError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [transactions, setTransactions] = React.useState([]);

  React.useEffect(() => {
    const fetchPayments = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/transactions", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        setTransactions(data);
      } catch (error) {
        setError(error);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPayments();
  }, []);
  return (
    <div className="gap-2 md:w-1/2">
      <h2 className="text-[#EEEBE3]  text-sm md:text-2xl font-bold font-roboto">
        Transactions
      </h2>
      
      {transactions.map((transaction) => (
        <div
          key={transaction._id}
          className="collapse collapse-arrow bg-[#EEEBE3] border border-gray-500 m-0 p-0"
        >

          <input type="radio" name="my-accordion-2" defaultChecked />
          <ul className="collapse-title text-[10px] md:text-[15px] font-medium flex justify-between items-center m-0 px-10">
            <li>{moment(transaction.date).format("ll")}</li>
            <li>{transaction.item.name}</li>
            <li>{transaction.salesOrder}</li>
          </ul>
          <div className="collapse-content bg-[#EEEBE3]  px-5 text-left text-[10px] md:text-[15px]  ">
            <table className="table-auto table-xs w-full">
              <thead>
                <tr className="text-[#845ec2]">
                  <th>Date</th>
                  <th>GRN</th>
                  <th>Delivered</th>
                </tr>
              </thead>
              <tbody>
              {transaction.delivery.map((del) => (
                <tr key={del._id} className="text-[#4d8076]">
                  <td>{moment(del.date).format("ll")}</td>
                  <td>{del.grn}</td>
                  <td>{del.quantity}</td>
                </tr>
                ))}
              </tbody>
            </table>
            
          </div>





          
        </div>
      ))}
    </div>
  );
}
