"use server";

import { cookies } from "next/headers";

export async function createCookies(data: string) {
  cookies().set("token", data);
}

export async function deleteCookies(name: string) {
  cookies().delete(name);
}

export async function getCookies(name: string) {
  return cookies().get(name);
}

export async function authenticated() {
  const token = await getCookies("token");

  if (token?.value) {
    return true;
  } else {
    return false;
  }
}
