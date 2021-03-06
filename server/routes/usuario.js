const express = require('express');
const Usuario = require('../models/usuario');

const bcryp = require('bcrypt');

const _ = require('underscore');

const app = express();



app.get('/usuario', function(req, res) {

    let desde = req.query.desde || 0;

    let limite = req.query.limite || 5;

    limite = Number(limite);

    desde = Number(desde);
    Usuario.find({ estado: true }, 'nombre email role estado google img')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Usuario.count({ estado: true }, (err, conteo) => {
                res.json({
                    ok: true,
                    usuarios,
                    total_usuarios: conteo
                });
            });

            /*  res.json({
                  ok: true,
                  usuarios
              });*/
        });
    //res.json('get Usuario')
});

app.post('/usuario', function(req, res) {

    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcryp.hashSync(body.password, 10),
        role: body.role
    });
    usuario.save((err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });

        }

        //usuarioDB.password = null;


        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });


    /*

        if (body.nombre === undefined) {
            res.status(400).json({
                ok: false,
                message: 'the name is required'
            });
        } else {
            res.json({ persona: body });
        }*/


});

app.put('/usuario/:id', function(req, res) {
    let id = req.params.id;

    //let body = req.body;

    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado'])
        // delete body.password;
        //delete body.google;

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });


    });
    //res.json('put Usuario  :' + id)
    /*  res.json({
          id
      });*/
});

app.delete('/usuario/:id', function(req, res) {

    let id = req.params.id;

    let cambioEstado = {
        estado: false
    }

    Usuario.findByIdAndUpdate(id, cambioEstado, { new: true }, (err, usuarioBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioBorrado
        });
    });

    /*res.json({ 
            message: 'hola desde delete'
        });*/



    /* Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
         if (err) {
             return res.status(400).json({
                 ok: false,
                 err
             });

         }

         if (usuarioBorrado === null) {
             return res.status(400).json({
                 ok: false,
                 error: {
                     message: 'El usuario no ha sido encontrado'
                 }
             });
         }
         res.json({
             ok: true,
             usuario: usuarioBorrado
         });
     });*/



});
module.exports = { app };