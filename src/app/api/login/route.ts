import connectDB from "@/client";
import { User } from "@/models/models";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const MONGODB_URI = process.env.MONGODB_URI as string;
const MONGODB_NAME = process.env.MONGODB_NAME as string;
const JWT_SECRET = process.env.JWT_SECRET as string;

export const POST = async(req: NextRequest) => {
    try {
        connectDB(MONGODB_URI, MONGODB_NAME);
        const { email, password } = await req.json() as { email: string, password: string };
        console.log({ email: email, password: password });

        // Check if email exists in db
        const user = await User.findOne({ u_email: email });
        console.log("User: ");
        console.log(user);
        if(!user) return NextResponse.json({ msg: "User doesn't exist." }, { status: 404 });

        // return await checkPassword(password, user.u_pass)
        // ? NextResponse.json({ msg: "Login Successfully" }, { status: 200 })
        // : NextResponse.json({ msg: "Incorrect Password" }, { status: 403 });

        if(await checkPassword(password, user.u_pass)){ 
            const token = await jwt.sign({ u_id: user._id }, JWT_SECRET);
            return NextResponse.json({ token: token }, { status: 200 });
        } else {
            return NextResponse.json({ msg: "Incorrect credentials" }, { status: 403 });
        }

    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}

async function checkPassword(givenPass: string, dbPass: string) {
    return await bcrypt.compare(givenPass, dbPass);
}
