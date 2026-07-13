const pool = require("../db/db");

const sellStock = async (req, res) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const {
      id_portafolio,
      simbolo,
      cantidad,
      precio_venta
    } = req.body;

    const id_usuario = req.user.id_usuario;

    // Buscar la acción dentro del portafolio
    const stockResult = await client.query(
      `
      SELECT *
      FROM portafolio_acciones
      WHERE id_portafolio = $1
      AND simbolo = $2
      `,
      [id_portafolio, simbolo]
    );

    if (stockResult.rows.length === 0) {
      throw new Error("No tienes acciones de este símbolo.");
    }

    const stock = stockResult.rows[0];

    if (cantidad > stock.cantidad) {
      throw new Error("No tienes suficientes acciones.");
    }

    const ingresoVenta = cantidad * precio_venta;

    const ganancia =
      (Number(precio_venta) - Number(stock.precio_promedio_compra)) *
      Number(cantidad);

    // Registrar venta
    await client.query(
      `
      INSERT INTO ventas
      (
        id_usuario,
        id_portafolio,
        cantidad,
        precio_venta,
        ganancia_perdida,
        simbolo
      )
      VALUES ($1,$2,$3,$4,$5,$6)
      `,
      [
        id_usuario,
        id_portafolio,
        cantidad,
        precio_venta,
        ganancia,
        simbolo
      ]
    );

    const nuevaCantidad = stock.cantidad - cantidad;

    if (nuevaCantidad === 0) {

      await client.query(
        `
        DELETE FROM portafolio_acciones
        WHERE id = $1
        `,
        [stock.id]
      );

    } else {

      const nuevaInversion =
        Number(stock.precio_promedio_compra) * nuevaCantidad;

      await client.query(
        `
        UPDATE portafolio_acciones
        SET
            cantidad = $1,
            inversion_total = $2
        WHERE id = $3
        `,
        [
          nuevaCantidad,
          nuevaInversion,
          stock.id
        ]
      );

    }

    // Actualizar balance y ganancia acumulada del portafolio
    await client.query(
      `
      UPDATE portafolios
      SET
          balance = balance + $1,
          ganancia_total = ganancia_total + $2
      WHERE id_portafolio = $3
      `,
      [
        ingresoVenta,
        ganancia,
        id_portafolio
      ]
    );

    await client.query("COMMIT");

    res.json({
      message: "Venta realizada correctamente",
      ganancia
    });

  } catch (error) {

    await client.query("ROLLBACK");

    console.error(error);

    res.status(400).json({
      message: error.message
    });

  } finally {

    client.release();

  }
};

const getUserStocks = async (req, res) => {

  try {

    const id_usuario = req.user.id_usuario;

    const result = await pool.query(
      `
      SELECT
          pa.id,
          pa.id_portafolio,
          p.nombre_portafolio,
          pa.simbolo,
          pa.cantidad,
          pa.precio_promedio_compra,
          pa.inversion_total
      FROM portafolio_acciones pa
      INNER JOIN portafolios p
          ON pa.id_portafolio = p.id_portafolio
      WHERE p.id_usuario = $1
      ORDER BY p.nombre_portafolio
      `,
      [id_usuario]
    );

    res.json({
      stocks: result.rows
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: error.message
    });

  }

};

module.exports = {
  sellStock,
  getUserStocks
};
