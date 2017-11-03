export interface EmpleadosInterface {
    claveauth?: string;
    nicknameauth?: string;
    usuarioauth?: string;
    idpersonal?: number;
    descripcion: string;
    direccion: string;
    medidasterreno: string;
    medidasconstruccion: string;
    fechainicio: string;
    fechafin: string;
    idtipopersonal: number;
    presupuesto: number;
    idrazonsocialcliente: number;
    idrazonsocialcontratista: number;
    idrazonsocialconstructor: number;
    idrazonsocialasociado: number;
    posiciongps: string;
    idestatuspersonal: number;
    observaciones: string;
    desctipopersonal?: string;
    direccioncliente?: string;
    razonsocialcontratista?: string;
    razonsocialconstructor?: string;
    razonsocialasociado?: string;
    claveestatuspersonal?: string;
    tipopersonal?: string;
}
