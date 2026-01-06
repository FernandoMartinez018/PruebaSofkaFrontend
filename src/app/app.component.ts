import { Component, ViewChild } from '@angular/core';
import { TransactionListComponent } from './components/transaction-list/transaction-list';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false
})
export class AppComponent {
  title = 'Sofka-Fintech - Sistema de Liquidación de Comisiones';
  
  @ViewChild(TransactionListComponent) 
  transactionList!: TransactionListComponent;
  
  onTransactionCreated(): void {
    if (this.transactionList) {
      this.transactionList.refresh();
    }
  }
}