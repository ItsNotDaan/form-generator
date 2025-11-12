export function capitalizeFirstLetter(
  text: string | undefined,
  lowercaseOtherLetters = false
): string {
  if (!text || text.length === 0) {
    return '';
  }
  if (lowercaseOtherLetters) {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }
  return text.charAt(0).toUpperCase() + text.slice(1);
}
