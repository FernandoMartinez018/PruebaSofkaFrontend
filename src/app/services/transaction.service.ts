import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, timer } from 'rxjs';
import { catchError, retry, switchMap } from 'rxjs/operators';
import { TransactionRequest, TransactionResponse } from '../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  
  private readonly API_URL = 'http://localhost:8081/api/transactions';
  
  constructor(private http: HttpClient) { }
  
  createTransaction(request: TransactionRequest): Observable<TransactionResponse> {
    return this.http.post<TransactionResponse>(this.API_URL, request)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }
  
  getAllTransactions(): Observable<TransactionResponse[]> {
    return this.http.get<TransactionResponse[]>(this.API_URL)
      .pipe(
        catchError(this.handleError)
      );
  }
  
  getTransactionsPolling(intervalMs: number = 5000): Observable<TransactionResponse[]> {
    return timer(0, intervalMs).pipe(
      switchMap(() => this.getAllTransactions())
    );
  }
  
  getTransactionById(id: number): Observable<TransactionResponse> {
    return this.http.get<TransactionResponse>(`${this.API_URL}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }
  
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ocurrió un error desconocido';
    
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = error.error?.mensaje || 
                     `Error ${error.status}: ${error.message}`;
    }
    
    console.error('Error en TransactionService:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}