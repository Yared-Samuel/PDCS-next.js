import connect from "../../utils/db";
import { NextResponse } from "next/server";
import Inventory from "../../models/Inventory";


export const POST = async (request: any) => {

    const { item, quantity, salesOrder, paymentDetail, transactionType } = await request.json();
    if (!item || !quantity || !salesOrder || !paymentDetail || !transactionType) {
        return new NextResponse("Some fields are required", { status: 400 });
    }

    await connect();

    const existinSO = await Inventory.findOne({ salesOrder , item });
    if (existinSO) {
        return new NextResponse("Sales Order already exists", { status: 400 });
    }

    const year = new Date().getFullYear();
    const twoDigitsYear = year.toString().slice(-2);

    const paddedSO = twoDigitsYear + salesOrder.padStart(7, '0');
    

    const newInventory = new Inventory({        
        item,
        quantity,
        salesOrder : paddedSO,
        paymentDetail,
        transactionType
    });

    console.log(newInventory);


}
