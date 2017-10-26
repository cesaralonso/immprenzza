export interface ChangePasswordInterface {
    nicknameauth: string;
    usuarioauth: string;
    claveauth: string;
    contrasena: string;
    idusuario: number;
    contrasenas: {
        nuevacontrasena: string;
    };
}