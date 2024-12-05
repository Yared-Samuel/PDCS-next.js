'use client'
import React, { useState } from "react";
import { useRouter } from "next/navigation";


const Item = () => {
  const [error, setError] = React.useState("");
  const router = useRouter();

  const handleSubmit = async (formData) => {
    
    const name = formData.get("name")
    const type = formData.get("type")
    if (!name || !type) {
      setError("All fields are required!");
      return;
    }

    

    // try {
    //   const res = await fetch("/api/items", {
    //     method: "POST",
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //       name,
    //       type
    //     })
    //   })

    //   if (res.status === 400) {
    //     setError("Item already exists")
    //   } if (res.status === 201) {
    //     setError("");
    //     router.push("/pages/item")
    //   }
    // } catch (error) {
    //   setError("Something went wrong")
    //   console.log(error)
    // }
  }



  return (
    <div className="flex justify-between gap-10">
      <div className="card bg-base-200 w-full shadow-xl mb-6">
        <div className="card-body">
          <h2 className="card-title">Item Form</h2>
          <form className="flex flex-col gap-4" action={handleSubmit} >

            <label htmlFor="name" className="input input-bordered flex items-center gap-2 w-2/4">Name
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Please Enter Item Name"
              />
            </label>


            <select id="type" name="type" className="select select-bordered w-2/4 max-w-xs">
              <option value={null}>Please Select Type</option>
              <option value="beer">Beer (Bottle)</option>
              <option value="draft">Draft (Keg)</option>
              <option value="wine">Wine</option>
            </select>

            <div className="card-actions justify-end">

              <button type="submit" className="btn btn-primary">Create Item</button>
            </div>
          </form>
        </div>
      </div>
      {/* <div className="card bg-base-200 w-full shadow-xl mb-6 p-6">
          <table className="">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              
                <tr>
                  <td>ONE</td>
                  <td>TWO</td>
                </tr>
             
              
           
            </tbody>
          </table>
        </div> */}
    </div>
  );

};

export default Item;
