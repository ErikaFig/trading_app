const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 8205;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});