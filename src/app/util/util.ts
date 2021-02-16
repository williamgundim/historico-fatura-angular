import { MonthDescription } from "./despesas";

  /** formatValue
   * Função para formatar o valor para exibição
   * @param nValue
   * @return exemplo: R$ 102,00 
   */
  export function formatValue(nValue:number){
    return nValue.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
  }

  /** formatMonth
   * Função para formatar o mês
   * @param nMonth 
   * @return description
   */
  export function formatMonth(nMonth:number){
    return MonthDescription(nMonth);
  }