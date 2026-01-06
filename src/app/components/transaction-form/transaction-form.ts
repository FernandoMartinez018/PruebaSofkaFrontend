import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransactionService } from '../../services/transaction.service';
import { TransactionRequest } from '../../models/transaction.model';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.html',
  styleUrls: ['./transaction-form.css'],
  standalone: false
})
export class TransactionFormComponent {
  
  transactionForm: FormGroup;
  isSubmitting = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  
  @Output() transactionCreated = new EventEmitter<void>();
  
  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionService
  ) {
    this.transactionForm = this.fb.group({
      monto: [
        '', 
        [
          Validators.required, 
          Validators.min(0.01),
          Validators.pattern(/^\d+(\.\d{1,2})?$/)
        ]
      ]
    });
  }
  
  get monto() {
    return this.transactionForm.get('monto');
  }
  
  hasError(fieldName: string, errorType: string): boolean {
    const field = this.transactionForm.get(fieldName);
    return !!(field && field.hasError(errorType) && (field.dirty || field.touched));
  }
  
  onSubmit(): void {
    this.errorMessage = null;
    this.successMessage = null;
    
    if (this.transactionForm.invalid) {
      this.transactionForm.markAllAsTouched();
      return;
    }
    
    this.isSubmitting = true;
    
    const request: TransactionRequest = {
      monto: Number(this.transactionForm.value.monto)
    };
    
    this.transactionService.createTransaction(request).subscribe({
      next: (response) => {
        this.successMessage = `Transacción creada exitosamente. ${response.mensaje}`;
        this.transactionForm.reset();
        this.isSubmitting = false;
        this.transactionCreated.emit();
        setTimeout(() => this.successMessage = null, 5000);
      },
      error: (error) => {
        this.errorMessage = error.message || 'Error al crear la transacción';
        this.isSubmitting = false;
      }
    });
  }
  
  onReset(): void {
    this.transactionForm.reset();
    this.errorMessage = null;
    this.successMessage = null;
  }
}