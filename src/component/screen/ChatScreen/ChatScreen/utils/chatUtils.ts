
import { userChat } from '../../../../../app/services';
import { ERROR_MESSAGE_TEXT } from '../constants/chatConstants';
export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'astrologer' | 'typing';
  timestamp?: string;
}

export const createUserMessage = (text: string): Message => ({
  id: Date.now().toString(),
  text,
  sender: 'user',
  timestamp: new Date().toISOString(),
});

export const createAstroMessage = (text: string): Message => ({
  id: Date.now().toString() + 'astro',
  text,
  sender: 'astrologer',
  timestamp: new Date().toISOString(),
});

export const createTypingMessage = (): Message => ({
  id: 'typing',
  text: '',
  sender: 'typing',
});

export const createErrorMessage = (): Message => ({
  id: Date.now().toString() + 'error',
  text: ERROR_MESSAGE_TEXT,
  sender: 'astrologer',
});

export const createInitialMessage = (astrologerName?: string): Message => ({
  id: '1',
  text: astrologerName
    ? `Namaste 🙏 I'm ${astrologerName}. How can I guide you today?`
    : 'Namaste 🙏 How can I guide you today?',
  sender: 'astrologer',
});

export const sendChatMessage = async (
  message: string,
  astrologerId: string,
  userId: string,
) => {
  const response = await userChat('/user/chat', {
    userId: userId,
    message,
    astrologerId: astrologerId,
  });
  return response;
};
