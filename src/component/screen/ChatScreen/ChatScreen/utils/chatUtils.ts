
import { userChat } from '../../../../../app/services';
import { USER_ID, ERROR_MESSAGE_TEXT, FALLBACK_ASTRO_RESPONSE } from '../constants/chatConstants';

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'astrologer' | 'typing';
}

export const createUserMessage = (text: string): Message => ({
  id: Date.now().toString(),
  text,
  sender: 'user',
});

export const createAstroMessage = (text: string): Message => ({
  id: Date.now().toString() + 'astro',
  text,
  sender: 'astrologer',
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
  astrologerId?: string,
) => {
  const response = await userChat('/user/chat', {
    userId: USER_ID,
    message,
    astrologerId: astrologerId || '',
  });
  return response;
};
