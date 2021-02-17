import { Component, OnInit, OnDestroy, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';

import { LancamentoService } from '../../util/lancamento.service';
import { Despesas, Categoria } from '../../util/util';
import { formatMonth, formatValue} from '../../util/util'


@Component({
  selector: 'ap-lancamentos',
  templateUrl: './lancamentos.component.html',
  styleUrls: ['./lancamentos.component.css']
})

/** LancamentosComponent
 *  Componente para exibir todos os lançamentos de cada mês.
 */
export class LancamentosComponent implements OnInit, OnDestroy, OnChanges {

  @Input() data: Despesas[] = [];
 
  itemsDespesas: Despesas[] = [];
  categoryValues: Categoria[] = [];
  subs: Subscription;

  constructor(
    private lancamentoService: LancamentoService) {
  } 

  ngOnInit(): void {

    this.subs = this.lancamentoService
    .getCategory()
    .subscribe(categorias => {
      this.categoryValues = categorias;
    });

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data) {
      this.itemsDespesas = this.data;
    }
  }

  ngOnDestroy(): void {
    if(this.subs){
      this.subs.unsubscribe();
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

  /** getDescriptionCategory
   * função para retornar a descrição da categoria. Ex.: 'Transporte'
   * @param category id da categoria
   * @return description
   */
  getDescriptionCategory(category:number){
    let description:string = 'Não informada';
    let nPos:number = this.categoryValues.findIndex( x => category === x.id);

    if (nPos >= 0){
      description = this.categoryValues[nPos].nome; 
    } 
    return description
  }

}
