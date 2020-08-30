// importar css
import '../css/componentes.css';

export const saludar =(nombre) => {
    console.log("creando eitqueta h1");
    const h1 = document.createElement("h1");
    h1.innerText = 'hola ' + nombre;
    document.body.append(h1);
}