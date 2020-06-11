export interface Producto {
    id?: number; //? Es opcional
    nombre: String;
    descripcion: String
    descripcionCorta?: String;
    esImagenPrincipal: boolean,
    pathImagen: String,
    precio: number,
    oferta: number
}