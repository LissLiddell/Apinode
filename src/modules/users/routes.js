const express = require('express')
const sql = require('mssql');
const config = require('../../config')
const controller = require('./index')
const response = require('../../red/response')
const security = require('./security')
const bcrypt = require('bcrypt')

const router = express.Router()

router.post('/', add, security())
router.get('/', all)
router.get('/:id', one)
router.delete('/:id', del, security())
router.put('/:id', update)

async function add (req,res, next) {
    try {
        let pool = await sql.connect(config);
        let { nickname, fechaRegistro, correo, Estatus, contra } = req.body;
        const saltRounds = 5;
        const hashedPassword = await bcrypt.hash(contra, saltRounds);
        let result = await pool.request()
          .input('nickname', sql.VarChar, nickname)
          .input('fechaRegistro', sql.DateTime, fechaRegistro)
          .input('correo', sql.VarChar, correo)
          .input('Estatus', sql.Int, Estatus)
          .input('contra', sql.VarChar, hashedPassword)
          .query(`INSERT INTO usuarioLiss (nickname, fechaRegistro, correo, Estatus, contra) VALUES (@nickname, @fechaRegistro, @correo, @Estatus, @contra)`);
    
        res.json(result.recordset);
      } catch (err) {
        console.error('Error al ejecutar la consulta', err);
        res.status(500).send('Error al consultar la base de datos');
      }
}

 async function all (req, res) {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request().query('SELECT * FROM usuarioLiss');
        res.json(result.recordset);
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
            .query('DELETE FROM usuarioLiss WHERE IdUsuario = @id');

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
        let result = await pool.request().query(`SELECT * FROM usuarioLiss WHERE IdUsuario = ${req.params.id}`);
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
        let { nickname, fechaRegistro, correo, Estatus, contra } = req.body;
        let pool = await sql.connect(config);
        const saltRounds = 5;
        const hashedPassword = await bcrypt.hash(contra, saltRounds);
        let result = await pool.request()
          .input('id', sql.Int, id)
          .input('nickname', sql.VarChar, nickname)
          .input('fechaRegistro', sql.DateTime, fechaRegistro)
          .input('correo', sql.VarChar, correo)
          .input('Estatus', sql.Int, Estatus)
          .input('contra', sql.VarChar(100), hashedPassword)
            .query('UPDATE usuarioLiss SET nickname = @nickname, fechaRegistro = @fechaRegistro, correo = @correo, Estatus = @Estatus, contra = @contra  WHERE IdUsuario = @id');

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