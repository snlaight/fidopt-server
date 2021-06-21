const express = require("express");
const router = express.Router();

const adoptionRequest = require("../models/Requests");

router.get("/adoptionRequests", async (req, res) => {
  let adoptionRequests = await adoptionRequest
    .find()
    .then((allAdoptionRequests) => {
      return allAdoptionRequests;
    })
    .catch((error) => {
      console.log(error);
    });
  res.send(adoptionRequests);
});

router.get("/adoptionRequest/:id", async (req, res) => {
  let idRequest = req.params.id;
  let requestAdoption = await adoptionRequest
    .findByID(idRequest)
    .then((requestFound) => {
      return requestFound;
    });
  res.send(requestAdoption);
});

router.post("/newAdoptionRequest", async (req, res) => {
  let reasonForAdoption = req.body.adoptionReason;
  let currentCity = req.body.ciudad;
  let createdRequest = await adoptionRequest
    .create({
      adoptionReason: reasonForAdoption,
      ciudad: currentCity,
    })
    .then((newRequest) => {
      return newRequest;
    })
    .catch((error) => {
      console.log(error);
    });
  res.send(createdRequest);
});

router.put("/updateAdoptionRequest/:id", (req, res) => {
  let reasonForAdoption = req.body.adoptionReason;
  let requestID = req.params.id;
  let currentCity = req.body.ciudad;
  let currentStatus = req.body.status;
  adoptionRequest
    .findByIdAndUpdate(requestID, {
      adoptionReason: reasonForAdoption,
      ciudad: currentCity,
      status: currentStatus,
    })
    .then((updatedAdoptionRequest) => {
      res.redirect(`/adoptionRequest/${updatedAdoptionRequest.id}`);
    })
    .catch((error) => {
      console.log(error);
    });
});

router.delete("/deleteAdoptionRequest/:id", (req, res) => {
  let idRequest = req.params.id;
  adoptionRequest.findByIDAndDelete(idRequest).then((deletedRequest) => {
    res.redirect("/adoptionRequests");
  });
});

module.exports = router;
