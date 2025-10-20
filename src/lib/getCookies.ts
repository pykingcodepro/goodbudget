"use server";

import { cookies } from "next/headers";

export const getCookies = async(key: string) => {

    const cookieStore = await cookies();
    return cookieStore.get(key)?.value;

}