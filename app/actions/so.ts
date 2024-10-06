import connect from "../utils/db";
import Inventory from "../models/Inventory";
import { NextResponse } from "next/server";



const SoAction = async (so: Number  ) => {
  connect();

  try {
    const paymentForSo = await Inventory.findOne({ salesOrder: so }).populate(["item"]);
    console.log(paymentForSo)
    const item = paymentForSo?.item._id;
    return new NextResponse(JSON.stringify(item), { status: 200 });
  } catch (err: any) {
    return new NextResponse(err, { status: 500 });
  }
};

export default SoAction;
