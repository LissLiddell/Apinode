const express = require('express')
const sql = require('mssql');
const response = require('../../red/response')
const controller = require('./index')

const router = express.Router()

router.post('/', add,)
router.get('/', all)
router.get('/:id', one)
router.delete('/:id', del)
router.put('/:id', update)

async function add (req,res, next) {
    try {
        let pool = await sql.connect(config);
        let { fechaRegistro, telefono, idUsuario } = req.body;
        let result = await pool.request()
          .input('fechaRegistro', sql.DateTime, fechaRegistro)
          .input('telefono', sql.BigInt, telefono)
          .input('idUsuario', sql.Int, idUsuario)
          .query(`INSERT INTO contactoLiss (fechaRegistro, telefono, idUsuario) VALUES (@fechaRegistro, @telefono, @idUsuario)`);
        message = 'Contact Saved'
        res.json({contacts: result.recordset, message,  status: 201})
      } catch (err) {
        console.error('Error al ejecutar la consulta', err);
        res.status(500).send('Error al consultar la base de datos');
      }
}

 async function all (req, res, next) {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request().query('SELECT * FROM contactoLiss');
        res.json({contacts: result.recordset, status: 201})
      } catch (err) {
        console.error('Error al ejecutar la consulta', err);
        res.status(500).send('Error al consultar la base de datos');
      }
}

async function del (req,res, next) {
    try {
        // Verificar que el parámetro id esté presente y sea un número
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).send('ID inválido');
        }

        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('id', sql.Int, id) // Usar parámetros para evitar inyección SQL
            .query('DELETE FROM contactoLiss WHERE IdContacto = @id');

        if (result.rowsAffected[0] === 0) {
            return res.status(404).send('Registro no encontrado');
        }

        res.json({ message: 'Registro eliminado correctamente' });
    } catch (err) {
        console.error('Error al ejecutar la consulta', err);
        res.status(500).send('Error al consultar la base de datos');
    }
}

 async function one (req, res, next) {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request().query(`SELECT * FROM contactoLiss WHERE IdContacto = ${req.params.id}`);
        res.json(result.recordset);
      } catch (err) {
        console.error('Error al ejecutar la consulta', err);
        res.status(500).send('Error al consultar la base de datos');
      }
}

async function update(req, res, next) {
    try {
        // Verificar que el parámetro id esté presente y sea un número
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).send('ID inválido');
        }
        let {  fechaRegistro, telefono } = req.body;
        let pool = await sql.connect(config);
        let result = await pool.request()
          .input('id', sql.Int, id)
          .input('fechaRegistro', sql.DateTime, fechaRegistro)
          .input('telefono', sql.BigInt, telefono)
            .query('UPDATE contactoLiss SET fechaRegistro = @fechaRegistro, telefono = @telefono WHERE IdContacto = @id');

        if (result.rowsAffected[0] === 0) {
            return res.status(404).send('Registro no encontrado');
        }

        res.json({ message: 'Registro actualizado correctamente' });
    } catch (err) {
        console.error('Error al ejecutar la consulta', err);
        res.status(500).send('Error al consultar la base de datos');
    }
}

module.exports = router