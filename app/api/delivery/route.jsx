import connect from "../../utils/db";
import { NextResponse } from "next/server";
import Inventory from "../../models/Inventory";
import mongoose from "mongoose";
import soAction from "../../actions/so";
import {ObjectId} from "mongodb";

export const POST = async (request: any) => {
  const { date,  quantity, salesOrder, deliveryDetail, freeOrPaid } =
    await request.json();
  if ( !quantity || !salesOrder || !deliveryDetail || !freeOrPaid) {
    return new NextResponse("Some fields are required", { status: 400 });
  }

  console.log(salesOrder, date,  quantity,  deliveryDetail, freeOrPaid);

  await connect();

  const toNumber = Number(salesOrder)
  console.log(typeof(toNumber))

   const items = soAction(toNumber);

  const newInventory = new Inventory({
    date,
    item: new mongoose.Types.ObjectId(items),
    quantity,
    salesOrder,
    deliveryDetail,
    transactionType: "delivery",
    freeOrPaid,
  });

  try {
    const result = await newInventory.save();
    if (result) {
      return new NextResponse("Payment created successfully", { status: 201 });
    } else {
      return new NextResponse("Payment already exists", { status: 400 });
    }
  } catch (err: any) {
    console.log(err);
    return new NextResponse(err, { status: 500 });
  }
};

export const GET = async (request: any) => {
  await connect();
  try {
    const inventories = await Inventory.find({transactionType: "delivery",}).populate(["item"]);
    return new NextResponse(JSON.stringify(inventories), { status: 200 });
  } catch (err: any) {
    return new NextResponse(err, { status: 500 });
  }
};


export const PUT = async  (request: any, id: String | Object) => {
  id = typeof id === "string" ? new ObjectId(id) : id;
}
