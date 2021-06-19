const express = require("express");
const patientRouter = require("./patientRouter");
const physicianRouter = require("./physicianRouter");
const appointmentRouter = require("./appointmentRouter");
const router = express.Router();

router.get("/", (req, res) => {
	res.status(200).json("Bem-vindo a API de Gestor Médico");
});

router.use("/patient", patientRouter);
router.use("/physician", physicianRouter);
router.use("/appointment", appointmentRouter);

module.exports = router;
