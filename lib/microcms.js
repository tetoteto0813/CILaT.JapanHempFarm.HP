export async function fetchNewsList() {
  const endpoint = 'https://cilatcontents.microcms.io/api/v1/news';
  const apiKey = process.env.MICROCMS_API_KEY;
  const res = await fetch(endpoint, {
    headers: { 'X-API-KEY': apiKey }
  });
  if (!res.ok) throw new Error('Failed to fetch news list');
  return await res.json();
}

export async function fetchNewsDetail(id) {
  const endpoint = `https://cilatcontents.microcms.io/api/v1/news/${id}`;
  const apiKey = process.env.MICROCMS_API_KEY;
  const res = await fetch(endpoint, {
    headers: { 'X-API-KEY': apiKey }
  });
  if (!res.ok) throw new Error('Failed to fetch news detail');
  return await res.json();
}