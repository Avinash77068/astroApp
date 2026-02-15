import { lightTheme } from './lightTheme';
import { darkTheme } from './darkTheme';

export { lightTheme, darkTheme };
export type { Theme } from './lightTheme';

export const getTheme = (isDark: boolean) => (isDark ? darkTheme : lightTheme);
