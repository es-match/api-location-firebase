const functions = require("firebase-functions");
const admin = require("firebase-admin");
const app = require("express")();
// const routes = require("./routes/locations.routes.js");
// const routesAdmin = admin.initializeApp({
//   credential: admin.credential.cert("../routes/locations.routes.js"),
// });
const router = require("express")();
admin.initializeApp();

const db = admin.firestore()
    .collection("locations");


app.use("/api/v1", router);


// View a contact
router.get("/locations/:id", (request, response) => {
  db.doc(request.params.id).get()
      .then((location) => response.status(200).json({

        id: location.id,
        userID: location.userID,
        locationName: location.data().locationName,
        zip: location.data().zip,
        city: location.data().city,
        address: location.data().address,
        number: location.data().number,
        imageUrl: location.data().imageUrl,
        geolocation:
        {"_latitude":
        location.data().geolocation.latitude,
        "_longitude":
        location.data().geolocation.latitude,
        },
        createDate: new Date(location.data().createDate),
      })
          .catch((error) => response.status(400)
              .send(`Cannot get location: ${error}`)));
});

router.get("/locations", (request, response) => {
  db.get()
      .then((locations) => {
        const listLocations = [];

        locations.forEach((location) => {
          listLocations.push({
            id: location.id,
            userID: location.userID,
            locationName: location.data().locationName,
            zip: location.data().zip,
            city: location.data().city,
            address: location.data().address,
            number: location.data().number,
            imageUrl: location.data().imageUrl,
            geolocation:
            {"_latitude":
            location.data().geolocation.latitude,
            "_longitude":
            location.data().geolocation.longitude,
            },
            createDate: new Date(location.data().createDate),
            avaiableDays: location.data().avaiableDays,
            avaiableHours: location.data().avaiableHours,
            hourValue: location.data().hourValue,
          });
        });

        response.json(listLocations);
      });
});


router.post("/locations", (request, response) => {
  const actualDate = new Date(Date.now());

  const geoloc =
   new admin.firestore.GeoPoint(request.body.latitude, request.body.longitude);

  const newLocation = {
    "address": request.body.address,
    "avaiableDays": request.body.avaiableDays,
    "avaiableHours": request.body.avaiableHours,
    "city": request.body.city,
    "geolocation": geoloc,
    "hourValue": request.body.hourValue,
    "imageUrl": request.body.imageUrl,
    "locationName": request.body.locationName,
    "number": request.body.number,
    "userID": request.body.userID,
    "zip": request.body.zip,
    "createDate": actualDate,
  };


  db.add(newLocation)
      .then((location) => {
        newLocation.id = location.id;
        response.status(200).json(newLocation);
      });
});

router.delete("/locations/:id", (request, response) => {
  db.doc(request.params.id).delete()
      .then((item) => {
        response.status(204).send(`Location is deleted: ${item}`);
      })
      .catch((item) => {
        response.status(404).send("Location deleted fail.");
      });
});


router.patch("/locations/avaiability/:id", (request, response) => {
  if (request.body.avaiableDays == null) {
    response.status(400).send("Missing avaiableDays");
  } else if (request.body.avaiableHours == null) {
    response.status(400).send("Missing avaiableHours");
  } else if (request.body.hourValue == null) {
    response.status(400).send("Missing hourValue");
  } else {
    db.doc(request.params.id).set({
      "avaiableDays": request.body.avaiableDays,
      "avaiableHours": request.body.avaiableHours,
      "hourValue": request.body.hourValue,
    }, {"merge": true}).then(response.status(200).send("Updated"));
  }
});


// Update new contact
router.patch("/locations/:id", (request, response) => {
  // const startDate = new Date(Date.parse(request.body.startDate));
  // const endDate = new Date(Date.parse(request.body.endDate));
  try {
    const updatedLocation = {
    "address": request.body.address,
    // "avaiableDays": request.body.avaiableDays,
    // "avaiableHours": request.body.avaiableHours,
    "city": request.body.city,
    // "geolocation": geoloc,
    // "hourValue": request.body.hourValue,
    // "imageUrl": request.body.imageUrl,
    "locationName": request.body.locationName,
    "number": request.body.number,
    "userID": request.body.userID,
    "zip": request.body.zip,
    // "createDate": actualDate,
  };

  db.doc(request.params.id).set(updatedLocation, {"merge": true}).then(response.status(200).send("Updated"));

  //   const newLocation = {};
  //   const body = request.body;
  //   if (body.userID) newLocation.userID = body.userID;

  //   if (body.locationName) newLocation.locationName = body.locationName;
  //   if (body.zip) newLocation.zip = body.zip;
  //   if (body.city) newLocation.city = body.city;
  //   if (body.address) newLocation.address = body.address;
  //   if (body.number) newLocation.number = body.number;
  //   if (body.imageUrl) newLocation.imageUrl = body.imageUrl;
  //   if (body.latitude && body.longitude) {
  //     const geoloc =
  //     new admin.firestore.GeoPoint(body.latitude, body.longitude);
  //     newLocation.geolocation = geoloc;
  //   }
  //   db.doc(request.params.id).update(newLocation)
  //       .then((location) =>
  //         response.status(200)
  //             .send(`${location.id} updated sucessfully`)
  //       );
  } catch (ex) {
    response.status(500).send("ERRO: " + ex.message);
  }
});


exports.dbLocations = functions.https.onRequest(app);
