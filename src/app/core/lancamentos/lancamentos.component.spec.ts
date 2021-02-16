import { HttpClientModule } from '@angular/common/http';
import { SimpleChange } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Categoria, Despesas } from '../../util/despesas';
import { LancamentoService } from '../../util/lancamento.service';

import { LancamentosComponent } from './lancamentos.component';

describe('LancamentosComponent', () => {
  
  let component: LancamentosComponent;
  let fixture: ComponentFixture<LancamentosComponent>;
  let fakeCategory: Categoria[];
  let fakeExpenses: Despesas[];
  let lancamentoService:LancamentoService;

  beforeEach(async(() => {
    
    //Utilizado para configurar e injetar todas as dependências necessarias para o teste unitário.    
    TestBed.configureTestingModule({
      declarations: [ 
        LancamentosComponent //Componentes.
      ],
      providers:[
        LancamentoService //Serviços.
      ],
      imports:[
        HttpClientModule //Módulos.
      ]
    }).compileComponents();
  
  }));

  beforeEach(() => {
    
    //Utilizamos o createComponent para ele pegar a composição do template html junto ao typescript.
    fixture = TestBed.createComponent(LancamentosComponent);
    component = fixture.componentInstance;
    
    //Conseguimos detectar todo o ciclo de vida do componente. Ex.: ngOnChanges, ngOnInit, NgAfterViewInit.
    fixture.detectChanges();

    fakeCategory = [
      {
        id:1,
        nome: 'Uber'
      },
      {
        id:2,
        nome:'Restaurantes'
      }
    ]

    fakeExpenses = [
      {
        categoria: 1,
        id: 1,
        mes_lancamento:12,
        origem:'testes',
        valor:50
      }
    ]


    lancamentoService = TestBed.get(LancamentoService);

    //Instala um espião para conseguir mockar o serviço de lançamentos.
    spyOn(lancamentoService,"getCategory").and.returnValue(of(fakeCategory)) ;

  });

  it('Deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('Deve carregar as categorias', () =>{

    //Preparação.
    let values: Categoria[];
    
    //Execução.
    component.ngOnInit();
    values = component.categoryValues;

    //Avaliação do resultado.
    expect(values).toEqual(fakeCategory);

  });

  it('Deve formatar o valor em Real', ()=> {

    expect(component.formatValue(103)).toContain('R$');
    
  });

  it('Deve retornar o nome do mês', ()=>{

    expect(component.formatMonth(1)).toBe('Janeiro');

  });

  it('Deve retornar a descrição da categoria informada', () =>{

    component.ngOnInit();
    expect(component.getDescriptionCategory(2)).toBe('Restaurantes');
    expect(component.getDescriptionCategory(3)).toBe('Não informada');

  });

  it('Deve atualizar os itens de despesa', () =>{

    //Inicializa o atributo data para avaliar após o ngOnChanges.
    component.data = fakeExpenses;

    component.ngOnChanges( {
      data: new SimpleChange(component.data,component.data, true)
    });

    fixture.detectChanges();

    expect(component.itemsDespesas).toEqual(component.data);

  });


});
