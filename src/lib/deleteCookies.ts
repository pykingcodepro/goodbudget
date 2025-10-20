"use server";

import { cookies } from "next/headers"

export const deleteCookies = async(key: string) => {
    const cookieStore = await cookies();
    cookieStore.delete(key);
}