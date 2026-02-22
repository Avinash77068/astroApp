// Simple API call function
// const BaseUrl = 'https://astro-ai-backend-smoky.vercel.app/api';
const BaseUrl = 'http://10.0.2.2:3000';

export const fetchHomepage = async ({endpoint}: {endpoint: string}): Promise<any> => {
  try {
    const response = await fetch(`${BaseUrl}${endpoint}`);
    const result = await response.json();
    console.log('result', result);
    return result.data;
  } catch (error) {
    throw error;
  }
};


export const astroLoger =async ({endpoint}: {endpoint: string}): Promise<any> => {
  try {
    const response = await fetch(`${BaseUrl}${endpoint}`);
    const result = await response.json();
    console.log('result', result);
    return result.data;
  } catch (error) {
    throw error;
  }
};