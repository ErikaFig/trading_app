const pool = require('../db/db');

const createPortfolio = async (req, res) => {
    try {
        const { nombre_portafolio, descripcion, balance } = req.body;

        const id_usuario = req.user.id_usuario;

        if (!nombre_portafolio) {
            return res.status(400).json({
                message: 'Nombre del portafolio requerido'
            });
        }

        const result = await pool.query(
            `INSERT INTO portafolios 
            (id_usuario, nombre_portafolio, descripcion, balance)
            VALUES ($1, $2, $3, $4)
            RETURNING *`,
            [
                id_usuario,
                nombre_portafolio,
                descripcion || null,
                balance || 0
            ]
        );

        res.status(201).json({
            message: 'Portafolio creado correctamente',
            portfolio: result.rows[0]
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
};

const getUserPortfolios = async (req, res) => {
    try {
        const id_usuario = req.user.id_usuario;

        const result = await pool.query(
            `SELECT * FROM portafolios
             WHERE id_usuario = $1
             ORDER BY fecha_creacion DESC`,
            [id_usuario]
        );

        res.json({
            portfolios: result.rows
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
};

const getPortfolioById = async (req, res) => {
    try {
        const id_usuario = req.user.id_usuario;
        const { id } = req.params;

        const result = await pool.query(
            `SELECT * FROM portafolios
             WHERE id_portafolio = $1
             AND id_usuario = $2`,
            [id, id_usuario]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: 'Portafolio no encontrado'
            });
        }

        res.json(result.rows[0]);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
};

const updatePortfolio = async (req, res) => {
    try {
        const { id } = req.params;
        const id_usuario = req.user.id_usuario;

        const {
            nombre_portafolio,
            descripcion,
            balance
        } = req.body;

        const result = await pool.query(
            `UPDATE portafolios
             SET nombre_portafolio = $1,
                 descripcion = $2,
                 balance = $3
             WHERE id_portafolio = $4
             AND id_usuario = $5
             RETURNING *`,
            [
                nombre_portafolio,
                descripcion,
                balance,
                id,
                id_usuario
            ]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: 'Portafolio no encontrado'
            });
        }

        res.json({
            message: 'Portafolio actualizado',
            portfolio: result.rows[0]
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
};

const deletePortfolio = async (req, res) => {
    try {
        const { id } = req.params;
        const id_usuario = req.user.id_usuario;

        const result = await pool.query(
            `DELETE FROM portafolios
             WHERE id_portafolio = $1
             AND id_usuario = $2
             RETURNING *`,
            [id, id_usuario]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: 'Portafolio no encontrado'
            });
        }

        res.json({
            message: 'Portafolio eliminado'
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
};

module.exports = {
    createPortfolio,
    getUserPortfolios,
    getPortfolioById,
    updatePortfolio,
    deletePortfolio
};