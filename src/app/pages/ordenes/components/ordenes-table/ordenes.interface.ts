export interface OrdenesInterface {
    claveauth?: string;
    nicknameauth?: string;
    usuarioauth?: string;
    idorden?: number;
    descripcion: string;
    direccion: string;
    medidasterreno: string;
    medidasconstruccion: string;
    fechainicio: string;
    fechafin: string;
    idtipoorden: number;
    presupuesto: number;
    idrazonsocialcliente: number;
    idrazonsocialcontratista: number;
    idrazonsocialconstructor: number;
    idrazonsocialasociado: number;
    posiciongps: string;
    idestatusorden: number;
    observaciones: string;
    desctipoorden?: string;
    direccioncliente?: string;
    razonsocialcontratista?: string;
    razonsocialconstructor?: string;
    razonsocialasociado?: string;
    claveestatusorden?: string;
    tipoorden?: string;
}
