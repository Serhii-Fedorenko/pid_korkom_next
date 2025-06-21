export async function POST() {
  return new Response(null, {
    status: 204,
    headers: {
      "Set-Cookie": "token=; Max-Age=0; Path=/; HttpOnly; SameSite=Lax",
    },
  });
}
