"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import moment from "moment";
import remaining from "../../../utils/remaingin";



const Deliver = ( params ) => {
  const [getPayment, setGetPayment] = useState([]);
  const router = useRouter();

  const { so } = params.params;

  const getPaymentBySo = async ( so ) => {
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
      const payment = await res.json();
      return payment;      
      
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    const fetchPayment = async () => {
      const payment = await getPaymentBySo(so);
      setGetPayment(payment);
    };
  
    fetchPayment();
  }, [so]);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    } = getPayment;
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


  const remain = remaining(getPayment)
  
  return (
    <>
    <div className="my-6 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-slate-300 rounded">
      
        <dl  className="flex gap-4 justify-between -my-3 divide-y divide-gray-accent-200 text-sm">
        <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
          <dd className="badge badge-lg text-gray-700 sm:col-span-2 ">{getPayment?.item?.name}</dd>
        </div>
    
        
    
        <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
          <dt className="font-medium text-gray-900">salesOrder</dt>
          <dd className="badge badge-lg text-gray-700 sm:col-span-2">{getPayment.salesOrder}</dd>
        </div>
        <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
          <dt className="font-medium text-gray-900">Paid Quantity</dt>
          
          <dd className="badge badge-lg text-gray-700 sm:col-span-2">{getPayment.quantity}</dd>
        </div>
        <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
          <dt className="font-medium text-gray-900">Remaining</dt>
          <dd className="badge badge-lg text-gray-700 sm:col-span-2">{remain}</dd>
        </div>
    
        
    
        
      </dl>
      
      
  
</div>




      <div className="flex justify-start">
      <div className="card bg-base-200 w-5/12 shadow-xl mb-6 ">
        <div className="card-body">
          <h2 className="card-title">Delivery</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            
          <label className="input input-bordered flex items-center gap-2 w-full">
          
              <input type="date" id="date" name="date" placeholder="Date" className="grow"/>
              </label>
            
              <label className="input input-bordered flex items-center gap-2 w-full">
              Quantity
              <input
                type="number"
                id="quantity"
                name="quantity"
                placeholder="Quantity"
                className="grow"
              />
              </label>
            
              <label className="input input-bordered flex items-center gap-2 w-full">
              GRN
              <input type="number" id="grn" name="grn" placeholder="GRN" className="grow"/>
              </label>
              <div className="card-actions justify-start">
            <button className="btn btn-primary" type="submit">Submit</button>
            </div>
          </form>
        </div>
        </div>



        <div className="overflow-x-auto w-7/12">
  <table className="table table-zebra table-auto  ">
    {/* head */}
    <thead className="text-center border border-base-300 shadow-sm">
      <tr>
        <th className="text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Date</th>
        <th className="text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Grn</th>
        <th className="text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Quantity</th>
      </tr>
    </thead>
    <tbody className=" dark:divide-neutral-700">
      {
        getPayment?.delivery?.map((item) => (
          <tr key={item._id}>
            <th>{moment(item.date).format('ll')}</th>
            <td>{item.grn}</td>
            <td>{item.quantity}</td>
          </tr>
        ))
      }
      
      
    </tbody>
  </table>
</div>
      </div>
    </>
  );
};

export default Deliver;
