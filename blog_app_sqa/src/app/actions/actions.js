"use server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function getCurrentUser() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return user;
}

export async function checkPostOwnership(userEmail, postEmail) {
  return userEmail === postEmail;
}
