//EJEMPLO DE POR CADA UNO
const porCadaUno = (arr, fn) => {
    for (const el of arr){
        fn(el);
    }
}

const precios = [120, 300, 140, 400]

porCadaUno(precios, (valor)=> {console.log(valor);});

porCadaUno(precios, (valor =>{
    const resultado = valor * 10;
    console.log(resultado);
}))


//METODOS DE BUSQUEDA Y TRANSFORMACION
const numeros = [1,2,3,4,5,6];

//FOR EACH
numeros.forEach( (num) => {
    console.log(num);
})

//FIND
const cursos = [
    {nombre: 'Javascript', precio: 15000},
    {nombre: 'ReactJS', precio: 22000},
]

const resultado = cursos.find((el) => el.nombre === "ReactJS")
const resultado2 = cursos.find((el) => el.nombre === "DW")

console.log(resultado)
console.log(resultado2)


//FILTER
const cursos2 = [
    {nombre: 'Javascript', precio: 15000},
    {nombre: 'ReactJS', precio: 22000},
    {nombre: 'AngularJS', precio: 22000},
    {nombre: 'Desarrollo Web', precio: 1600},
]

const resultado3 = cursos2.filter((el) => el.nombre.includes('JS'));
const resultado4 = cursos2.filter((el) => el.precio < 14000);

console.log(resultado3);
console.log(resultado4);

//SOME
console.log( cursos.some((el) => el.nombre === "Desarrollo"))
console.log( cursos.some((el) => el.nombre === "VueJS"))

//MAP
const nombres = cursos2.map((el) => el.nombre);
console.log(nombres)

const actualizado = cursos2.map((el) => {
    return {
        nombre: el.nombre,
        precio: el.precio * 1.25
    }
})

console.log(actualizado);


//REDUCE
const total = numeros.reduce((acumulador, elemento) => acumulador + elemento, 0)
console.log(total)

//SORT
const numeros2 = [ 40, 1, 5, 200];
numeros2.sort((a, b) => a - b);
numeros2.sort((a, b) => b - a);

const items = [
    { name: 'Pikachu', price: 21},
    { name: 'Charmander', price: 37},
    { name: 'Pidgey', price: 45},
    { name: 'Squirtle', price: 60},
]

items.sort((a,b) => {
    if(a.name > b.name){
        return 1;
    }
    if(a.name < b.name){
        return -1;
    }
    return 0;
})


//EJEMPLO AMPLIFICADO
const productos = [
    { id:1, producto: "Arroz", precio: 125},
    { id:2, producto: "Fideo", precio: 70},
    { id:3, producto: "Pan", precio: 50},
    { id:4, producto: "Flan", precio: 100},
]

const buscado = productos.find(producto => producto.id === 3)
console.log(buscado);

const existe = productos.some(producto => producto.producto === "Harina");
console.log(existe);

const baratos = productos.filter(producto => producto.precio < 100)
console.log(baratos);

const listaNombres = productos.map(producto => producto.producto)
console.log(listaNombres);


//FUNCIONES DE ORDEN SUPERIOR 2

//MATH
console.log(Math.E);
console.log(Math.PI);

//MAX AND MIN
console.log( Math.max(55, 13, 0, -25, 93, 4))
console.log( Math.min(55, 13, 0, -25, 93, 4))

console.log( Math.max(55, Infinity, 0, -25, 93, 4))
console.log( Math.min(55, Infinity, 0, -25, 93, 4))

//RANDOM
console.log( Math.random())
console.log( Math.random() * 10)
console.log( Math.random() * 50)
console.log( Math.random() * 30 + 20)

//DATE
console.log(new Date(2020, 1, 15))
const casiNavidad = new Date(2021, 11, 25, 23, 59, 59)
console.log(casiNavidad);


//ESTRUCTURA DOM
//GET ELEMENT BY ID
let div = document.getElementById("app");
let parrafo = document.getElementById("parrafo1");
console.log(div.innerText);
console.log(parrafo.innerText);


//GET ELEMENT BY CLASSNAME
let paises = document.getElementsByClassName("paises");
console.log(paises[0].innerHTML);
console.log(paises[1].innerHTML);
console.log(paises[2].innerHTML);


//GET ELEMENT BY TAGNAME
let contenedores = document.getElementsByTagName("div");
console.log(contenedores[0].innerHTML);
console.log(contenedores[1].innerHTML);
console.log(contenedores[2].innerHTML);

//MODIFICAR NODOS

//INNER TEXT
let titulo = document.getElementById("titulo");
console.log(titulo.innerText);
titulo.innerText = "Hola, July";
console.log(titulo.innerText);

//INNER HTML
let container = document.getElementById("contenedor");
container.innerHTML = "<h2>Hola Mundo!</h2><p>Lorem ipsum</p>"


//CLASS NAME
container.className = "container row";

//AGREGAR O QUITAR NODOS
let parrado = document.createElement("p");
parrado.innerHTML = "<h2>Hola Coder!</h2>";
document.body.append(parrado);

//REMOVE
parrado.remove();
paises[0].remove();

//VALUE
document.getElementById("nombre").value = "Homero";
document.getElementById("edad").value = 39;

//PLANTILLAS LITERALES
let producto = { id: 1, nombre: "Arroz", precio:125};
let concatenado = "ID: "+producto.id +" - Producto "+ producto.nombre + "$"+producto.precio;
let plantilla = `ID: ${producto.id} - Producto ${producto.nombre} $ ${producto.precio}`;

console.log(concatenado);
console.log(plantilla);

let contenedor = document.createElement("div");
contenedor.innerHTML = `<h3> ID: ${producto.id} </h3>
                        <p>  Producto: ${producto.nombre}</p>
                        <b>  $ ${producto.precio}</b>`;
document.body.appendChild(contenedor);


//EVENTOS EN JS

//ONCLICK
function respuestaClick() {
    console.log("Respuesta evento, usted ha hecho click");
}
let boton = document.getElementById("btnPrincipal");
boton.addEventListener("click", respuestaClick);

boton.onclick = () => {console.log("Respuesta 2")};

//EVENTOS DEL MOUSE
boton.onmousemove = () => {console.log("Move")};

//EVENTOS DEL TECLADO
let input1 = document.getElementById("nombre");
let input2 = document.getElementById("edad");
input1.onkeyup = () => {console.log("keyUp")};
input2.onkeydown = () => {console.log("keyDown")};

//CHANGE
input1.onchange = () => {console.log("valor1")};
input2.onchange = () => {console.log("valor2")};

//INPUT
input1.addEventListener('input', () => {
    console.log(input1.value);
});

//SUBMIT
function validarFormulario(e) {
    e.preventDefault();
    console.log("Formulario Enviado :)")
}
let miFormulario = document.getElementById("formulario");
miFormulario.addEventListener("submit", validarFormulario);
