export interface PuestosInterface {
    claveauth?: string;
    nicknameauth?: string;
    usuarioauth?: string;
    idpuesto?: number;
    descripcion: string;
    direccion: string;
    medidasterreno: string;
    medidasconstruccion: string;
    fechainicio: string;
    fechafin: string;
    idtipopuesto: number;
    presupuesto: number;
    idrazonsocialcliente: number;
    idrazonsocialcontratista: number;
    idrazonsocialconstructor: number;
    idrazonsocialasociado: number;
    posiciongps: string;
    idestatuspuesto: number;
    observaciones: string;
    desctipopuesto?: string;
    direccioncliente?: string;
    razonsocialcontratista?: string;
    razonsocialconstructor?: string;
    razonsocialasociado?: string;
    claveestatuspuesto?: string;
    tipopuesto?: string;
}
