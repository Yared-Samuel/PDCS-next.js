import { NextResponse } from "next/server";
import Inventory from "../../../models/Inventory";
import connect from "../../../utils/db";
import balanceCheck from "../../utils/balanceCheck";
import statusCheck from "../../utils/statusCheck";
export async function GET(request, { params }) {
  const { so } = params;
  await connect();

  const payment = await Inventory.findOne({ salesOrder: so }).populate([
    "item",
  ]);

  return NextResponse.json(payment, { status: 200 });
}

export async function PUT(request, { params }) {
  const { so } = params;
  const {
    newQuantity,
    date,
    item,
    quantity,
    salesOrder,
    paymentDetail,
    freeOrPaid,
    delivery,
  } = await request.json();
  if(!date || !item || !quantity || !salesOrder || !paymentDetail || !freeOrPaid){
    return new NextResponse("Some fields are required", { status: 400 });
  }
  await connect();
  const payment = await Inventory.findOne({ salesOrder: so });

  const paidBalance = payment?.quantity;

  const deliveryArray = payment?.delivery;
  console.log(newQuantity)
  await balanceCheck( newQuantity, paidBalance, deliveryArray);
  const status = await statusCheck( newQuantity, paidBalance, deliveryArray)
  const id = payment._id;

  await Inventory.findByIdAndUpdate(id, {
    date,
    item,
    quantity,
    salesOrder,
    paymentDetail,
    freeOrPaid,
    status,
    delivery,
  });
  return NextResponse.json({ message: "delivery updated" }, { status: 200 });
}
