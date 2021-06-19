const express = require("express");
const patientRouter = express.Router();
const patientController = require("../controllers/patientController");

patientRouter.get("/listAllPatients", patientController.listAllPatients);
patientRouter.post("/searchPatientbyName/", patientController.searchPatientByName);
patientRouter.post("/newPatient", patientController.newPatient);
patientRouter.put("/updatePatient", patientController.updatePatient);
patientRouter.get("/searchPatientByPhysicianId/:id", patientController.searchPatientByPhysicianId);


module.exports = patientRouter;