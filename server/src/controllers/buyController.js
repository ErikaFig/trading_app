const pool = require("../db/db");

const buyStock = async (req, res) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const { id_portafolio, simbolo, cantidad, precio_compra } = req.body;
    const id_usuario = req.user.id_usuario;

    const costoTotal = cantidad * precio_compra;

    // 1. Obtener portafolio
    const portfolioResult = await client.query(
      `
      SELECT * FROM portafolios
      WHERE id_portafolio=$1
      AND id_usuario=$2
      `,
      [id_portafolio, id_usuario]
    );

    if (portfolioResult.rows.length === 0) {
      throw new Error("Portafolio no encontrado");
    }

    const portfolio = portfolioResult.rows[0];

    if (Number(portfolio.balance) < costoTotal) {
      throw new Error("Balance insuficiente");
    }

    // 2. Guardar compra
    await client.query(
      `
      INSERT INTO compras
      (id_usuario,id_portafolio,cantidad,precio_compra,simbolo)
      VALUES ($1,$2,$3,$4,$5)
      `,
      [
        id_usuario,
        id_portafolio,
        cantidad,
        precio_compra,
        simbolo
      ]
    );

    // 3. Revisar si ya tiene esa acción
    const stockResult = await client.query(
      `
      SELECT * FROM portafolio_acciones
      WHERE id_portafolio=$1 AND simbolo=$2
      `,
      [id_portafolio, simbolo]
    );

    if (stockResult.rows.length === 0) {
      await client.query(
        `
        INSERT INTO portafolio_acciones
        (
          id_portafolio,
          cantidad,
          precio_promedio_compra,
          inversion_total,
          simbolo
        )
        VALUES ($1,$2,$3,$4,$5)
        `,
        [
          id_portafolio,
          cantidad,
          precio_compra,
          costoTotal,
          simbolo
        ]
      );
    } else {
      const stock = stockResult.rows[0];

      const nuevaCantidad = stock.cantidad + cantidad;
      const nuevaInversion =
        Number(stock.inversion_total) + costoTotal;

      const nuevoPromedio =
        nuevaInversion / nuevaCantidad;

      await client.query(
        `
        UPDATE portafolio_acciones
        SET
          cantidad=$1,
          precio_promedio_compra=$2,
          inversion_total=$3
        WHERE id=$4
        `,
        [
          nuevaCantidad,
          nuevoPromedio,
          nuevaInversion,
          stock.id
        ]
      );
    }

    // 4. Actualizar balance
    await client.query(
      `
      UPDATE portafolios
      SET balance = balance - $1
      WHERE id_portafolio=$2
      `,
      [costoTotal, id_portafolio]
    );

    await client.query("COMMIT");

    res.status(201).json({
      message: "Compra realizada correctamente"
    });

  } catch (error) {
    await client.query("ROLLBACK");

    res.status(400).json({
      message: error.message
    });
  } finally {
    client.release();
  }
};

module.exports = { buyStock };