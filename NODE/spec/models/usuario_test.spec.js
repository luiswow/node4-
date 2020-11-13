var mongoose = require("mongoose");
var Bicicleta = require("../../models/bicicleta");
var Usuario = require("../../models/usuario");
var Reserva = require("../../models/reserva");



describe('Testing Usuarios', function () {
    beforeEach(function (done) {
        const mongoDB = 'mongodb://localhost/red_bicicletas';
        mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function () {
            console.log("Connection successfully");
            done();
        });
    });

    afterEach(function (done) {
        Reserva.deleteMany({}, function (err, success) {
            if (err) console.log(err);
            Usuario.deleteMany({}, function (err, success) {
                if (err) console.log(err);
                Bicicleta.deleteMany({}, function (err, success) {
                    if (err) console.log(err);
                    // mongoose.disconnect(err);
                    done();
                });
            });
        });
    });

    describe("Cuando un usuario reserva una bici", () => {
        it("Debe existir la reserva", (done) => {
            const usuario = new Usuario({ 
                nombre: 'Merlon', 
                email: 'pruebath@test.com',
                password: '123344'  
            })
            usuario.save();

            const bicicleta = new Bicicleta({ 
                code: 1, 
                color: "Verde", 
                modelo: "urbana" 
            })
            bicicleta.save();

            var hoy = new Date();
            var mañana = new Date();
            mañana.setDate(hoy.getDate()+1);
         
            usuario.reservar(bicicleta.id, hoy, mañana, function(err, reserva){
                Reserva.find({}).populate('bicicleta').populate('usuario').exec(function(err, reservas){
                    console.log(reservas[0]);
                    expect(reservas.length).toBe(1);
                    expect(reservas[0].diasDeReserva()).toBe(2);
                    expect(reservas[0].bicicleta.code).toBe(1)
                    expect(reservas[0].usuario.nombre).toBe(usuario.nombre);
                    done();
                });
            });
        });
    });
});



// describe('Testing Usuarios', function(){

//     beforeAll(function (done) {
//       const mongoDB = "mongodb://localhost/red_bicicletas";
//       mongoose.connect(mongoDB, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         autoIndex: false,
//       });
//       mongoose.Promise = global.Promise;
//       const db = mongoose.connection;
//       db.on("error", console.error.bind("MongoDB connection error"));
//       db.on("open", function () {
//         console.log("We are connected to test database!");
//         done();
//       });
//     });

//     afterEach(async () => {
//         await Reserva.deleteMany({})
//         await Usuario.deleteMany({})
//         await Bicicleta.deleteMany({})
//     });

//     describe('Cuando un usuario reserva una bici', () => {
//         it('debe existir la reserva', (done) => {
//             const usuario = new Usuario({nombre: 'Ezequiel'});
//             usuario.save();

//             const bicicleta = new Bicicleta({
//               code: 1,
//               color: 'Rojo',
//               modelo: 'urbana',
//               ubicacion: [-34.5, 54.1]
//             });

//             bicicleta.save();

//             const hoy = new Date();
//             const manana = new Date();

//             manana.setDate(hoy.getDate() + 1);
//             usuario.reservar(bicicleta._id, hoy, manana, function(err, reserva) {

//                 Reserva.find({})
//                   .populate("usuario")
//                   .populate("bicicleta")
//                   .exec(function (err, reservas) {

//                     const reservaDb = reservas[0];

//                     // console.log(".length", reservas.length);
//                     expect(reservas.length).toBe(1)
//                     // console.log(".diasDeReserva()", reservaDb.diasDeReserva());
//                     expect(reservaDb.diasDeReserva()).toBe(2);
//                     expect(reservaDb.bicicleta.code).toBe(1);
//                     expect(reservaDb.usuario.nombre).toBe("Ezequiel");
//                     done()

//                   });

//             });

//         })
        
//     })
    



// })
