export function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const startCase = (str: string): string => {
  if (!str) return '';
  return str
    .replace(/_/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

export const toHTML = (string: string) => {
  return string
  // Line breaks:
    .replace(/\n/g, '<br />')
    // Links:
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>')
    // Bold:
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Italic:
    .replace(/\*(.*?)\*/g, '<em>$1</em>');
};

export const makeKey = (...parts: (string | number | undefined)[]) => {
  return parts
    .filter(part => part)
    .join('-')
    .toLowerCase();
};

export const isExternalUrl = (url: string) =>
{
  const value = url.trim();
  return (
    value.startsWith('http://') ||
    value.startsWith('https://') ||
    value.startsWith('mailto:') ||
    value.startsWith('tel:')
  );
};
