import { getCookies } from "@/lib/getCookies";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const GET = async(_req: NextRequest) => {
    try {
        const token = await getCookies("token");
        if (!token) return NextResponse.json({ msg: "Invalid Credentials" }, { status: 403 });
        const { u_id } = await jwt.decode(token) as { u_id: string };
        return u_id 
        ? NextResponse.json({ u_id: u_id }, { status: 200 })
        : NextResponse.json({ msg: "Incomplete Credentials"}, { status: 403 });
    } catch (error) {
        
    }
}