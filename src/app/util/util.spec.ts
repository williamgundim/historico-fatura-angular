import { formatMonth, formatValue } from "./util";

describe('Testes para funções util.ts', ()=> {

    
  it('Deve retornar o nome do mês', ()=>{

    expect(formatMonth(1)).toBe('Janeiro');
    expect(formatMonth(10)).toBe('Outubro');
    expect(formatMonth(992)).toBe('');

  });

  it('Deve formatar o valor em Real', ()=> {

    expect(formatValue(103)).toContain('R$');
    
  });


})