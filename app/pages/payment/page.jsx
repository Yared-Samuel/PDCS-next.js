"use client";
import React from "react";
import { useRouter } from "next/navigation";
import moment from "moment";
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import "datatables.net-select-dt";
import "datatables.net-responsive-dt";
import Link from "next/link";
import { TbTruckDelivery } from "react-icons/tb";
import Loading from "../../loading";
const PaymentForm = () => {
  const [error, setError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
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

  React.useEffect(() => {
    const fetchPayments = async () => {
      setIsLoading(true);
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
        setError(error);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

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
      return data;
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  React.useEffect(() => {
    const fetchItems = async () => {
      const items = await itemList();
      setItems(items);
    };
    fetchItems();
  }, []);
  return (
    <>
      <div className="card bg-base-200 w-full shadow-xl mb-2">
        
          <h2 className="card-title">Payment Form</h2>
          <form onSubmit={handleSubmit} className="flex flex-col ">
            <div className="md:flex md:justify-between text-[10px]">
              <div className="flex gap-1 md:flex-col">
                <select
                  id="item"
                  name="item"
                  className="select select-bordered w-full"
                >
                  <option value="">Select an item</option>
                  {items.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  ))}
                </select>

                <label className="input input-bordered flex items-center gap-2 w-1/2 md:w-full">
                  Date
                  <input type="date" id="date" name="date" className="grow" />
                </label>
              </div>
              <div className="flex gap-1 md:flex-col">
                <label className="input input-bordered flex items-center gap-2 w-1/2 md:w-full">
                  Quantity
                  <input
                    className="grow"
                    type="number"
                    id="quantity"
                    name="quantity"
                  />
                </label>
                <label className="input input-bordered flex items-center gap-2 w-1/2 md:w-full">
                  Sales Order
                  <input
                    className="grow"
                    type="number"
                    id="salesOrder"
                    name="salesOrder"
                  />
                </label>
              </div>
              <div className="flex gap-1 md:flex-col">
                <label className="input input-bordered flex items-center gap-2 w-1/2 md:w-full">
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
                  className="select select-bordered w-full"
                >
                  <option value="paid">paid</option>
                  <option value="free">free</option>
                </select>
              </div>
            </div>

            <div className="flex gap-2 justify-between"></div>

            <div className="card-actions justify-end">
              <button className="btn btn-primary" type="submit">
                Submit Payment
              </button>
            </div>
          </form>
        
      </div>

      <div className="card bg-base-200 w-full shadow-xxl overflow-x-auto p-4">
        <h2 className="card-title">Payments</h2>
        {isLoading && <Loading />}
        {!isLoading && (
          <DataTable className="display table  table-auto text-[8px] md:text-[15px]">
            <thead>
              <tr className="text-[7px] md:text-[15px]  ">
                <th>Date</th>
                <th>Item</th>
                <th>Quantity</th>
                <th>Payment</th>
                <th>Type</th>
                <th>Sles Order</th>
                <th>Deliver</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment._id} className="n gap-0">
                  <td>{moment(payment.date).format("ll")}</td>
                  <td>{payment.item.name}</td>
                  <td>{payment.quantity}</td>
                  <td>{payment.paymentDetail}</td>
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
        )}
      </div>
    </>
  );
};

export default PaymentForm;
