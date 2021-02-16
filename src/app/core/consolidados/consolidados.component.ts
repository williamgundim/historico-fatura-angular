import { FormatWidth } from '@angular/common';
import { Component, OnDestroy, SimpleChanges, Input, OnChanges } from '@angular/core';
import { Subscription } from 'rxjs';

import { Despesas,MonthDescription, TotalConsolidado } from '../../util/despesas';
import { formatValue, formatMonth } from '../../util/util'

@Component({
  selector: 'ap-consolidados',
  templateUrl: './consolidados.component.html',
  styleUrls: ['./consolidados.component.css']
})

/** ConsolidadosComponent
 *  Componente para exibir os valores consolidados de cada mês
 */
export class ConsolidadosComponent implements OnDestroy, OnChanges {

  @Input() data: Despesas[] = [];

  itemsDespesas: Despesas[] = [];
  totalMonths: Array<TotalConsolidado> = [];
  subs: Subscription;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data) {
      this.itemsDespesas = this.data;
      this.itemsDespesas.map((x) => {
        this.SumValues(x)
      })
    }
  }

  ngOnDestroy(): void {
    //tratamento para vazamento de memória.
    if(this.subs){
      this.subs.unsubscribe();
    }
  }

  /** SumValues
   *  função para consolidar os valores por mês
   * @param item Despesas 
   */
  SumValues(item:Despesas){

    let nPosition: number = 0;

    nPosition = this.totalMonths.findIndex( x => x.mes === item.mes_lancamento)

    if (nPosition >= 0){
      this.totalMonths[nPosition].valor += item.valor;
    }else
    {
      this.totalMonths.push({
        mes: item.mes_lancamento,
        valor:item.valor
      })
    }
  }

  /** formatValue
  * Função para formatar o valor para exibição
  * @param nValue
  * @return exemplo: R$ 102,00 
  */
  formatValue(nValue:number){
    return formatValue(nValue);
  }

  /** formatMonth
   * Função para formatar o mês
   * @param nMonth 
   * @return description
   */
  formatMonth(nMonth:number){
    return formatMonth(nMonth);
  }

}
