import connectDB from "@/client";
import { Category, Transaction } from "@/models/models";
import { NextRequest, NextResponse } from "next/server";

const MONGODB_URI = process.env.MONGODB_URI as string;
const MONGODB_NAME = process.env.MONGODB_NAME as string;

export const GET = async(
    req: NextRequest,
    { params } : { params: { u_id: string } }
) => {

    try {
        
        await connectDB(MONGODB_URI, MONGODB_NAME);
        const { u_id } = params;
        const transactions = await Transaction.find({ u_id: u_id });
        return NextResponse.json({ transactions: transactions }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }

}