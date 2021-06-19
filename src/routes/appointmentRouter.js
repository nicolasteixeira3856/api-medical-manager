const express = require("express");
const appointmentRouter = express.Router();
const appointmentController = require("../controllers/appointmentController");

appointmentRouter.get("/searchAppointmentByPatientId/:id", appointmentController.searchAppointmentByPatientId);
appointmentRouter.get("/searchAppointmentByPhysicianId/:id", appointmentController.searchAppointmentByPhysicianId);
appointmentRouter.delete("/deleteAppointment/:id", appointmentController.deleteAppointment);
appointmentRouter.post("/newAppointment", appointmentController.newAppointment);

module.exports = appointmentRouter;