import { cookies } from 'next/headers'

export async function getCookieServer(){

  const cookiestorage = await cookies();
  const token = cookiestorage.get("session")?.value;

  return token || null;
}