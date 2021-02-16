import { SimpleChange } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Despesas } from 'src/app/util/despesas';

import { ConsolidadosComponent } from './consolidados.component';

describe('ConsolidadosComponent', () => {
  let component: ConsolidadosComponent;
  let fixture: ComponentFixture<ConsolidadosComponent>;
  let fakeExpenses: Despesas[];

  beforeEach(async(() => {
  
    TestBed.configureTestingModule({
      declarations: [ 
        ConsolidadosComponent //Componentes.
      ]
    }).compileComponents();
  
  }));

  beforeEach(() => {
    
    //Utilizamos o createComponent para ele pegar a composição do template html junto ao typescript.
    fixture = TestBed.createComponent(ConsolidadosComponent);
    
    component = fixture.componentInstance;
    
    //Conseguimos detectar todo o ciclo de vida do componente. Ex.: ngOnChanges, ngOnInit, NgAfterViewInit.
    fixture.detectChanges();

    fakeExpenses = [
      {
        categoria: 1,
        id: 1,
        mes_lancamento:12,
        origem:'testes',
        valor:50
      }
    ]

    //Zera o atributo da classe a cada teste.
    component.totalMonths = [];

  });

  it('Deve ser criado', () => {
    
    expect(component).toBeTruthy();
  
  });

  it('Deve atualizar os itens de despesa', () =>{

    let index:number;
    let arrayFake: Despesas[] = [
      {
        categoria: 1,
        id: 1,
        mes_lancamento:9,
        origem:'Restaurantes',
        valor:90
      },
      {
        categoria: 1,
        id: 1,
        mes_lancamento:9,
        origem:'Supermercado',
        valor:310
      }
    ]
    
    //Inicializa o atributo data para avaliar após o ngOnChanges.
    component.data = arrayFake;

    component.ngOnChanges( {
      data: new SimpleChange(component.data,component.data, true)
    });

    fixture.detectChanges();

    //Verifica se os item de despesas foram atualizados.
    expect(component.itemsDespesas).toEqual(component.data);

    //Verifica se os valores foram somados ao total de cada mês.
    index = component.totalMonths.findIndex( x => x.mes === 9)
    expect(component.totalMonths[index].valor).toEqual(400);

  });

});
