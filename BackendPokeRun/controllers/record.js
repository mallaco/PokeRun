const Record = require('../model/record')
var cors = require('cors')

module.exports = app => {
    app.get('/record', cors(), (req, res) => {

        Record.Buscar(res)
    })

    app.post('/record', cors(), (req, res) => {

        const records = req.body
        console.log(req.body)
        Record.Adicionar(records)

        res.send("Você fez um post aeeeeee")
    })
}
