const customExpress = require('../config/customExpress')
const connect = require('../model/connect')
const table = require('../model/table')


connect.connect((erro) => {
    if (erro) {
        console.log(erro);
    }
    else {
        console.log("Conectado ao Banco de 🎲!")

        table.init(connect);
        const app = customExpress();

        app.listen(3000, () => {
            console.log("Servidor Rodando Porta 3k 👾");
        })
    }
})
