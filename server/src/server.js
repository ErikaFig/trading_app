require('dotenv').config();

const app = require('./app');

const PORT = process.env.PORT || 8205;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});