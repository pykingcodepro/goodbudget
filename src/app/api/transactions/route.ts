import connectDB from "@/client";
import { Transaction } from "@/models/models";
import { NextRequest, NextResponse } from "next/server";

const MONGODB_URI = process.env.MONGODB_URI as string;
const MONGODB_NAME = process.env.MONGODB_NAME as string;

export const PUT = async(req: NextRequest) => {

  try {
    await connectDB(MONGODB_URI, MONGODB_NAME);
    const { t_id, t_party , c_id, t_mode, t_desc } = await req.json();
    console.log({ t_id, t_party , c_id, t_mode, t_desc });
    if(t_id === "" || t_party === "" || c_id === "" || t_mode === "" || t_desc === "")
      return NextResponse.json(
        { msg: "Fields are incomplete" },
        { status: 500 }
      );
    
    const newTrans = await Transaction.findByIdAndUpdate(t_id, { t_party: t_party, c_id: c_id, t_mode: t_mode, t_desc: t_desc });
    return NextResponse.json({ transactions: newTrans }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }

}