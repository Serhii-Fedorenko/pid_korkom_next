export async function POST(request) {
  const body = await request.json();

  const res = await fetch(
    "https://pid-korkom-api.onrender.com/api/auth/register",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  );

  if (!res.ok) {
    const err = await res.json();
    return new Response(JSON.stringify({ message: err.message }), {
      status: res.status,
      headers: { "Content-Type": "application/json" },
    });
  }

  const user = await res.json();

  const loginRes = await fetch(
    "https://pid-korkom-api.onrender.com/api/auth/login",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: body.email, password: body.password }),
    }
  );

  const loginData = await loginRes.json();

  return new Response(JSON.stringify(loginData.user), {
    status: 200,
    headers: {
      "Set-Cookie": `token=${loginData.token}; HttpOnly; Path=/; Max-Age=43200; SameSite=Lax`,
      "Content-Type": "application/json",
    },
  });
}
