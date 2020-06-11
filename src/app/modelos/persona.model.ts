export interface Persona {
    id?: String; //? Es opcional
    primerNombre: String;
    segundoNombre?: String;
    primerApellido: String;
    segundoApellido?: String;
    fechaNacimiento:String;
    genero:number,
    municipio:number
    email?: String;
    contrasenia:String
}