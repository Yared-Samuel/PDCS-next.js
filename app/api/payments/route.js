import connect from "../../utils/db";
import { NextResponse } from "next/server";
import Inventory from "../../models/Inventory";
import mongoose from "mongoose";

export const POST = async (request) => {
  const { date, item, quantity, salesOrder, paymentDetail, freeOrPaid } =
    await request.json();
  if (!item || !quantity || !salesOrder || !paymentDetail || !freeOrPaid) {
    return new NextResponse("Some fields are required", { status: 400 });
  }

  await connect();

  const year = new Date().getFullYear();
  const twoDigitsYear = year.toString().slice(-2);

  const paddedSO = twoDigitsYear + salesOrder.padStart(7, "0");

  const newInventory = new Inventory({
    date,
    item: new mongoose.Types.ObjectId(item),
    quantity,
    salesOrder: paddedSO,
    paymentDetail,
    freeOrPaid,
    status: "remaining",
  });

  try {
    const result = await newInventory.save();
    if (result) {
      return new NextResponse("Payment created successfully", { status: 201 });
    } else {
      return new NextResponse("Payment already exists", { status: 400 });
    }
  } catch (err) {
    console.log(err);
    return new NextResponse(err, { status: 500 });
  }
};

export const GET = async (request) => {
  await connect();

  try {
    const inventories = await Inventory.find({ status: "remaining" }).populate([
      "item",
    ]).sort({ date: -1 });
    return new NextResponse(JSON.stringify(inventories), { status: 200 });
  } catch (err) {
    return new NextResponse(err, { status: 500 });
  }
};
