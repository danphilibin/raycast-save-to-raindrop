import fetch from "node-fetch";
import getPreference from "./preferences";

export async function raindropRequest(
  url: string,
  method?: "GET" | "POST" | "PUT",
  body?: any
) {
  const key = getPreference("raindropToken");

  const res = await fetch(`https://api.raindrop.io/rest/v1${url}`, {
    method: method ?? "GET",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  }).then((res) => res.json());

  return res;
}
