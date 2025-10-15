import connectDB from "@/client";
import { NextRequest, NextResponse } from "next/server";

const MONGODB_URI = process.env.MONGODB_URI as string;
const MONGODB_NAME = process.env.MONGODB_NAME as string;

export const GET = async (req: NextRequest) => {
  try {
    connectDB(MONGODB_URI, MONGODB_NAME);
    return NextResponse.json({ msg: "Successful" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ msg: "Error", error: error }, { status: 500 });
  }
};
