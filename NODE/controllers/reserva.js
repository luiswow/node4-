var Reserva = require('../models/reserva')
var Usuario = require('../models/usuario')
var Bicicleta = require('../models/bicicleta')

const reservasUsersList = async (req, res) => {

    const reservas = await Reserva.allReserva();

    res.render("reserva/index", {reservas});
};

const reservasCreateView = async (req, res) => {

    const usuarios = await Usuario.find({})
    const bicicletas = await Bicicleta.allBicis()

    res.render("reserva/create", { usuarios, bicicletas});
};

const reservasCreate = async (req, res) => {

    const { usuario_id: usuario, bicicleta_id: bicicleta, desde, hasta } = req.body

    const reserva = new Reserva({ usuario, bicicleta, desde: new Date(desde), hasta: new Date(hasta) })
    reserva.save();

    res.redirect("/reservas");
};

module.exports = {
    reservasUsersList,
    reservasCreateView,
    reservasCreate,
}
