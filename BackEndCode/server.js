const express = require('express');
const bodyParser = require('body-parser');
const server = express();
const port = 3000;
const sql = require('mssql');
var CryptoJS = require("crypto-js");

server.use(bodyParser.json());

let config = {
    user: 'svcrestaurantapp',
    password: '12345',
    server: 'localhost', 
    database: 'SOA_Restaurant' 
};

/**    
// Decrypt
var bytes  = CryptoJS.AES.decrypt(pass.toString(), 'zWqhtuy567lKhtgf3');
var plaintext = bytes.toString(CryptoJS.enc.Utf8);
console.log(plaintext);
**/

server.post("/Users/AddNewUser", async (req, res) => {
    //Data Base config
    let name = req.body["Name"];
    let lastName1 = req.body["LastName1"];
    let lastName2 = req.body["LastName2"];
    let email = req.body["Email"];
    //Encrypt
    let pass =  CryptoJS.AES.encrypt(req.body["Password"], 'zWqhtuy567lKhtgf3');
    
    let success;
    try
    {
        let pool = await sql.connect(config);
        let result2 = await pool.request()
            .input('name', sql.VarChar(50), name)
            .input('lastName1', sql.VarChar(50), lastName1)
            .input('lastName2', sql.VarChar(50), lastName2)
            .input('email', sql.VarChar(100), email)
            .input('password', sql.VarChar(256), pass)
            .output('Status', sql.VarChar(50))
            .execute('Add_NewUser_SP')
        sql.close();
        success = {"Succes": true, "Result": result2["output"]["Status"]};
    }
    catch(err)
    {
        sql.close();
        success = {"Succes": false, "Result": err};
        console.log(err);
    }
    res.send(success);
    console.log(req.body)
 });

 server.post("/Users/Login", async (req, res) => {
    console.log(req.body);
    let email = req.body["Email"];
    let pass = req.body["Password"]

    let success;
    try
    {
        let pool = await sql.connect(config);
        let result2 = await pool.request()
            .input('email', sql.VarChar(100), email)
            .output('Password', sql.VarChar(256))
            .execute('Login_SP')
        sql.close();

        var bytes  = CryptoJS.AES.decrypt(result2["output"]["Password"].toString(), 'zWqhtuy567lKhtgf3');
        var plaintext = bytes.toString(CryptoJS.enc.Utf8);
        if(plaintext === pass)
        {
            success = {"Succes": true};
        }
        else
        {
            success = {"Succes": false};
        }     
    }
    catch(err)
    {
        sql.close();
        success = {"Succes": "False"};
        console.log(err);
    }
    res.send(success);
 });

server.post("/Orders/AddNewOrder", async (req, res) => {
    console.log(req.body);
    let date2 = new Date();
    let date = new Date(req.body["Date"]);
    date.setMinutes( date.getMinutes() - date2.getTimezoneOffset() );
    console.log(date);
    let content = req.body["Content"];
    let userEmail = req.body["UserEmail"];
    let boxId = req.body["BoxId"];

    let success;
    try
    {
        let pool = await sql.connect(config);
        let result2 = await pool.request()
            .input('date', sql.DateTime, date)
            .input('content', sql.VarChar, content)
            .input('userEmail', sql.VarChar(50), userEmail)
            .input('boxId', sql.VarChar(50), boxId)
            .output('Success', sql.VarChar(256))
            .execute('Add_Order_SP')
        sql.close();
        success = {"Succes": true, "Result": result2["output"]["Success"]};
    }
    catch(err)
    {
        sql.close();
        success = {"Succes": false, "Result":err};
        console.log(err);
    }
    res.send(success);
});

server.post("/Orders/GetOrders", async (req, res) => {
    console.log(req.body);
    let success;
    try
    {
        let status = req.body["StatusId"];
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('statusId', sql.Int, status)
            .execute('Select_Orders_by_Status_SP')
        sql.close();
        success = {"Succes": true, "Result": result.recordset};
    }
    catch(err)
    {
        sql.close();
        success = {"Succes": false, "Result": err};
    }
    res.send(success);
});

server.post("/Orders/UpdateStatus", async (req, res) => {
    console.log(req.body);
    let orderId = req.body["OrderId"];
    let statusId = req.body["StatusId"];
});

server.get("/Orders/AllStatus", async (req, res) => {
    try
    {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .execute('Select_All_Order_Status_SP')
        sql.close();
        success = {"Succes": true, "Result": result.recordset};
        res.send(success);
    }
    catch(err)
    {
        sql.close();
        console.log(err);
        success = {"Succes": false, "Result": err};
    }
});

server.post("/Box/OpenBox", async(req, res) => {
    console.log(req.body);


});


 
 server.listen(port, ()=> console.log(`Listening on port ${port}`))