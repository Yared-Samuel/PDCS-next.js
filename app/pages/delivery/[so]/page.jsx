"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";



const Deliver = ( params ) => {
  const [getPayment, setGetPayment] = useState([]);
  const router = useRouter();

  const { so } = params.params;
  console.log(so);

  const getPaymentBySo = async ( so ) => {
    console.log(so)
    try {
      const res = await fetch(`/api/payments/${so}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res)
      if (!res.ok) {
        throw new Error("Failed to fetch Payment");
      }
      const payment = await res.json();
      console.log(payment);
      setGetPayment(payment);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getPaymentBySo(so);
  }, [so]);
  console.log(getPayment)
  const handleSubmit = async (e) => {
    // e.preventDefault();
    const newDate = e.target[0].value;
    const newQuantity = e.target[1].value;
    const newGrn = e.target[2].value;

    const {
      date,
      item,
      quantity,
      salesOrder,
      paymentDetail,
      freeOrPaid,
      status,
      delivery,
    } = getPayment.payment;
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
      console.log(res);
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
    <>
      <div className="stats shadow flex justify-center">
        <div className="stat place-items-center">
          <div className="stat-title">Item</div>
          <div className="stat-value">{getPayment.payment}</div>
          {/* <div className="stat-desc">From January 1st to February 1st</div> */}
        </div>

        <div className="stat place-items-center">
          <div className="stat-title">Remaining @ BGI</div>
          <div className="stat-value text-secondary">4400</div>
          {/* <div className="stat-desc text-secondary">↗︎ 40 (2%)</div> */}
        </div>

        <div className="stat place-items-center">
          <div className="stat-title">Delivered</div>
          <div className="stat-value">2200</div>
          <div className="stat-desc">09-02-2024</div>
        </div>
      </div>



      <div className="flex justify-center">
      <div className="card bg-base-200 w-2/3 shadow-xl mb-6 ">
        <div className="card-body">
          <h2 className="card-title">Delivery</h2>
          <form onSubmit={handleSubmit(e => e.preventDefault())} className="flex flex-col gap-2">
            
          <label className="input input-bordered flex items-center gap-2 w-2/4">
          Date
              <input type="date" id="date" name="date" placeholder="Date" className="grow"/>
              </label>
            
              <label className="input input-bordered flex items-center gap-2 w-2/4">
              Quantity
              <input
                type="number"
                id="quantity"
                name="quantity"
                placeholder="Quantity"
                className="grow"
              />
              </label>
            
              <label className="input input-bordered flex items-center gap-2 w-2/4">
              GRN
              <input type="number" id="grn" name="grn" placeholder="GRN" className="grow"/>
              </label>
              <div className="card-actions justify-end">
            <button className="btn btn-primary" type="submit">Submit</button>
            </div>
          </form>
        </div>
        </div>



        <div className="w-1/3">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Job</th>
        <th>Favorite Color</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      <tr>
        <th>1</th>
        <td>Cy Ganderton</td>
        <td>Quality Control Specialist</td>
        <td>Blue</td>
      </tr>
      {/* row 2 */}
      <tr>
        <th>2</th>
        <td>Hart Hagerty</td>
        <td>Desktop Support Technician</td>
        <td>Purple</td>
      </tr>
    </tbody>
  </table>
</div>
      </div>
    </>
  );
};

export default Deliver;
