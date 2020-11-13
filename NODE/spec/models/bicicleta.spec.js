var mongoose = require('mongoose');
var Bicicleta = require('../../models/bicicleta')



describe('Testing Bicicltas', function(){

    beforeAll(function(done){
        const mongoDB = "mongodb://localhost/red_bicicletas";
        mongoose.connect(mongoDB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex:false
        });
        mongoose.Promise = global.Promise
        const db = mongoose.connection
        db.on('error', console.error.bind('MongoDB connection error'))
        db.on('open', function(){
            console.log('We are connected to test database!')
            done()
        })
    })

    afterEach(function(done){
        Bicicleta.deleteMany({}, function(err, success){
            if (err) console.log(err)
                done()
        })
    })

    describe('Bicicleta create.Instance', () => {
        it('Crea una instancia de Bicicleta', () => {

            const bici = Bicicleta.createInstance(1, 'Verde', 'urbana', [-34.5, 54.1])

            expect(bici.code).toBe(1)
            expect(bici.color).toBe('Verde')
            expect(bici.modelo).toBe('urbana')
            expect(bici.ubicacion[0]).toBe(-34.5)
            expect(bici.ubicacion[1]).toBe(54.1)

            // console.log('Finalizado crear instancia')

        })
    })


    describe('Bicicleta.allBicis', () => {
        it('comienza vacia', done => {

            Bicicleta.allBicis(function(err, bicis){
                expect(bicis.length).toBe(0)
                // console.log('finalizado 0 bicis')
                done()
            })

        })
    })

    describe('Bicicleta.add', () => {
        it('Agregamos una bicicleta', (done) => {
            Bicicleta.allBicis(function (err, bicis) {
                expect(bicis.length).toBe(0)

                Bicicleta.add({ 
                    code:1, 
                    color:'verde', 
                    modelo:'urbana', 
                    ubicacion: [10.4589894, -66.5325691]
                }, function(err, newBici){
                    if (err) {
                        console.log(err)
                        done()
                    }
                    Bicicleta.allBicis(function(err, bici){
                        expect(bici.length).toBe(1)
                        // console.log('Finalizado agregar bicicleta')
                        done()
                    });
                });
                
            });

        });


    describe('Bicicleta.findByCode', () => {
        it('debe de devolver la bici con code 1', (done) => {
          Bicicleta.allBicis(function(err, bicis){
            expect(bicis.length).toBe(0);

            var aBici = new Bicicleta({code: 1, color: "verde", modelo:"urbana"});
            Bicicleta.add(aBici, function(err, newBici){
              if (err) console.log(err);
              var aBici2 = new Bicicleta({code:2, color: "roja", modelo:"deportiva"});
              Bicicleta.add(aBici2, function(err, newBici){
                if (err) console.log(err);
                Bicicleta.findByCode(1, function(error, targetBici){
                  expect(targetBici.code).toBe(aBici.code);
                  expect(targetBici.color).toBe(aBici.color);
                  expect(targetBici.modelo).toBe(aBici.modelo);
                  done();
                });
              });
            });
          });

        });    
      });



    })


//     describe('Bicicleta.findByID', () => {
//         it('debe devolver bici con id 1', async () => {

//             let allBicis = await Bicicleta.allBicis

//             expect(allBicis.length).toBe(0)

//             await Bicicleta.add({
//                 code: 1, 
//                 color: 'azul', 
//                 modelo: 'urbana', 
//                 ubicacion: [10.4589894, -66.5325691]
//             })
//             await Bicicleta.add({
//                 code: 2, 
//                 color: 'verde', 
//                 modelo: 'urbana', 
//                 ubicacion: [10.4589894, -66.5325691]
//             })
            

//             const targetBici = await Bicicleta.findByCode(1)
//             expect(targetBici.code).toBe(2)
//             expect(targetBici.color).toBe('azul')
//             expect(targetBici.modelo).toBe('urbana')
//         })
//     })

// })



    describe("Bicicleta.removeByCode", () => {
        it("debe eliminar la bici con code 1", (done) => {
            Bicicleta.allBicis(function (err, bicis) {
                expect(bicis.length).toBe(0);

                const aBici = new Bicicleta({ code: 1, color: "verde", modelo: "urbana" });
                Bicicleta.add(aBici, function (err, newBici) {
                    if (err) console.error(erro);

                    const aBici2 = new Bicicleta({ code: 2, color: "azul", modelo: "ruta" });
                    Bicicleta.add(aBici2, function (err, newBici) {
                        if (err) console.error(err);
                        Bicicleta.removeByCode(1, function (err, targetBici) {
                            expect(Bicicleta.allBicis.length).toBe(1);
                            done();
                        })
                    })
                })
            })
        })
    })
});

   






// beforeEach(() => {Bicicleta.allBicis = []})

// describe("Bicicleta.allBicis", () => {
//   it("comienza vacia", function() {
//     expect(Bicicleta.allBicis.length).toBe(0);
//   })
// })

// describe('Bicicleta.add', () => {
//   it("agregamos una", () => {
//     expect(Bicicleta.allBicis.length).toBe(0)
//     var a = new Bicicleta(1, 'rojo', 'urbana', [4.6718,-74.0638])
//     Bicicleta.add(a)

//     expect(Bicicleta.allBicis.length).toBe(1)
//     expect(Bicicleta.allBicis[0]).toBe(a)
//   })
// })

// describe("Bicicleta.findById", () => {
//   it("debe buscar la bicicleta con el id correspondiente", function() {
//     expect(Bicicleta.allBicis.length).toBe(0)
//     var aBici1 = new Bicicleta(1, "verde", "urbana")
//     var aBici2 = new Bicicleta(2, "rojo", "montaña")
//     Bicicleta.add(aBici1)
//     Bicicleta.add(aBici2)

//     var targetBici = Bicicleta.findById(1)
//     expect(targetBici.id).toBe(aBici1.id)
//     expect(targetBici.color).toBe(aBici1.color)
//     expect(targetBici.modelo).toBe(aBici1.modelo)

//     var targetBici = Bicicleta.findById(100)
//     expect(null).toBe(targetBici)
//   })
// })

// describe("Bicicleta.removeById", () => {
//   it("debe eliminar una bicicleta", function() {
//     expect(Bicicleta.allBicis.length).toBe(0)
//     var aBici1 = new Bicicleta(1, "verde", "urbana")
//     var aBici2 = new Bicicleta(2, "rojo", "montaña")
//     var aBici3 = new Bicicleta(3, "blanca", "ruta")
//     Bicicleta.add(aBici1)
//     Bicicleta.add(aBici2)
//     Bicicleta.add(aBici3)

//     expect(Bicicleta.allBicis.length).toBe(3)

//     Bicicleta.removeById(1)
//     expect(Bicicleta.allBicis.length).toBe(2)

//     var targetBici1 = Bicicleta.findById(1)
//     expect(null).toBe(targetBici1)

//     var targetBici2 = Bicicleta.findById(2)
//     expect(targetBici2.id).toBe(aBici2.id)
//     expect(targetBici2.color).toBe(aBici2.color)
//     expect(targetBici2.modelo).toBe(aBici2.modelo)

//     var targetBici3 = Bicicleta.findById(3)
//     expect(targetBici3.id).toBe(aBici3.id)
//     expect(targetBici3.color).toBe(aBici3.color)
//     expect(targetBici3.modelo).toBe(aBici3.modelo)

//     Bicicleta.removeById(1)
//     expect(Bicicleta.allBicis.length).toBe(2)

//     var aBici4 = new Bicicleta(3, "verde", "montaña")
//     Bicicleta.add(aBici4)

//   })
// })
