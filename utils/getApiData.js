import axios from 'axios';

const EMPTY_RESULT = { data: [] };

export async function getApiData(path, fallback = EMPTY_RESULT) {
  const baseUrl =
    process.env.baseUrl ||
    process.env.BASE_URL ||
    process.env.NEXT_PUBLIC_BASE_URL;

  if (!baseUrl) {
    console.warn(`Missing API base URL for ${path}`);
    return fallback;
  }

  try {
    const res = await axios.get(`${baseUrl}${path}`, {
      validateStatus: () => true,
    });

    if (res.status < 200 || res.status >= 300) {
      console.warn(`Failed to fetch ${path}: ${res.status} ${res.statusText}`);
      return fallback;
    }

    return res.data;
  } catch (error) {
    console.warn(`Failed to fetch ${path}:`, error);
    return fallback;
  }
}
