'use client'
import React, { useState } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";


const Item = () => {
  const [error, setError] = React.useState("");
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const name = e.target[0].value;
    const type = e.target[1].value;

    if (!name || !type) {
      setError("All fields are required!");
      return;
    }

    try {
      const res = await fetch("/api/items", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          type
        })
      })

      if(res.status === 400) {
        setError("Item already exists")
      }if(res.status === 201) {
        setError("");
        router.push("/pages/item")
      }
    } catch (error) {
      setError("Something went wrong")
            console.log(error)
    }
  }

  const [items, setItems] = useState([]);

  const fetchData = async () => {
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
    fetchData()
  }, [])

  console.log(items)
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>Item Form</h2>
        <div>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Please enter name of the Item"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="salesNumber">Item Type</label>
              <select id="type" name="type">
                <option disabled value="">Please Select Type</option>
                <option value="beer">Beer (Bottle)</option>
                <option value="draft">Draft (Keg)</option>
                <option value="wine">Wine</option>
              </select>
            </div>
           
        <button type="submit" className={styles.button}>Create Item</button>
          </form>
        </div>
        <div>
          <table className={styles.styledtable}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.type}</td>
                </tr>
              ))}
              
           
            </tbody>
          </table>
        </div>
      </div>
    );
 
};

export default Item;
