import connectDB from "@/client";
import { User } from "@/models/models";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const MONGODB_URI = process.env.MONGODB_URI as string;
const MONGODB_NAME = process.env.MONGODB_NAME as string;
const JWT_SECRET = process.env.JWT_SECRET as string;

export const POST = async (req: NextRequest) => {
  try {
    connectDB(MONGODB_URI, MONGODB_NAME);
    const { name, email, password, bal } = (await req.json()) as {
      name: string,
      email: string,
      password: string,
      bal: number,
    };

    // Check if user already exists or not
    const user = await User.findOne({ u_email: email });
    if (user)
      return NextResponse.json(
        { msg: "User with this email already exist." },
        { status: 409 }
      );

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      u_name: name,
      u_email: email,
      u_pass: hashedPassword,
      u_bal: bal,
    });

    const token = await jwt.sign({ u_id: newUser._id }, JWT_SECRET);

    return NextResponse.json({ token: token }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ msg: error }, { status: 500 });
  }
};
