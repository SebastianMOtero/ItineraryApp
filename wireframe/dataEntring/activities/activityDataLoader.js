require(/*Path a Server.js*/);

const fs = require("fs");

const ItineraryModel = require(/*Path a Itineary schema*/);
const ActivityModel = require(/*Path a activity schema*/);

//lectura de archivo (si se cambia de carpeta, modificar la ruta)
fs.readFile("allActivities.json", (err, data) => {
  if (err) console.log(err);

  //Parseo de la info a Json, el log dice la cantidad de elementos que deberia ser la 
  //misma cantidad de documentos en la DB
  const activities = JSON.parse(data);
  console.log(activities.length);

  //Por cada elemento del array, consigue el id del itinerario al que pertenece la 
  //actividad (con el titulo de itinerario) y crea el documento acorde al schema.
  // ****Chequear que las keys sean iguales al schema***
  activities.forEach(async activity => {
    try {
      //es factible que haya errores en los titulos, en ese caso, manualmente corregir y 
      //reejecutar
      const itinerary = await ItineraryModel.findOne({
        title: activity.itinerary_title
      });
    
      if (itinerary) {
        const newActivity = new ActivityModel({
          itinerary: itinerary._id,
          title: activity.title,
          address: activity.address,
          img: activity.img,
          duration: activity.duration,
          price: activity.price,
          sumary: activity.summary
        });
        //Si todo esta bien
        await newActivity.save();
        console.log(
          "Activity " + activity.title + " added to " + itinerary.title
        );
      } else {
        //si todo esta mal
        console.log(
          activity.itinerary_title +
            " not found, " +
            activity.title +
            " not added"
        );
      }
    } catch (err) {
      //si todo esta peor
      console.log(err);
    }
  });
});
