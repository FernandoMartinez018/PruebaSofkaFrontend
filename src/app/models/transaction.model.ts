export interface TransactionRequest {
  monto: number;
}

export interface TransactionResponse {
  id: number;
  monto: number;
  comision: number;
  fecha: string;
  mensaje: string;
}

export interface ErrorResponse {
  error: string;
  mensaje: string;
  timestamp: string;
  path: string;
}