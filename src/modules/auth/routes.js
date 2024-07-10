const express = require('express');
const router = express.Router();
const controller = require('./controller'); // Asegúrate de importar el controlador correcto
const sql = require('mssql');
const config = require('../../config');

router.post('/login', async (req, res, next) => {
    try {
        console.log('Cuerpo de la solicitud:', req.body);
        const { nickname, contra } = req.body;

        // Verificar que user y password estén presentes y sean cadenas válidas
        if (!nickname || typeof nickname !== 'string' || nickname.trim() === '') {
            return res.status(400).json({ error: 'El parámetro user es inválido' });
        }

        if (!contra || typeof contra !== 'string' || contra.trim() === '') {
            return res.status(400).json({ error: 'El parámetro password es inválido' });
        }

        const objUser = await controller.login(nickname, contra);
        if (objUser.token) {
            res.json({IdUsuario:objUser.IdUsuario, token: objUser.token, status: objUser.token ? 200 : 500, error: objUser.token == null})
        } else {
            res.status(500).json({ error: 'Credenciales inválidas' });
        }
    } catch (err) {
        next(err); // Pasar el error al siguiente middleware de manejo de errores
    }
});

module.exports = router;