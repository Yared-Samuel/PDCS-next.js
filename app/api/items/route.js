import connect from "../../utils/db";
import { NextResponse } from "next/server";
import Items from "../../models/Items";

export const POST = async (request) => {
  const { name, type } = await request.json();
  if (!name || !type) {
    return new NextResponse("name and type are required", { status: 400 });
  }

  await connect();

  const existingItem = await Items.findOne({ name });
  if (existingItem) {
    return new NextResponse("Item already exists", { status: 400 });
  }

  const newItem = new Items({
    name,
    type,
  });
  
  try {
    await newItem.save();
    return new NextResponse("Item created successfully", { status: 201 });
  } catch (err) {
    return new NextResponse(err, { status: 500 });
  }
};

export const GET = async (request) => {
  await connect();
  try {
    const items = await Items.find({});
    return new NextResponse(JSON.stringify(items), { status: 200 });
  } catch (err) {
    return new NextResponse(err, { status: 500 });
    
  }
}
