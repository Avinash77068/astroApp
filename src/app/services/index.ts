// Simple API call function
// const BaseUrl = 'https://astro-ai-backend-smoky.vercel.app/api';

import { ENV } from "../../config/env";

export const fetchHomepage = async ({
  endpoint,
}: {
  endpoint: string;
}): Promise<any> => {
  try {
    const response = await fetch(`${ENV.API_BASE_URL}${endpoint}`);
    const result = await response.json();
    console.log('result', result);
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const astroLoger = async ({
  endpoint,
}: {
  endpoint: string;
}): Promise<any> => {
  try {
    const response = await fetch(`${ENV.API_BASE_URL}${endpoint}`);
    const result = await response.json();
    console.log('result', result);
    return result.data;
  } catch (error) {
    throw error;
  }
};


export const userChat = async (
  endpoint: string,
  body: {
    userId: string;
    message: string;
    astrologerId: string;
  },
): Promise<any> => {
  try {
    const response = await fetch(
      `${ENV.API_BASE_URL}${endpoint}`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      },
    );
    const result = await response.json();
    console.log('result', result);
    return result;
  } catch (error) {
    throw error;
  }
};

export const getChatHistory = async (
  endpoint: string,
  body: {
    userId: string;
    astrologerId: string;
  },
): Promise<any> => {
  try {
    const response = await fetch(
      `${ENV.API_BASE_URL}${endpoint}`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      },
    );
    const result = await response.json();
    console.log('Chat history response:', result);
    return result;
  } catch (error) {
    console.error('Error fetching chat history:', error);
    throw error;
  }
};
