import connect from "@/app/utils/db";
import { NextResponse } from "next/server";
import Inventory from "@/app/models/Inventory";
import mongoose from "mongoose";

export async function GET(request: any, { params }: any) {
    const {so} = params;
    await connect();
    const payment = await Inventory.findOne({salesOrder : so}).populate(["item"]);
    console.log("from backend")
    console.log(payment)
    return NextResponse.json({payment}, {status: 200});
}


export async function PUT(request: any,{params}: any) {
    const {so} = params;
    const { date, item, quantity, salesOrder, paymentDetail, freeOrPaid, status, delivery } = await request.json();
    await connect();
    const payment = await Inventory.findOne({salesOrder : so});
    const id = payment._id;
    
     await Inventory.findByIdAndUpdate(id, {date, item, quantity, salesOrder, paymentDetail, freeOrPaid, status, delivery});
    return NextResponse.json({message: "delivery updated"}, {status: 200});
    
}