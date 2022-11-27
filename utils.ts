export const setThemeColor = (
  theme: string,
  light: string,
  dark: string
): string => {
  if (theme === "light") return light;
  if (theme === "dark") return dark;
  return "";
};
