import connect from "../../utils/db";
import { NextResponse } from "next/server";
import Inventory from "../../models/Inventory";


export const GET = async (request) => {
  await connect();
  try {
    const inventories = await Inventory.find({}).populate(["item"]).sort({ date: -1 });
    return NextResponse.json(inventories, { status: 200 });
  } catch (err) {
    return NextResponse.json(err, { status: 500 });
  }
};