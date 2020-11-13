

const reservaList = async (req, res) => {

    const result = await Reserva.allReserva();

    res.status(200).json({
      reservas: result,
    });
};

const reservaCreate = async (req, res) => {

    const { usuario_id:usuario, bicicleta_id:bicicleta, desde, hasta } = req.body

    const reserva = new Reserva({ usuario, bicicleta, desde: new Date(desde), hasta: new Date(hasta) })
    reserva.save();

    res.status(200).json({
      reserva,
    });
};

const reservaUpdate = async (req, res) => {

    const _id = req.params.id
    const {
      usuario_id: usuario,
      bicicleta_id: bicicleta,
      desde,
      hasta,
    } = req.body;

    const reserva = await Reserva.findById(_id)
    
    reserva.usuario = usuario
    reserva.bicicleta = bicicleta
    reserva.desde = new Date(desde)
    reserva.hasta = new Date(hasta)
    reserva.save()

    res.status(200).json({
      reserva,
    });
};

const reservaRemove = async (req, res) => {
  const _id = req.params.id;
  
  const reserva = await Reserva.removeById(_id)

  res.status(200).json({
    reserva,
  });
};

module.exports = {
  reservaList,
  reservaCreate,
  reservaUpdate,
  reservaRemove,
};
