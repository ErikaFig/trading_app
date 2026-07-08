const pool = require('../db/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    try {
        const { nombre, correo, password } = req.body;

        if (!nombre || !correo || !password) {
            return res.status(400).json({
                message: 'Todos los campos son obligatorios'
            });
        }

        const userExists = await pool.query(
            'SELECT * FROM usuarios WHERE correo = $1',
            [correo]
        );

        if (userExists.rows.length > 0) {
            return res.status(400).json({
                message: 'El usuario ya existe'
            });
        }

        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        const newUser = await pool.query(
            `INSERT INTO usuarios (nombre, correo, password_hash)
             VALUES ($1, $2, $3)
             RETURNING id_usuario, nombre, correo`,
            [nombre, correo, passwordHash]
        );

        res.status(201).json({
            message: 'Usuario registrado correctamente',
            user: newUser.rows[0]
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const { correo, password } = req.body;

        if (!correo || !password) {
            return res.status(400).json({
                message: 'Correo y contraseña son obligatorios'
            });
        }

        const result = await pool.query(
            'SELECT * FROM usuarios WHERE correo = $1',
            [correo]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: 'Usuario no encontrado'
            });
        }

        const user = result.rows[0];

        const passwordMatch = await bcrypt.compare(
            password,
            user.password_hash
        );

        if (!passwordMatch) {
            return res.status(401).json({
                message: 'Contraseña incorrecta'
            });
        }

        const token = jwt.sign(
            {
                id_usuario: user.id_usuario,
                correo: user.correo
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '24h'
            }
        );

        res.json({
            message: 'Login exitoso',
            token,
            user: {
                id_usuario: user.id_usuario,
                nombre: user.nombre,
                correo: user.correo
            }
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
};

module.exports = {
    registerUser,
    loginUser
};