require(/*Path a Server.js*/);

const fs = require("fs");

const CityModel = require(/*Path a city schema*/);

//lectura de archivo (si se cambia de carpeta, modificar la ruta)
fs.readFile("citiesData.json", (err, data) => {
  if (err) console.log(err);

//Parseo de la info a Json, el log dice la cantidad de elementos que deberia ser la misma //cantidad de documentos en la DB
  const cities = JSON.parse(data);
  console.log(cities.length);
  
//Por cada elemento del array, crea el documento acorde al schema.
// ****Chequear que las keys sean iguales al schema***
  cities.forEach(async city => {
    try {
      const newCity = new CityModel({
        city: city.name,
        country: city.country,
        img: city.img
      });
      //Guarda la ciudad y confirma
      await newCity.save();
      console.log(city.name + " added");
    } catch (err) {
      //Si Falla, avisa
      console.log("city not added " + city);
      console.log(err);
    }
  });
});
