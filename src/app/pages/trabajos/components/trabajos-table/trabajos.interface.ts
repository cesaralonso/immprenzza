export interface TrabajosInterface {
    claveauth?: string;
    nicknameauth?: string;
    usuarioauth?: string;
    idtrabajo?: number;
    descripcion: string;
    direccion: string;
    medidasterreno: string;
    medidasconstruccion: string;
    fechainicio: string;
    fechafin: string;
    idtipotrabajo: number;
    presupuesto: number;
    idrazonsocialcliente: number;
    idrazonsocialcontratista: number;
    idrazonsocialconstructor: number;
    idrazonsocialasociado: number;
    posiciongps: string;
    idestatustrabajo: number;
    observaciones: string;
    desctipotrabajo?: string;
    direccioncliente?: string;
    razonsocialcontratista?: string;
    razonsocialconstructor?: string;
    razonsocialasociado?: string;
    claveestatustrabajo?: string;
    tipotrabajo?: string;
}
