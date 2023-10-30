export async function GET(url) {
  const res = await fetch(url);
  if (!res.ok) return [];
  else return res.json();
}

export async function POST(url, payload) {}

export async function PATCH(url, payload) {}

export async function DELETE(url) {
  await fetch(url, { method: 'delete' });
}
