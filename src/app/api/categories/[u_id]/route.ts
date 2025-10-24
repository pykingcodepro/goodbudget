import connectDB from "@/client";
import { Category, User } from "@/models/models";
import { NextRequest, NextResponse } from "next/server";

const MONGODB_URI = process.env.MONGODB_URI as string;
const MONGODB_NAME = process.env.MONGODB_NAME as string;

export const GET = async(
    req: NextRequest,
    { params } : { params: Promise<{ u_id: string }> }
) => {

    try {
        await connectDB(MONGODB_URI, MONGODB_NAME);
        const { u_id } = await params;
        const categories = await Category.find({ u_id: u_id });
        return NextResponse.json({ categories: categories }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }

}

export const POST = async(
    req: NextRequest,
    { params } : { params: Promise<{ u_id: string }> }
) => {
    try {
        await connectDB(MONGODB_URI, MONGODB_NAME);
        const { u_id } = await params;
        const { c_name, c_type } = await req.json() as { c_name: string, c_type: string };
        
        //Check if user exist
        const user = await User.findById(u_id);
        if(!user) return NextResponse.json({ msg: "User doesn't exist" }, { status: 404 });

        if(c_name === "" || c_type === "")
            return NextResponse.json({ msg: "Fields are incomplete" }, { status: 500 });

        const newCat = await Category.insertOne({ u_id: u_id, c_name: c_name, c_type: c_type });
        return NextResponse.json({ newCat: newCat }, { status: 200 });


    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}