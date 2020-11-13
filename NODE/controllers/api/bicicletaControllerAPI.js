var Bicicleta = require('../../models/bicicleta')

//Funcion para listar bicicletas por medio de un endpoint
exports.bicicleta_list = function (req, res) {
    Bicicleta.allBicis((err, bicicletas) => {
        res.status(200).json({
            bicicletas
        })
    })
}

exports.bicicleta_create = function (req, res) {
    const { color, modelo, lat, lng } = req.body;
    const bici = new Bicicleta({ color, modelo, ubicacion: [lat, lng] });
    Bicicleta.add(bici);

    res.status(201).json({
        bicicleta: bici
    });
}



exports.bicicleta_delete = function(req, res){
  Bicicleta.removeById(req.body.id, (err, success) => {
        if (err) console.log(err)
        res.status(204).send();
    });
  
}


exports.bicicleta_update = function(req, res){
  var bici = Bicicleta.findById(req.body.id_busqueda)
  if(bici){
    bici.id = req.body.id
    bici.color = req.body.color
    bici.modelo = req.body.modelo
    bici.ubicacion = [req.body.lat,req.body.lng]
    res.status(200).json({bicicleta: bici})
  } else {
    res.send("no se encontró una bici con id "+req.body.id_busqueda)
  }
}

