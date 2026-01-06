import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { TransactionForm } from './components/transaction-form/transaction-form';
import { TransactionList } from './components/transaction-list/transaction-list';

@NgModule({
  declarations: [
    App,
    TransactionForm,
    TransactionList
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
