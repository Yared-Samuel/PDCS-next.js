"use client";
import React, { useState } from "react";
import styles from "./page.module.css";
const PaymentForm = () => {
  // const [error, setError] = React.useState("");
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Payment Form</h2>
      <div>
        <form className={styles.form}>
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
          <div className={styles.formGroup}>
            <label htmlFor="salesNumber">Sales Number</label>
            <input
              type="text"
              id="salesNumber"
              name="salesNumber"
              placeholder="Sales Number"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="item">Item</label>
            <input type="text" id="item" name="item" placeholder="Item" />
          </div>

          <button className={styles.button} type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;
