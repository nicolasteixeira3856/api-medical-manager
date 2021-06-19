const express = require("express");
const physicianRouter = express.Router();
const physicianController = require("../controllers/physicianController");
const auth = require("../middlewares/auth");

physicianRouter.post("/authentication", physicianController.authentication);
physicianRouter.get("/listAllPhysician", auth, physicianController.listAllPhysicians);
physicianRouter.post("/newPhysician", physicianController.newPhysician);
physicianRouter.put("/updatePhysician/", auth, physicianController.updatePhysician);
physicianRouter.delete("/deletePhysician/:id", auth, physicianController.deletePhysician);
physicianRouter.get("/logout", auth, physicianController.logout);

module.exports = physicianRouter;