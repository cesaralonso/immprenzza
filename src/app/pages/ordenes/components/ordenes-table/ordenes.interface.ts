export interface OrdenesInterface {
  idOrden?: number;
  factura: boolean;
  fecha: string;
  status_avance: string;
  status_pago: string;
  f_limite: string;
  subtotal: number;
  total: number;
  iva: number;
  deuda: number;
  Cliente_idCliente: number;
}
