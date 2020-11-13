// const Usuario = require('../../models/usuario');
// const request = require('request');
// const server = require('../../bin/www');

var mongoose = require('mongoose');

describe('test API Usuarios', () => {
    beforeAll(function (done) {
        mongoose.disconnect();
        done();
    })

    beforeEach(function (done) {
        const mongoDB = 'mongodb://localhost/red_bicicletas';
        mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function () {
            console.log("Connection successfully");
            done();
        })
    });

    afterEach(function (done) {
        Usuario.deleteMany({}, function (err, success) {
            if (err) console.log(err);
            mongoose.disconnect(err);
            done();
        });
    });

    describe('GET USUARIOS /', () => {
        it('Status 200', (done) => {
            request.get('http://localhost:5000/api/usuarios', function (error, response, body) {
                const result = JSON.parse(body);
                expect(response.statusCode).toBe(200);
                expect(result.usuarios).toBe(1);
                done();
            });
        });
    });

    describe("POST Usuarios /create", () => {
        it("Status 201", (done) => {
            const headers = { 'content-type': 'application/json' };
            const user = {"nombre":"Rodolfo"};

            request.post({
                headers: headers,
                url: 'http://localhost:5000/api/usuarios/create',
                body: user
            }, function (err, response, body) {
                expect(response.statusCode).toBe(201);
                var result = JSON.parse(body);
                console.log(result);
                expect(result.nombre).toBe("Rodolfo");
                done();
           });
       });
   });

});