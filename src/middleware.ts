import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const token = req.cookies.get("token")?.value;
    console.log("Hello There");

    if(pathname !== "/login") {
        if(!token) return NextResponse.redirect(new URL("/login", req.url));
        try {
            await jwtVerify(token, JWT_SECRET);
            return NextResponse.next();
        } catch (error) {
            return NextResponse.json({ msg: "Invalid token" }, {status: 401});
        }
    }

    // middleware for /login path
    if(!token) return NextResponse.next();
    try {
        await jwtVerify(token, JWT_SECRET);
        return NextResponse.redirect(new URL("/", req.url));
    } catch (error) {
        req.cookies.clear();
        return NextResponse.next();
    }


    
}

export const config = {
    matcher: ["/", "/login"]
}