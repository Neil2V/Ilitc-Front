export class Cliente {
    nombres: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    sexo: string;
    fechaNacimiento: string;
    direccion: string;
    email: string;

    constructor(nombres: string, apellidoPaterno: string, apellidoMaterno: string, sexo: string, fechaNacimiento: string, direccion: string, email: string) {
        this.nombres = nombres;
        this.apellidoPaterno = apellidoPaterno;
        this.apellidoMaterno = apellidoMaterno;
        this.sexo = sexo;
        this.fechaNacimiento = fechaNacimiento;
        this.direccion = direccion;
        this.email = email;
    }
}
