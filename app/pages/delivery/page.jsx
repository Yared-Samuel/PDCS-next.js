"use client";
import React, { useState } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import moment from "moment";
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import "datatables.net-select-dt";
import "datatables.net-responsive-dt";

const DeliveryForm = () => {
  const [error, setError] = React.useState("");
  const [items, setItems] = useState([]);
  const [deliveries, setDeliveries] = useState([]);
  const [soForDel, setSoForDel] = useState([]);

  DataTable.use(DT);
  const router = useRouter();
  const fetchDeliveries = async () => {
    try {
      const res = await fetch("/api/delivery", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setDeliveries(data);
    } catch (error) {
      setError("Something went wrong");
      console.log(error);
    }
  };
  React.useEffect(() => {
    fetchDeliveries();
  }, []);

  const soList = async () => {
    try {
      const res = await fetch("/api/soForDelivery", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setSoForDel(data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    soList();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const salesOrder = e.target[0].value;
    const date = e.target[1].value;
    const quantity = e.target[2].value;
    const deliveryDetail = e.target[4].value;
    const freeOrPaid = e.target[5].value;

    if (!date || !quantity || !salesOrder || !deliveryDetail || !freeOrPaid) {
      setError("All fields are required");
      return;
    }

    console.log(salesOrder, date, quantity, deliveryDetail, freeOrPaid);

    try {
      const res = await fetch("/api/delivery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date,
          quantity,
          salesOrder,
          deliveryDetail,
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

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Delivery Form</h2>

      <div className={styles.inputContainer}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div>
            <div className={styles.formGroup}>
              <label htmlFor="salesOrder">Sales Order</label>
              <select id="salesOrder" name="salesOrder">
                <option value="">Select Sales Order</option>
                {soForDel.map((so) => (
                  <option key={so._id} value={so.salesOrder}>
                    {so.salesOrder} -- {so.item.name}
                  </option>
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
              <label htmlFor="deliveryDetail">Item</label>
              <input
                type="text"
                id="item"
                name={salesOrder[0]?.item._id}
                placeholder={salesOrder[0]?.item.name}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="deliveryDetail">Delivery Detail</label>
              <input
                type="number"
                id="deliveryDetail"
                name="deliveryDetail"
                placeholder="GRN Number"
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
              <th>Type</th>
              <th>Sales Order</th>
            </tr>
          </thead>
          <tbody>
            {deliveries.map((delivery) => (
              <tr key={delivery._id}>
                <td>{moment(delivery.date).format("DD-MM-YYYY")}</td>
                <td>{delivery.item.name}</td>
                <td>{delivery.quantity}</td>
                <td>{delivery.deliveryDetail}</td>
                <td>{delivery.salesOrder}</td>
              </tr>
            ))}
          </tbody>
        </DataTable>
      </div>
    </div>
  );
};

export default DeliveryForm;
