import { formatMonth, formatValue } from "./util";

describe('Testes para funções util.ts', ()=> {
  
  it('Deve formatar o valor em Real', ()=> {

    expect(formatValue(103)).toContain('R$');
    
  });


})