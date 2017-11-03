export interface PermisosInterface {
    claveauth?: string;
    nicknameauth?: string;
    usuarioauth?: string;
    idpermiso?: number;
    descripcion: string;
    direccion: string;
    medidasterreno: string;
    medidasconstruccion: string;
    fechainicio: string;
    fechafin: string;
    idtipopermiso: number;
    presupuesto: number;
    idrazonsocialcliente: number;
    idrazonsocialcontratista: number;
    idrazonsocialconstructor: number;
    idrazonsocialasociado: number;
    posiciongps: string;
    idestatuspermiso: number;
    observaciones: string;
    desctipopermiso?: string;
    direccioncliente?: string;
    razonsocialcontratista?: string;
    razonsocialconstructor?: string;
    razonsocialasociado?: string;
    claveestatuspermiso?: string;
    tipopermiso?: string;
}
