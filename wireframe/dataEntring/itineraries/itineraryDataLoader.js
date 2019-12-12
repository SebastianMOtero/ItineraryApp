require(/*Path a Server.js*/);

const fs = require("fs");

const ItineraryModel = require(/*Path a itinerary schema*/);
const CityModel = require(/*Path a city schema*/);

//lectura de archivo (si se cambia de carpeta, modificar la ruta)
fs.readFile("itinerariesData.json", (err, data) => {
  if (err) console.log(err);

//Parseo de la info a Json, el log dice la cantidad de elementos que deberia ser la misma //cantidad de documentos en la DB
  const itineraries = JSON.parse(data);
  console.log(itineraries.length);

//Por cada elemento del array, consigue el id de la ciudad al que pertenece (con el 
//nombre de la ciudad) y crea el documento acorde al schema.
// ****Chequear que las keys sean iguales al schema***
  itineraries.forEach(async itinerary => {
    try {
      const city = await CityModel.findOne({
        city: itinerary.city
      });

      if (city) {
        const newItinerary = new ItineraryModel({
          title: itinerary.title,
          city: city._id,
          country: itinerary.country,
          user: itinerary.username,
          rating: Number(itinerary.rating),
          duration: itinerary.duration,
          total_price: itinerary.price,
          hashtags: itinerary.hashtag.split("#").slice(1)
        });
        //Si se grabó adecuadamente, logea el itinerario creado
        await newItinerary.save();
        console.log("itinerary created " + itinerary.title);
      } else {
        //Si falla, avisa que ciudad no encontro (agregar ciudad a la DB o chequear 
        //errores de tipeo)
        console.log(
          itinerary.city + " not found, " + itinerary.title + " not created"
        );
      }
    } catch (err) {
      //Si TODO falla, avisa
      console.log(err);
    }
  });
});
