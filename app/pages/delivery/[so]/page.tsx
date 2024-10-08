"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  params: {
    so: string;
  };
};


const Deliver = ({ params } : Props) => {
  const [getPayment, setGetPayment] = useState("");
  const router = useRouter();

  const { so } = params;

  const getPaymentBySo = async ({so} : any) => {
    try {
      const res = await fetch(`/api/payments/${so}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("Failed to fetch Payment");
      }
      const payment = await res.json()
      setGetPayment(payment);
      
    } catch (error) {
      console.log(error);
    }
  };


  React.useEffect(() => {
    getPaymentBySo(so);
  }, [so]);

    
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const newDate = e.target[0].value;
    const newQuantity = e.target[1].value;
    const newGrn = e.target[2].value;
    
    const {date, item, quantity, salesOrder, paymentDetail, freeOrPaid, status, delivery} = getPayment.payment
    try {
      const res = await fetch(`/api/payments/${so}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date,
          item,
          quantity,
          salesOrder,
          paymentDetail,
          freeOrPaid,
          status,
          delivery: [
            ...delivery,
                       {
              date: newDate,
              quantity: newQuantity,
              grn: newGrn,
            },
          ],
        }),
      });
      console.log(res)
      if (!res.ok) {
        throw new Error("Failed to fetch Payment");
      }

      router.refresh();
      router.push(`http://localhost:3000/pages/delivery/${so}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit()}>
      <div>
        <label htmlFor="date">Date</label>
        <input type="date" id="date" name="date" placeholder="Date" />
      </div>
      <div>
        <label htmlFor="quantity">Quantity</label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          placeholder="Quantity"
        />
      </div>
      <div>
        <label htmlFor="grn">GRN</label>
        <input type="number" id="grn" name="grn" placeholder="GRN" />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Deliver;
