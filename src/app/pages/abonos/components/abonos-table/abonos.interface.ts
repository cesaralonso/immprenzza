export interface AbonosInterface {
    claveauth?: string;
    nicknameauth?: string;
    usuarioauth?: string;
    idabono?: number;
    descripcion: string;
    direccion: string;
    medidasterreno: string;
    medidasconstruccion: string;
    fechainicio: string;
    fechafin: string;
    idtipoabono: number;
    presupuesto: number;
    idrazonsocialcliente: number;
    idrazonsocialcontratista: number;
    idrazonsocialconstructor: number;
    idrazonsocialasociado: number;
    posiciongps: string;
    idestatusabono: number;
    observaciones: string;
    desctipoabono?: string;
    direccioncliente?: string;
    razonsocialcontratista?: string;
    razonsocialconstructor?: string;
    razonsocialasociado?: string;
    claveestatusabono?: string;
    tipoabono?: string;
}
