export function isValidTitle(title: string): { isValid: boolean; error: string | null } {
  const trimmed = title.trim();
  if (!trimmed) {
    return { isValid: false, error: 'O título é obrigatório.' };
  }
  if (trimmed.length < 3) {
    return { isValid: false, error: 'O título deve ter pelo menos 3 caracteres.' };
  }
  if (trimmed.length > 100) {
    return { isValid: false, error: 'O título deve ter no máximo 100 caracteres.' };
  }
  return { isValid: true, error: null };
}
