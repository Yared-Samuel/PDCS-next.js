import connect from "../../utils/db";
import { NextResponse } from "next/server";
import Inventory from "../../models/Inventory";

export const GET = async (request: any) => {
  await connect();
  try {
    const inventories = await Inventory.find({
      $or: [{ status: "untouched" }, { status: "pending" }],
    }).populate(["item"]);
    return new NextResponse(JSON.stringify(inventories), { status: 200 });
  } catch (err: any) {
    return new NextResponse(err, { status: 500 });
  }
};
