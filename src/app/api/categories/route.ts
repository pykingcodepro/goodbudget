import connectDB from "@/client";
import { Category } from "@/models/models";
import { NextRequest, NextResponse } from "next/server";

const MONGODB_URI = process.env.MONGODB_URI as string;
const MONGODB_NAME = process.env.MONGODB_NAME as string;

export const PUT = async(req: NextRequest) => {
    try {
        connectDB(MONGODB_URI, MONGODB_NAME);
        const { c_id, c_name } = await req.json();

        if (c_id === 0 || c_name === "") {
            return NextResponse.json(
                { msg: "Fill all fields" },
                { status: 500 }
            );
        }

        const newCat = await Category.findByIdAndUpdate(c_id, { c_name: c_name });

        return NextResponse.json(
            { newCat: newCat },
            { status: 200 }
        );

    } catch (error) {
        return NextResponse.json(
            { error: error },
            { status: 500 }
        );
    }
}