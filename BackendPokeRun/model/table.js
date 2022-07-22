class table {
    init(connect){
        this.connect = connect
        this.createTablePokerun()
    }

    createTablePokerun(){

        const sql = `create table if not exists score (
            id int not null AUTO_INCREMENT PRIMARY KEY,
            Name varchar(200),
            score int
        )`

        this.connect.query(sql, (erro) =>{
            if(erro){
                console.log(erro)
            }
            else{
                console.log("Tabela record criada👌")
            }
        });
    }
}


module.exports = new table