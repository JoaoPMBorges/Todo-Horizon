import { isValidTitle } from '../validation';

describe('isValidTitle', () => {
  it('deve retornar erro para título vazio', () => {
    expect(isValidTitle('')).toEqual({ isValid: false, error: 'O título é obrigatório.' });
    expect(isValidTitle('   ')).toEqual({ isValid: false, error: 'O título é obrigatório.' });
  });

  it('deve retornar erro para título com menos de 3 caracteres', () => {
    expect(isValidTitle('ab')).toEqual({ isValid: false, error: 'O título deve ter pelo menos 3 caracteres.' });
  });

  it('deve validar com sucesso um título válido', () => {
    expect(isValidTitle('Comprar pão')).toEqual({ isValid: true, error: null });
  });

  it('deve retornar erro para título com mais de 100 caracteres', () => {
    const longTitle = 'a'.repeat(101);
    expect(isValidTitle(longTitle)).toEqual({ isValid: false, error: 'O título deve ter no máximo 100 caracteres.' });
  });
});
