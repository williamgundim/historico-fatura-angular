import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { LancamentoService } from './util/lancamento.service';

describe('AppComponent', () => {

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let lancamentoService:LancamentoService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        CoreModule
      ],
      declarations: [
        AppComponent
      ],
      providers:[
        LancamentoService
      ]
    }).compileComponents();
  }));

  beforeEach(()=>{

    const arrayDespesas = [
      {
        categoria: 1,
        id: 1,
        mes_lancamento:12,
        origem:'testes',
        valor:50
      }
    ]

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;

    lancamentoService = TestBed.get(LancamentoService);

    //Instala um espião para mockar o retorno do serviço de lançamento de despesas.
    spyOn(lancamentoService,"getLancamentos").and.returnValue(of(arrayDespesas));

  });


  it('should create the app', () => {

    expect(component).toBeTruthy();

  });

  it('Deve carregar as despesas', ()=>{

    component.ngOnInit();
    expect(component.itemsDespesas.length).toBeGreaterThan(0);

  });

});
