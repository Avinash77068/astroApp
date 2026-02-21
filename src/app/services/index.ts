// Simple API call function
const BaseUrl = 'https://astro-ai-backend-smoky.vercel.app/api';

export const fetchHomepage = async ({endpoint}: {endpoint: string}): Promise<any> => {
  const response = await fetch(`${BaseUrl}/${endpoint}`);
  if (!response.ok) throw new Error('Failed to fetch homepage data');

  const result = await response.json();
  return result.data.data;
};