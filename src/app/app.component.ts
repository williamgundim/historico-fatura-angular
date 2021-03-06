import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { LancamentoService } from './util/lancamento.service';
import { Despesas, compareMonths } from './util/util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{

  subs: Subscription;
  itemsDespesas: Despesas[];

  constructor(
    private lancamentoService: LancamentoService) {
  } 

  ngOnInit(): void {
  
    this.subs = this.lancamentoService
      .getLancamentos()
      .subscribe(despesas => {
        this.itemsDespesas = despesas;
        this.itemsDespesas.sort(compareMonths);
      })
    }
}

