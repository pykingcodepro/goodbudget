import connectDB from "@/client";
import { Category, Transaction, User } from "@/models/models";
import { NextRequest, NextResponse } from "next/server";

const MONGODB_URI = process.env.MONGODB_URI as string;
const MONGODB_NAME = process.env.MONGODB_NAME as string;

export const GET = async (
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ u_id: string }>
  }
) => {
  try {
    await connectDB(MONGODB_URI, MONGODB_NAME);
    const { u_id } = await params;
    const { searchParams } = new URL(req.url);
    const noOfDaysParam: string | null = searchParams.get("noOfDays");
    const noOfDays: number = parseInt(noOfDaysParam ? noOfDaysParam : "0");

    console.log(typeof noOfDays, noOfDays);
    // eslint-disable-next-line prefer-const
    const startDate: Date = new Date();
    startDate.setDate(startDate.getDate() - noOfDays);
    console.log(startDate);
    const transactions = (
      await Transaction.find({
        u_id: u_id,
        createdAt: { $gte: startDate },
      }).populate("t_cat")
    );
    console.log(transactions);
    return NextResponse.json({ transactions: transactions }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
};

export const POST = async (
  req: NextRequest,
  { params }: { params: Promise<{ u_id: string }> }
) => {
  try {
    await connectDB(MONGODB_URI, MONGODB_NAME);
    const { u_id } = await params;
    const { t_party, t_amt, c_id, t_mode, t_desc } = await req.json();

    console.log(u_id);
    console.log({ t_party, t_amt, c_id, t_mode, t_desc });

    //Check if user exist
    const user = await User.findById(u_id);
    if (!user)
      return NextResponse.json({ msg: "User doesn't exist" }, { status: 404 });

    const category = await Category.findById(c_id);

    if (!category)
      return NextResponse.json(
        { msg: "Category doesn't exist" },
        { status: 404 }
      );

    if (
      t_party === "" ||
      t_amt === 0 ||
      c_id === "" ||
      t_mode === "" ||
      t_desc === ""
    )
      return NextResponse.json(
        { msg: "Fields are incomplete" },
        { status: 500 }
      );

    const sign = category.c_type === "income" ? +1 : -1;
    const t_new_bal = user.u_bal + sign * t_amt;

    const newTrans = await Transaction.insertOne({
      u_id: u_id,
      t_party: t_party,
      t_amt: t_amt,
      t_cat: c_id,
      t_mode: t_mode,
      t_new_bal: t_new_bal,
      t_desc: t_desc,
    });

    if (!newTrans)
      return NextResponse.json(
        { msg: "Internal Server Error" },
        { status: 500 }
      );

    await User.findByIdAndUpdate(u_id, { u_bal: t_new_bal });

    return NextResponse.json({ newTrans: newTrans }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
};
