import { Transaction } from "@/models/models";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

async function getAmountByCategory(u_id: string) {
  return await Transaction.aggregate([
    {
      $match: {
        u_id: new Types.ObjectId(u_id)
      }
    },
    {
      $lookup: {
        from: "categories",           // collection name
        localField: "t_cat",          // field in transactions
        foreignField: "_id",          // field in categories
        as: "category"
      }
    },
    { $unwind: "$category" },
    {
      $group: {
        _id: "$category.c_name",
        totalAmount: { $sum: "$t_amt" }
      }
    },
    {
      $project: {
        _id: 0,
        c_name: "$_id",
        totalAmount: 1
      }
    }
  ]);
}


async function getAmountByCategoryLastNDays(u_id: string, n: number) {
  const now = new Date();
  const startDate = new Date();
  startDate.setDate(now.getDate() - n);

  return await Transaction.aggregate([
    {
      $match: {
        u_id: new Types.ObjectId(u_id),
        createdAt: { $gte: startDate, $lte: now }   // filter last N days
      }
    },
    {
      $lookup: {
        from: "categories",
        localField: "t_cat",
        foreignField: "_id",
        as: "category"
      }
    },
    { $unwind: "$category" },
    {
      $group: {
        _id: "$category.c_name",
        totalAmount: { $sum: "$t_amt" }
      }
    },
    {
      $project: {
        _id: 0,
        c_name: "$_id",
        totalAmount: 1
      }
    }
  ]);
}

export const GET = async(
    req: NextRequest,
    { params }: { params: Promise<{ u_id: string }> }
) => {
    try {
      const { u_id } = await params;
      const { searchParams } = new URL(req.url);
      const noOfDaysParam: string | null = searchParams.get("noOfDays");
      console.log(noOfDaysParam);
  
      // if noOfDaysParam is null
      if(!noOfDaysParam) {
        console.log("here too!");
        console.log(u_id)
        const res = await getAmountByCategory(u_id);
        return NextResponse.json({ result: res }, { status: 200 });
      }
  
      const noOfDays: number = parseInt(noOfDaysParam);
      const res = await getAmountByCategoryLastNDays(u_id, noOfDays);
      return NextResponse.json({ result: res }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: error }, { status: 500 });
    }
}