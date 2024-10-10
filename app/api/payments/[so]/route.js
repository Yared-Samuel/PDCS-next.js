import { NextResponse } from "next/server";
import Inventory from "../../../models/Inventory";
import connect from "../../../utils/db";
import balanceCheck from "../../utils/balanceCheck"
export async function GET(request, { params }) {
    const {so} = params;
    await connect();
    
    
    const payment = await Inventory.findOne({salesOrder : so}).populate(["item"]);
    
    return NextResponse.json(payment, {status: 200});
}


export async function PUT(request,{params}) {
    const {so} = params;
    const { date, item, quantity, salesOrder, paymentDetail, freeOrPaid, status, delivery } = await request.json();
    await connect();
    await balanceCheck(so, quantity);
    const payment = await Inventory.findOne({salesOrder : so});
    const id = payment._id;
    
     await Inventory.findByIdAndUpdate(id, {date, item, quantity, salesOrder, paymentDetail, freeOrPaid, status, delivery});
    return NextResponse.json({message: "delivery updated"}, {status: 200});
    
}