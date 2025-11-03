import { User } from "@/models/models";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ u_id: string }> }
) => {
  try {
    const { u_id } = await params;
    const user = await User.findById(u_id);
    if (!user)
      return NextResponse.json({ msg: "User not found" }, { status: 404 });
    return NextResponse.json({ u_name: user.u_name, u_email: user.u_email, u_bal: user.u_bal }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
};
