export async function GET(url) {
  const res = await fetch(url);
  if (!res.ok) return [];
  else return res.json();
}

export async function POST(url, payload) {
  const res = await fetch(url, { method: 'POST' });
}

export async function PATCH(url, payload) {
  const res = await fetch(url, { method: 'PATCH' });
}

export async function DELETE(url, payload) {
  const res = await fetch(url, { method: 'DELETE' });
}
