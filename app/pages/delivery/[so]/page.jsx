"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import moment from "moment";
import remaining from "../../../utils/remaingin";
import Loading from "../../../loading";

const Deliver = (params) => {
  const [getPayment, setGetPayment] = useState([]);
  const [remainingQuantity, setRemainingQuantity] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const { so } = params.params;

  React.useEffect(() => {
    const getPaymentBySo = async (so) => {
      setIsLoading(true);
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
        setGetPayment(payment);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    getPaymentBySo(so);
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
          newQuantity,
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
      if (!res) {
        throw new Error("Failed to fetch Payment");
      } else {
        router.refresh();
      }

      
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (getPayment) {
      const result = remaining(getPayment);
      setRemainingQuantity(result);
    }
  }, [getPayment]); 

  return (
    <>
      <div className="my-6 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-slate-300 rounded">
        <dl className="flex  justify-between -my-3 divide-y divide-gray-accent-200 ">
          <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3  text-[5px] md:text-sm">
            <dd className="badge badge-lg text-gray-700 sm:col-span-2 text-[10px] md:text-sm">
              {getPayment?.item?.name}
            </dd>
          </div>

          <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3  text-[10px] md:text-sm">
            <dt className="font-medium text-gray-900">salesOrder</dt>
            <dd className="badge badge-lg text-gray-700 sm:col-span-2 text-[10px] md:text-sm">
              {getPayment.salesOrder}
            </dd>
          </div>
          <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3  text-[10px] md:text-sm">
            <dt className="font-medium text-gray-900">Paid Quantity</dt>

            <dd className="badge badge-lg text-gray-700 sm:col-span-2 text-[10px] md:text-sm">
              {getPayment.quantity}
            </dd>
          </div>
          <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3  text-[10px] md:text-sm">
            <dt className="font-medium text-gray-900">Remaining</dt>
            <dd className="badge badge-lg text-gray-700 sm:col-span-2 text-[10px] md:text-sm">
              {remainingQuantity}
            </dd>
          </div>
        </dl>
      </div>
      <div className="flex flex-col md:flex-row justify-start">
        <div
          className={`card bg-base-200 w-full md:w-5/12 shadow-xl mb-6 ${
            remainingQuantity == 0 ? "hidden" : ""
          }`}
        >
          <div className="card-body">
            <h2 className="card-title">Delivery</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <label className="input input-bordered flex items-center gap-2 w-full">
                <input
                  type="date"
                  id="date"
                  name="date"
                  placeholder="Date"
                  className="grow"
                />
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
                <input
                  type="number"
                  id="grn"
                  name="grn"
                  placeholder="GRN"
                  className="grow"
                />
              </label>
              <div className="card-actions justify-start">
                <button className="btn btn-primary" type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="overflow-x-auto md:w-5/12 w-full">
          {isLoading && <Loading />}
          {!isLoading && (
            <table className="table table-auto  ">
              {/* head */}
              <thead className="text-center  shadow-sm">
                <tr>
                  <th className="text-start text-xs font-medium text-[#EEEBE3] uppercase ">
                    Date
                  </th>
                  <th className="text-start text-xs font-medium text-[#EEEBE3] uppercase ">
                    Grn
                  </th>
                  <th className="text-start text-xs font-medium text-[#EEEBE3] uppercase ">
                    Quantity
                  </th>
                </tr>
              </thead>
              <tbody className=" ">
                {getPayment?.delivery?.map((item) => (
                  <tr key={item._id} >
                    <td className="text-[#EEEBE3]">{moment(item.date).format("ll")}</td>
                    <td className="text-[#EEEBE3]">{item.grn}</td>
                    <td className="text-[#EEEBE3]">{item.quantity}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="text-center shadow-sm">
                <tr>
                  <th className="text-start text-xs font-medium text-[#EEEBE3] uppercase ">
                    Remaining
                  </th>
                </tr>
                <tr>
                  <td className="text-start text-xs font-medium text-[#EEEBE3] uppercase ">
                    {remainingQuantity}
                  </td>
                </tr>
              </tfoot>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Deliver;
