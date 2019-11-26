1. npm init y cree el package.json

npm i   express (back-end framework para crear las rutas)
        body-parser (maneja la data que vienen en la request)
        mongoose (la base de datos)
        concurrently (permite ejecutar simultaneamente npm scripts)

npm i -D nodemon (se actualiza solo)  La -D indica que es para dev

2. Colocar scripts

"scripts": {
    "start": "node server.js",   //arranca el server sin actualizacion automatica
    "server": "nodemon server.js"  //arranca el server con actualizacion automatica
  },

//  CREAR SERVIDOR

3. Configure el servidor, importando lo necesario e iniciando express

4. cree config/keys.js donde almaceno el string para conectar

5. importa la stringConnection y lo uso para conectarme con mongoose

6. defino el port y hago un listen para conectarme

// CREAMOS MODELOS PARA MONGOOSE
7. importar mongoose y crear Schema

8. crea Schema personalizado definiendo sus propiedades como objeto

9. exportar pasandole el schema al mongoose.model()

// DEFINIMOS RUTAS
10. crear routes/api/ruta.js

11. 

//CREAMOS CLIENT y EL FRONT

Cuando tenemos un custom method fuera de la clase lo asociamos asi EN EL CONSTRUCTOR
constructor(props) {
  super(props);
  this.methodName = this.methodName.bind(this);
}

methodName() {

}


OPCION B, transformar el metodo a arrow function

methodName = () => {
  
}