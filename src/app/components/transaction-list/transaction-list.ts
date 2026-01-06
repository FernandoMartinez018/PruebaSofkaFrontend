import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TransactionService } from '../../services/transaction.service';
import { TransactionResponse } from '../../models/transaction.model';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.html',
  styleUrls: ['./transaction-list.css'],
  standalone: false
})
export class TransactionListComponent implements OnInit, OnDestroy {
  
  transactions: TransactionResponse[] = [];
  isLoading = true;
  errorMessage: string | null = null;
  private subscription?: Subscription;
  
  constructor(private transactionService: TransactionService) { }
  
  ngOnInit(): void {
    this.loadTransactions();
  }
  
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  
  loadTransactions(): void {
    this.isLoading = true;
    this.errorMessage = null;
    
    this.subscription = this.transactionService
      .getTransactionsPolling(5000)
      .subscribe({
        next: (data) => {
          this.transactions = data;
          this.isLoading = false;
        },
        error: (error) => {
          this.errorMessage = error.message;
          this.isLoading = false;
        }
      });
  }
  
  refresh(): void {
    this.loadTransactions();
  }
  
  formatCurrency(value: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 2
    }).format(value);
  }
  
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-CO', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  }
  
  getAmountClass(monto: number): string {
    return monto > 10000 ? 'high-amount' : 'low-amount';
  }
}