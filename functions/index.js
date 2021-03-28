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
        {"latitude":
        location.data().geolocation.latitude.toString(),
        "longitude":
        location.data().geolocation.longitude.toString(),
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
            geolocation: location.data().geolocation,
            createDate: new Date(location.data().createDate),
          });
        });

        response.json(listLocations);
      });
});


router.post("/locations", (request, response) => {
  const actualDate = new Date(Date.now());

  const newLocation = {
    "userID": request.body.userID,
    "locationName": request.body.name,
    "zip": request.body.zip,
    "city": request.body.city,
    "address": request.body.address,
    "number": request.body.number,
    "imageUrl": request.body.imageUrl,
    "geolocation": request.body.geolocation,
    "createDate": actualDate,
  };
  db.add(newLocation)
      .then(() => {
        response.status(200).json("Success Added");
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

// Update new contact
router.patch("/locations/:id", (request, response) => {
  // const startDate = new Date(Date.parse(request.body.startDate));
  // const endDate = new Date(Date.parse(request.body.endDate));
  try {
    const newLocation = {};
    const body = request.body;
    if (body.userID) newLocation.userID = body.userID;

    if (body.locationName) newLocation.locationName = body.locationName;
    if (body.zip) newLocation.zip = body.zip;
    if (body.city) newLocation.city = body.city;
    if (body.address) newLocation.address = body.address;
    if (body.number) newLocation.number = body.number;
    if (body.imageUrl) newLocation.imageUrl = body.imageUrl;
    if (body.geolocation) newLocation.geolocation = body.geolocation;
    db.doc(request.params.id).update(newLocation)
        .then(
            (location) => response.send(`${location.id} updated sucessfully`)
        );
  } catch (ex) {
    response.status(500).send("ERRO: " + ex.message);
  }
});

exports.dbLocations = functions.https.onRequest(app);
