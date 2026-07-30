import sanitizeHtml from 'sanitize-html';

const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN || 'cilatcontents';
const apiKey = process.env.MICROCMS_API_KEY;
const baseUrl = `https://${serviceDomain}.microcms.io/api/v1`;

const allowedContentTags = [
  ...sanitizeHtml.defaults.allowedTags,
  'h1',
  'h2',
  'h3',
  'img',
];

const allowedContentAttributes = {
  ...sanitizeHtml.defaults.allowedAttributes,
  a: ['href', 'name', 'target', 'rel'],
  img: ['src', 'alt', 'title', 'width', 'height', 'loading'],
};

function assertMicroCMSConfig() {
  if (!apiKey) {
    throw new Error('MICROCMS_API_KEY is not set');
  }
}

function normalizeNews(news) {
  const image = news.image || news.img || news.thumbnail || null;
  const content = sanitizeHtml(news.content || news.body || news.description || '', {
    allowedTags: allowedContentTags,
    allowedAttributes: allowedContentAttributes,
    allowedSchemes: ['http', 'https', 'mailto'],
    transformTags: {
      a: sanitizeHtml.simpleTransform('a', { rel: 'noopener noreferrer' }),
    },
  });

  return {
    id: news.id,
    title: news.title || news.subject || news.name || '',
    publishedAt: news.publishedAt || news.date || news.createdAt || '',
    content,
    image,
  };
}

async function microCMSFetch(path) {
  assertMicroCMSConfig();

  const res = await fetch(`${baseUrl}${path}`, {
    headers: { 'X-MICROCMS-API-KEY': apiKey },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch microCMS: ${res.status}`);
  }

  return res.json();
}

export async function fetchNewsList() {
  const data = await microCMSFetch('/news?orders=-date&limit=50');
  return (data.contents || []).map(normalizeNews);
}

export async function fetchNewsDetail(id) {
  const data = await microCMSFetch(`/news/${id}`);
  return normalizeNews(data);
}