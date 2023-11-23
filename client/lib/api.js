export async function GET(url) {
  const res = await fetch(url);
  if (!res.ok) return { success: false, content: [] };
  else return await res.json();
}

export async function POST(url, payload) {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) return { success: false };
  return await res.json();
}

export async function PATCH(url, payload) {
  const res = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) return { success: false };
  return await res.json();
}

export async function DELETE(url, payload) {
  const res = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) return { success: false };
  return await res.json();
}
