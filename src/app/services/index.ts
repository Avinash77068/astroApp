// Simple API call function
const BaseUrl = 'https://astro-ai-backend-smoky.vercel.app/api';

export const fetchHomepage = async ({endpoint}: {endpoint: string}): Promise<any> => {
  const response = await fetch(`${BaseUrl}/${endpoint}`);
  const result = await response.json();
  return result.data.data;
};

export const astroLoger =async ({endpoint}: {endpoint: string}): Promise<any> => {
  const response = await fetch(`${BaseUrl}/${endpoint}`);
  const result = await response.json();
  return result.data;
};