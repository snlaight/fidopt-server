const express = require("express");
const router = express.Router();

const meetingRequest = require("../models/Requests");

router.get("/meetingRequests", async (req, res) => {
  let meetingRequests = await meetingRequest
    .find()
    .then((allMeetingRequests) => {
      return allMeetingRequests;
    })
    .catch((error) => {
      console.log(error);
    });
  res.send(meetingRequests);
});

router.get("/meetingRequest/:id", async (req, res) => {
  let idRequest = req.params.id;
  let requestAMeeting = await meetingRequest
    .findById(idRequest)
    .then((requestFound) => {
      return requestFound;
    });
  res.send(requestAMeeting);
});

router.post("/newMeetingRequest", async (req, res) => {
  let reasonForMeeting = req.body.motiveForVisit;
  let meetingDate = req.body.date;
  let currentCity = req.body.ciudad;
  let newMeetingRequest = await meetingRequest
    .create({
      motiveForVisit: reasonForMeeting,
      date: meetingDate,
      ciudad: currentCity,
    })
    .then((newRequest) => {
      return newRequest;
    })
    .catch((error) => {
      console.log(error);
    });
  res.send(newMeetingRequest);
});

router.put("/updateMeetingRequest/:id", (req, res) => {
  let reasonForMeeting = req.body.motiveForVisit;
  let requestID = req.params.id;
  let meetingDate = req.body.date;
  let currentCity = req.body.ciudad;
  let currentStatus = req.body.status;
  meetingRequest
    .findByIdAndUpdate(requestID, {
      motiveForVisit: reasonForMeeting,
      date: meetingDate,
      ciudad: currentCity,
      status: currentStatus,
    })
    .then((updatedMeetingRequest) => {
      res.redirect(`/meetingRequest/${updatedMeetingRequest.id}`);
    })
    .catch((error) => {
      console.log(error);
    });
});

router.delete("/deleteMeetingRequest/:id", (req, res) => {
  let idRequest = req.params.id;
  meetingRequest.findByIdAndDelete(idRequest).then((deletedRequest) => {
    res.redirect("/meetingRequest");
  });
});

module.exports = router;
