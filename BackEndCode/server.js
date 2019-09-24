const express = require('express');
const bodyParser = require('body-parser');
const server = express();
const port = 3000;
const sql = require('mssql');

server.use(bodyParser.json());

server.post("/Users/AddNewUser", async (req, res) => {
    // config for your database
    let name = req.body["Name"];
    let lastName1 = req.body["LastName1"];
    let lastName2 = req.body["LastName2"];
    let birthDate = req.body["BirthDate"];
    let lastName1 = req.body["LastName1"];
    var config = {
        user: 'svcrestaurantapp',
        password: '12345',
        server: 'localhost', 
        database: 'SOA_Restaurant' 
    };
    try
    {
        let pool = await sql.connect(config);
        let result1 = await pool.request().query('select * from Order_Status');
        console.dir(result1["recordset"]);
        res.send(result1["recordset"]);
        let result2 = await pool.request().query()
            .input('name', sql.VarChar(50), name)
            .output('output_parameter', sql.VarChar(50))
            .execute('procedure_name')
    }
    catch(err)
    {
        console.log(err);
    }
    console.log(req.body)
 });



 
 server.listen(port, ()=> console.log(`Listening on port ${port}`))