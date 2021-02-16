import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from "@angular/core/testing";
import { Categoria, Despesas } from "./despesas";
import { LancamentoService } from "./lancamento.service";

describe('LancamentoService', ()=>{

    let service:LancamentoService;
    let httpMock:HttpTestingController;
    let arrayDespesas:Despesas[];
    let arrayCategoria:Categoria[];

    beforeEach(()=>{

        TestBed.configureTestingModule({
            providers:[
                LancamentoService
            ],
            imports:[
                HttpClientTestingModule
            ]
        });

        service = TestBed.get(LancamentoService);

        //Utilizado para injetar as dependencias do http de teste e mockar as requisições get, put, post...
        httpMock = TestBed.get(HttpTestingController);

    });

    beforeEach(()=>{

        arrayDespesas = [
            {
              categoria: 1,
              id: 1,
              mes_lancamento:12,
              origem:'testes',
              valor:50
           }
        ]

        arrayCategoria = [
            {
                id:1,
                nome:'Estudos'
            },
            {
                id:2,
                nome:'Combustivel'
            }
        ]

    });


    it('Deve ser criado', () =>{
        expect(service).toBeTruthy();
    })

    it('Deve retornar as despesas', ()=> {

        service.getLancamentos().subscribe((data) =>{
            expect(data).toEqual(arrayDespesas);
        });

        //Objeto responsável por fazer toda a simulação da requisição.
        //ExpectOne avalia se foi feita alguma chamada http, então mockamos o endpoint dessa chamada.
        const req = httpMock.expectOne('https://desafio-it-server.herokuapp.com/lancamentos');

        //Avalia o tipo de requisição que foi feita para o backend.
        expect(req.request.method).toEqual('GET');
        
        //Mock com o envio da resposta do backend.
        req.flush(arrayDespesas);

    });

    it('Deve retornar as categorias', ()=> {

        service.getCategory().subscribe((data) =>{
            expect(data).toEqual(arrayCategoria);
        });

        const req = httpMock.expectOne('https://desafio-it-server.herokuapp.com/categorias');

        //Avalia o tipo de requisição que foi feita para o backend.
        expect(req.request.method).toEqual('GET');
        
        //Mock com o envio da resposta do backend.
        req.flush(arrayCategoria);

    });

});