export interface TrabajosInterface {
  idTrabajo?: number;
  archivo: string;
  foto: string;
  f_entregaEsperada: string;
  f_entregaReal: string;
  status: string;
  especificaciones: string;
  Trabajo_idTipoTrabajo: number;
  cantidad: number;
  total: number;
  Personal_idPersonal: number;
  Orden_idOrden: number;
  f_recibe: string;
}
