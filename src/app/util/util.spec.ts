import { compareMonths, Despesas, formatValue, MonthDescription } from "./util";

describe('Testes para funções util.ts', ()=> {
  
  it('Deve formatar o valor em Real', ()=> {

    let value: string = '';

    //Execução.
    value = formatValue(103);

    //Avaliação.
    expect(value).toContain('R$');
    
  });

  it('Deve retornar o nome do mês', ()=>{

    expect(MonthDescription(1)).toBe('Janeiro');
    expect(MonthDescription(2)).toBe('Fevereiro');
    expect(MonthDescription(3)).toBe('Março');
    expect(MonthDescription(4)).toBe('Abril');
    expect(MonthDescription(5)).toBe('Maio');
    expect(MonthDescription(6)).toBe('Junho');
    expect(MonthDescription(7)).toBe('Julho');
    expect(MonthDescription(8)).toBe('Agosto');
    expect(MonthDescription(9)).toBe('Setembro');
    expect(MonthDescription(10)).toBe('Outubro');
    expect(MonthDescription(11)).toBe('Novembro');
    expect(MonthDescription(12)).toBe('Dezembro');
    expect(MonthDescription(992)).toBe('');

});

it('Deve ordenar corretamento os meses', ()=>{

    //Preparação.
    let despesa_combustivel:Despesas = {
        categoria: 1,
        id:990,
        mes_lancamento:5,
        origem:'Combustivel',
        valor:120
    };

    let despesa_supermercado:Despesas = {
        categoria: 1,
        id:990,
        mes_lancamento:10,
        origem:'Combustivel',
        valor:90
    };

    let despesa_farmacia:Despesas = {
        categoria: 1,
        id:990,
        mes_lancamento:5,
        origem:'Combustivel',
        valor:20
    };
    

    expect(compareMonths(despesa_supermercado, despesa_combustivel)).toBe(1);
    expect(compareMonths(despesa_farmacia, despesa_combustivel)).toBe(0);
    expect(compareMonths(despesa_combustivel, despesa_supermercado)).toBe(-1);

});

})