var Bicicleta = require('../../models/bicicleta');
var request = require('request');
var server = require('../../bin/www');
var fetch = require("node-fetch");

var mongoose = require('mongoose');

const API_HOST = "http://localhost:5000/api";

describe('Bicicleta API', () => {

    beforeAll(function (done) {
        // const mongoDB = "mongodb://coursera:123456@localhost/coursera";
        const mongoDB = "mongodb://localhost/red_bicicletas";
        mongoose.connect(mongoDB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: false
        });
        mongoose.Promise = global.Promise
        const db = mongoose.connection
        db.on('error', console.error.bind('MongoDB connection error'))
        db.on('open', function () {
            // console.log('We are connected to test database!')
            done()
        })
    })

    afterEach(function (done) {
        Bicicleta.deleteMany({}, function (err, success) {
            if (err) console.log(err)
            done()
        })
    })

    describe('GET BICICLETAS /', () => {
        it('Status 200', async () => {
            let bicicletas = await Bicicleta.allBicis()
            expect(bicicletas.length).toBe(0)

            let a = Bicicleta.createInstance(1, 'verde', 'urbana', [10.4589894, -66.5325691])
            await Bicicleta.add(a)

            const response = await fetch(`${API_HOST}/bicicletas`)
            // console.log('GET BICICLETAS', response.status)
            expect(response.status).toBe(200);
        })
    })

    describe('POST BICICLETAS create', () => {
        it('STATUS 200', (done) => {
            const headers = { 'Content-Type': 'application/json' }
            const aBici = { code:10, color: 'Rojo', modelo: 'Rural', lat: -34, lng: -54 }

            fetch(`${API_HOST}/bicicletas`, {
              headers,
              method: "POST",
              body: JSON.stringify(aBici),
            })
            .then(res => {
                expect(res.status).toBe(201);
                Bicicleta.findByCode(10, (err, bicicleta) => {
                    expect(bicicleta.color).toBe(aBici.color);
                    done()
                })
            })
            .catch(console.log)
            .finally(() => done())

        });
    });
   
    describe('POST BICICLETAS update', () => {

        beforeEach((done) => {
          Bicicleta.add({
            code: 10,
            color: "Verde",
            modelo: "Rural",
            ubicacion: [-34,-54],
          }, (err, doc) => {
              done()
          });
        })

        it('STATUS 200', (done) => {
            const headers = { 'Content-Type': 'application/json' }
            const aBici = { code:10, color: 'Rojo', modelo: 'Rural', lat: -34, lng: -54 }
            Bicicleta.findByCode(10, (err, bicicleta) => {
                // console.log('STATUS200', bicicleta)
                expect(bicicleta.color).toBe('Verde');

                fetch(`${API_HOST}/bicicletas/${aBici.code}`, {
                  headers,
                  method: "PUT",
                  body: JSON.stringify(aBici),
                })
                .then(res => {
                    expect(res.status).toBe(200);
                    Bicicleta.findByCode(10, (err, bicicleta2) => {
                        expect(bicicleta2.color).toBe(aBici.color);
                        done()
                    });
                });
                .catch(console.log)
                .finally(() => done())
            });


        });
    });
    
    describe('POST BICICLETAS update', () => {


        beforeEach((done) => {
            Bicicleta.add({
                code: 10,
                color: "Verde",
                modelo: "Rural",
                ubicacion: [-34, -54],
            }, (err, doc) => {
                done()
            });
        })

        it('STATUS 200', (done) => {
            const headers = { 'Content-Type': 'application/json' }
            Bicicleta.allBicis((err, bicicletas) => {

                expect(bicicletas.length).toBe(1);
                
                fetch(`${API_HOST}/bicicletas/${10}`, {
                  headers,
                  method: "DELETE"
                });
                .then(res => {
                    expect(res.status).toBe(200);
                    Bicicleta.allBicis((err, bicicletas2) => {
                        expect(bicicletas2.length).toBe(0);
                        done();

                    });
                });
                .catch(console.log);
                .finally(() => done());
            });

        });
    });
    
});





// describe('Bicicleta API', () => { 
// 	describe('GET BICICLETAS /', () => {
// 		it('Status 200', () => {
// 			expect(Bicicleta.allBicis.length).toBe(0);

// 			var a = new Bicicleta(1, 'rojo', 'urbana', [4.6718,-74.0638]);
// 			Bicicleta.add(a);

// 			request.get('http://localhost:5000/api/bicicletas', function(error, response, body){
// 				expect(response.statusCode).toBe(200);
// 			});
// 		});
// 	});
// });


// describe('POST BICICLETAS /', () => {
// 	it('STATUS 200', (done) => {
// 		var headers = {'content-type':'application/json'};
// 		var aBici = '{"id": 10, "color": "rojo", "modelo": "urbana", "lat": -34, "lng": -54}';
// 		request.post({
// 			headers: headers,
// 			url: 'http://localhost:5000/api/bicicletas/create',
// 			body: aBici
// 		}, function(error, response, body){
// 			expect(response.statusCode).toBe(200);
// 			expect(Bicicleta.findById(10).color).toBe("rojo");
// 			done();
// 		});

// 	});

// });


// describe('Hello test', () => {
// 	it('primer test', () => {
// 		expect(Bicicleta.mensaje.length).toBe(0);
// 		 Bicicleta.mensaje();
// 	});
// });
