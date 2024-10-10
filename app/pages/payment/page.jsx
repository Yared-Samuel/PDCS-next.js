"use client";
import React, { useState } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import moment from "moment";
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import "datatables.net-select-dt";
import "datatables.net-responsive-dt";
import Link from "next/link";
import { TbTruckDelivery } from "react-icons/tb";
const PaymentForm = () => {
  const [error, setError] = React.useState("");
  const [items, setItems] = React.useState([]);
  const [payments, setPayments] = React.useState([]);

  DataTable.use(DT);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const item = e.target[0].value;
    const date = e.target[1].value;
    const quantity = e.target[2].value;
    const salesOrder = e.target[3].value;
    const paymentDetail = e.target[4].value;
    const freeOrPaid = e.target[5].value;

    if (
      !item ||
      !date ||
      !quantity ||
      !salesOrder ||
      !paymentDetail ||
      !freeOrPaid
    ) {
      setError("All fields are required");
      return;
    }

    try {
      const res = await fetch("/api/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          item,
          date,
          quantity,
          salesOrder,
          paymentDetail,
          freeOrPaid,
        }),
      });

      if (res.status === 400) {
        setError("Payment already exists");
      }
      if (res.status === 201) {
        setError("");
        router.push("/pages/payment");
      }
    } catch (error) {
      setError("Something went wrong");
      console.log(error);
    }
  };

  const fetchPayments = async () => {
    try {
      const res = await fetch("/api/payments", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setPayments(data);
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    fetchPayments();
  }, []);
  
  const itemList = async () => {
    try {
      const res = await fetch("/api/items", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setItems(data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    itemList();
  }, []);
  return (
    <>
      <div className="card bg-base-200 w-full shadow-xl mb-6">
        <div className="card-body">
          <h2 className="card-title">Payment Form</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex gap-2 justify-between">
              
                <select
                  id="item"
                  name="item"
                  className="select select-bordered w-1/4 max-w-xs"
                >
                  <option value="">Select an item</option>
                  {items.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              
              <label className="input input-bordered flex items-center gap-2 w-1/4">
                Date
                <input type="date" id="date" name="date" className="grow" />
              </label>
              <label className="input input-bordered flex items-center gap-2 w-1/4">
                Quantity
                <input
                  className="grow"
                  type="number"
                  id="quantity"
                  name="quantity"
                />
              </label>
            </div>

            <div className="flex gap-2 justify-between">
              <label className="input input-bordered flex items-center gap-2 w-1/4">
                Sales Order
                <input
                  className="grow"
                  type="number"
                  id="salesOrder"
                  name="salesOrder"
                />
              </label>

              <label className="input input-bordered flex items-center gap-2 w-1/4">
                Payment Detail
                <input
                  className="grow"
                  type="number"
                  id="paymentDetail"
                  name="paymentDetail"
                />
              </label>
              
                <select
                  id="item"
                  name="freeOrPaid"
                  className="select select-bordered w-1/4 max-w-xs"
                >
                  <option value="paid">paid</option>
                  <option value="free">free</option>
                </select>
            </div>

            <div className="card-actions justify-end">
              <button className="btn btn-primary" type="submit">
                Submit Payment
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="card bg-base-200 w-full shadow-xxl overflow-x-auto p-4">
      <h2 className="card-title">Payments</h2>
        <DataTable  className="display table table-xs">
          <thead>
            <tr>
              <th>Date</th>
              <th>Item</th>
              <th>Quantity</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Type</th>
              <th>Sles Order</th>
              <th>Deliver</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment._id}>
                <td>{moment(payment.date).format("ll")}</td>
                <td>{payment.item.name}</td>
                <td>{payment.quantity}</td>
                <td>{payment.paymentDetail}</td>
                <td>{payment.status}</td>
                <td>{payment.freeOrPaid}</td>
                <td>{payment.salesOrder}</td>
                <td>
                  <Link href={`/pages/delivery/${payment.salesOrder}`}>
                    <button>
                      <TbTruckDelivery size={25} color="green" />
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </DataTable>
      </div>
    </>
  );
};

export default PaymentForm;
