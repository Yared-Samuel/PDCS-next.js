"use client";
import React, { useState } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import moment from "moment";
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import 'datatables.net-select-dt';
import 'datatables.net-responsive-dt';
const PaymentForm = () => {
  const [error, setError] = React.useState("");
  const [items, setItems] = useState([]);
  const [payments, setPayments] = useState([]);

  DataTable.use(DT);
  const router = useRouter();


  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const item = e.target[0].value;
    const date = e.target[1].value;
    const quantity = e.target[2].value;
    const salesOrder = e.target[3].value;
    const paymentDetail = e.target[4].value;
    const freeOrPaid = e.target[5].value;

    if (!item || !date || !quantity || !salesOrder || !paymentDetail || !freeOrPaid) {
      setError("All fields are required");
      return;
    }

    try {
      const res = await fetch("/api/payments", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          item,
          date,
          quantity,
          salesOrder,
          paymentDetail,
          freeOrPaid,
        })
      })

      if(res.status === 400) {
        setError("Payment already exists")
      }if(res.status === 201) {
        setError("")
        router.push("/pages/payment")
      }
    } catch (error) {
      setError("Something went wrong")
     console.log(error)
    }
  }


  const fetchPayments = async () => {
    try {
      const res = await fetch("/api/payments", {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        },
      })
      const data = await res.json()
      setPayments(data)
    } catch (error) {
      console.log(error)
    }
  }
  React.useEffect(() => {
    fetchPayments()
  },[])
console.log(payments)
  const itemList = async () => {
    try {
      const res = await fetch("/api/items", {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        },
      })
      const data = await res.json()
      setItems(data)
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    itemList()
  }, [])
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Payment Form</h2>
      <div className={styles.inputContainer}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div>

          <div className={styles.formGroup}>
            <label htmlFor="item">Item</label>
            <select id="item" name="item">
              <option  value="" >Select an item</option>
              {items.map(item => (
                <option key={item._id} value={item._id}>{item.name}</option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="date">Date</label>
            <input type="date" id="date" name="date" placeholder="Date" />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              placeholder="Quantity"
            />
          </div>
          </div>
          <div className={styles.inputContainer}>

          <div className={styles.formGroup}>
            <label htmlFor="salesOrder">Sales Order</label>
            <input
              type="number"
              id="salesOrder"
              name="salesOrder"
              placeholder="Sales Order"
            />
          </div>
          <div className={styles.formGroup}>

            <label htmlFor="paymentDetail">Payment Detail</label>
            <input
              type="number"
              id="paymentDetail"
              name="paymentDetail"
              placeholder="Payment Detail"
            />
          </div>
          <div className={styles.formGroup}>

          <label htmlFor="freeOrPaid">Free or Paid</label>
            <select name="freeOrPaid">
              <option value="paid">paid</option>
              <option value="free">free</option>
            </select>
          </div>
          </div>
          <div className={styles.formGroup}>
          <button className={styles.button} type="submit">
            Submit Payment
          </button>
          </div>
        </form>
      </div>
      <div>
          <DataTable className={styles.styledtable}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Item</th>
                <th>Quantity</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Type</th>
                <th>Sles Order</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment._id}>
                  <td>{moment(payment.date).format('D-MM-YY')}</td>
                  <td>{payment.item.name}</td>
                  <td>{payment.quantity}</td>
                  <td>{payment.paymentDetail}</td>
                  <td>{payment.status}</td>
                  <td>{payment.freeOrPaid}</td>
                  <td>{payment.salesOrder}</td>
                </tr>
              ))}
              
           
            </tbody>
          </DataTable>
        </div>
    </div>
  );
};

export default PaymentForm;
