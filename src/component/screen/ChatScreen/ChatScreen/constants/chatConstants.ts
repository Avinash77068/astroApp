

export const TYPING_MESSAGE_ID = 'typing';

export const INITIAL_MESSAGE_ID = '1';

export const INITIAL_GREETING = (name?: string) =>
  name
    ? `Namaste 🙏 I'm ${name}. How can I guide you today?`
    : 'Namaste 🙏 How can I guide you today?';

export const ERROR_MESSAGE_TEXT = 'Failed to send message. Please try again.';

export const FALLBACK_ASTRO_RESPONSE = 'Sorry, I could not understand.';
