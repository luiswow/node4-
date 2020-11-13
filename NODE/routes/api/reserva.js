var express = require("express");
var router = express.Router();
var reservaController = require("../../controllers/api/reservaControllerAPI");

router.get("/", reservaController.reservaList);
router.post("/", reservaController.reservaCreate);
router.put("/:id", reservaController.reservaUpdate);
router.delete("/:id", reservaController.reservaRemove);

module.exports = router;
