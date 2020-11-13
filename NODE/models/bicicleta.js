var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bicicletaSchema = new Schema({
  code: Number, 
  color: String,
  modelo: String,
  ubicacion: {
    type: [Number], 
    index: { type: '2dsphere', sparse: true }
  }
});


bicicletaSchema.statics.createInstance = function (code, color, modelo, ubicacion){
  return new this({ 
    code: code,
    color: color,
    modelo: modelo,
    ubicacion: ubicacion
  });
}

bicicletaSchema.statics.allBicis = function (callback){
  return this.find({}, callback);
    // if (callback == null) {
    //     return this.find({});
    // }
}

bicicletaSchema.methods.toString = function (){
    return `code: ${this.code} | color ${this.color}`; 
}


bicicletaSchema.statics.add = function(aBici, callback){
  return this.create(aBici, callback);
    // if (callback == null) {
    //     return this.create(newBici)
    // } 
}

bicicletaSchema.statics.findByCode = function(aCode, callback){
  return this.findOne({code: aCode}, callback);
     // if (callback == null) {
    //     return this.findOne({ code })
    // }
  }

  bicicletaSchema.statics.removeByCode = function(aCode, callback){
    return this.deleteOne({code: aCode}, callback);
  }


module.exports = mongoose.model('Bicicleta', bicicletaSchema);






// var Bicicleta = function (id, color, modelo, ubicacion){
//   this.id = id
//   this.color = color
//   this.modelo = modelo
//   this.ubicacion = ubicacion
// }

// Bicicleta.prototype.toString = function(){
//   return 'id: '+this.id + ' | color: '+ this.color
// }

// Bicicleta.allBicis = []
// Bicicleta.add = function (aBici){
//   const index = Bicicleta.findIndexById(aBici.id)
//   if (index == null){
//     Bicicleta.allBicis.push(aBici)
//   } else {
//     console.error("Ya existe una bicicleta con Id = "+aBici.id)
//   }
// }

// Bicicleta.findIndexById = function(aBiciId){
//   const condicion = (e) => e.id == aBiciId;
//   const index = Bicicleta.allBicis.findIndex(condicion)
//   return index < 0 ? null : index
// }

// Bicicleta.findById = function(aBiciId){
//   const index = Bicicleta.findIndexById(aBiciId)
//   return index == null ? null : Bicicleta.allBicis[index]
// }

// Bicicleta.removeById = function(aBiciId){
//   const index = Bicicleta.findIndexById(aBiciId)
//   if (index != null){Bicicleta.allBicis.splice(index,1)}
// }

// Bicicleta.mensaje = function(){
//   var message = 'testiado...';
//   console.log(message);
// }

/*
var a = new Bicicleta(1, 'rojo', 'urbana', [4.6718,-74.0638])
var b = new Bicicleta(2, 'verde', 'montaña', [4.6667,-74.0634])

Bicicleta.add(a)
Bicicleta.add(b)
*/

// module.exports = Bicicleta;
