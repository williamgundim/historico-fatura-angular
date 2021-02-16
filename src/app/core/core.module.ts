import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { LancamentosComponent } from './lancamentos/lancamentos.component';
import { ConsolidadosComponent } from './consolidados/consolidados.component'

@NgModule({
  declarations: [
    LancamentosComponent, 
    ConsolidadosComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  exports:[
      LancamentosComponent,
      ConsolidadosComponent
  ]
})
export class CoreModule { }
