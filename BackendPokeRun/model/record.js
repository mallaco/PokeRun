const connect = require('./connect')

class Record {

    Adicionar(record){

        const sql = 'insert into score SET ?'

        connect.query(sql, record, (erro, result) => {
            if(erro){
                console.log(erro)
            }
            else{
                console.log(result)
                
            }
        })
    }

    Buscar(res){
        const sql = 'select Name, score from score order by score DESC LIMIT 10;';
        

        connect.query(sql, (erro, result) => {
            if(erro){
                console.log(erro)
            }
            else{
                console.log(result)
                res.json(result);
            }
        })
    }
}

module.exports = new Record