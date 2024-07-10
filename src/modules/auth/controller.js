const sql = require('mssql');
const bcrypt = require('bcrypt');
const auth = require('../../auth/index'); // Asegúrate de que tienes el módulo auth con la función assignToken
const config = require('../../config');

async function login(user, password) {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('user', sql.VarChar, user) // Usar el parámetro 'user' pasado como argumento
            .query('SELECT * FROM usuarioLiss WHERE nickname = @user'); // Asegúrate de que 'nickname' es el campo correcto en tu base de datos

        if (result.recordset.length === 0) {
            return null; // No se encontró usuario
        }
   
        const data = result.recordset[0];
        const isMatch = await bcrypt.compare(password, data.contra);
        if (isMatch) {
            // Generar token
            return {IdUsuario: data.IdUsuario, token: auth.assignToken({ ...data })};
        } else {
            return null;
        }
    } catch (err) {
        console.error('Error al ejecutar la consulta', err);
        throw err; // También puedes manejar el error según sea necesario
    }
}

module.exports = {
    login,
};