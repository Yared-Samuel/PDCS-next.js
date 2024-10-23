"use client"
import moment from "moment";
import React from "react"
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
        setError(error)
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPayments();
  }, []);
  console.log(transactions)
  return (
    <div className="gap-2">
      <h2 className="text-2xl font-bold">Transactions</h2>
    {transactions.map((transaction)=> (
      <div key={transaction._id}  className="collapse collapse-arrow bg-base-200 border border-gray-500">
      <input type="radio" name="my-accordion-2" defaultChecked />
      <ul className="collapse-title text-xl font-medium flex justify-between items-center  border border-teal-200">
        <li>{moment(transaction.date).format("ll")}</li>
        <li>{transaction.item.name}</li>
        <li>{transaction.salesOrder}</li>
        <li>{transaction.quantity}</li>
        <li>{transaction.status}</li>
      </ul>
      <div className="collapse-content bg-accent p-4 px-10">
        { transaction.delivery.map((del)=> (
          <ul key={del._id} className="flex gap-10 justify-around border border-gray-200">
          <li className="">{moment(del.date).format("ll")}</li>
          <li>{del.grn}</li>
          <li>{del.quantity}</li>
        </ul>
        )) }
        
      </div>
    </div>
    ))}
      
    </div>
  );
}
