const express = require("express");
const router = express.Router();
const reservaController = require("../controllers/reserva");

router.get("/", reservaController.reservasUsersList);
router.get("/create", reservaController.reservasCreateView);
router.post("/create", reservaController.reservasCreate);

module.exports = router;
