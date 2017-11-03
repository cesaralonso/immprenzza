export interface CheckoutsInterface {
    claveauth?: string;
    nicknameauth?: string;
    usuarioauth?: string;
    idcheckout?: number;
    descripcion: string;
    direccion: string;
    medidasterreno: string;
    medidasconstruccion: string;
    fechainicio: string;
    fechafin: string;
    idtipocheckout: number;
    presupuesto: number;
    idrazonsocialcliente: number;
    idrazonsocialcontratista: number;
    idrazonsocialconstructor: number;
    idrazonsocialasociado: number;
    posiciongps: string;
    idestatuscheckout: number;
    observaciones: string;
    desctipocheckout?: string;
    direccioncliente?: string;
    razonsocialcontratista?: string;
    razonsocialconstructor?: string;
    razonsocialasociado?: string;
    claveestatuscheckout?: string;
    tipocheckout?: string;
}
