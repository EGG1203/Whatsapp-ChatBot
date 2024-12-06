const mysql = require("mysql2/promise")

const createConnection = async () => {
    return await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'metatron'
    })
}

const getUser = async (user) => {
    const connection = await createConnection();
    const [rows] = await connection.execute('SELECT user FROM gg WHERE user = ?', [user]);
    if(rows.lenght > 0) return rows[0].user;
    return false;
}

const setUser = async (user) => {
    const connection = await createConnection();
    const [rows] = await connection.execute('INSERT INTO gg SET user = ?', [user]);
    if(rows.lenght > 0) return rows[0].user;
    return false;
}

const setWpp = async (user) => {
    const connection = await createConnection();
    const [rows] = await connection.execute('INSERT INTO gg SET NomeWpp = ?', [user]);
    if(rows.lenght > 0) return rows[0].NomeWpp;
    return false;
}

const select = async (user) => {
    const connection = await createConnection();
    const [rows] = await connection.execute('SELECT colunas FROM tabela WHERE coluna = ?', [user]);
    if(rows.lenght > 0) return rows[0].NomeWpp;
    return false;
}

module.exports = {
    createConnection,
    getUser,
    setUser,
    setWpp
}