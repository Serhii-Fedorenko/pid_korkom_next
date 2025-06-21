export async function POST(request) {
  const body = await request.json();

  const res = await fetch(
    "https://pid-korkom-api.onrender.com/api/auth/login",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  );

  if (!res.ok) {
    return new Response("Unauthorized", { status: 401 });
  }

  const data = await res.json();

  const response = new Response(JSON.stringify(data.user), {
    status: 200,
    headers: {
      "Set-Cookie": `token=${data.token}; HttpOnly; Path=/; Max-Age=43200; SameSite=Lax`,
      "Content-Type": "application/json",
    },
  });

  return response;
}
