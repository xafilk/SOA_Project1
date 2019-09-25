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
    console.log(req.body);
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
    let success;
    try
    {
        let date2 = new Date();
        let date = new Date(req.body["Date"]);
        date.setMinutes( date.getMinutes() - date2.getTimezoneOffset() );
        let content = req.body["Content"];
        content = JSON.stringify(content);
        let userEmail = req.body["UserEmail"];
        let boxId = req.body["BoxId"];
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

server.post("/Orders/GetOrdersbyStatus", async (req, res) => {
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

server.post("/Orders/GetOrdersbyUser", async (req, res) => {
    console.log(req.body);
    let success;
    try
    {
        let userId = req.body["UserId"];
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('userId', sql.VARCHAR(50), userId )
            .execute('Select_Orders_by_User_SP')
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
    let success;
    try
    {
        let orderId = req.body["OrderId"];
        let statusId = req.body["StatusId"];
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('orderId', sql.Int, orderId )
            .input('statusId', sql.Int, statusId)
            .execute('Update_OrderStatus_SP')
        sql.close();
        success = {"Succes": true, "Result": result.returnValue};
    }
    catch(err)
    {
        sql.close();
        console.log(err);
        success = {"Succes": true, "Result": err};
    }    
    res.send(success);
});

server.get("/Orders/AllStatus", async (res) => {
    console.log("Solicitado");
    try
    {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .execute('Select_All_Order_Status_SP')
        sql.close();
        success = {"Succes": true, "Result": result.recordset};
    }
    catch(err)
    {
        sql.close();
        console.log(err);
        success = {"Succes": false, "Result": err};
    }
    res.send(success);
});



server.post("/Box/OpenBox", async(req, res) => {
    console.log(req.body);
});

server.post("/Box/IsOpen", async(req, res) => {
    console.log(req.body);
    let success;
    try
    {
        let boxId = req.body["BoxId"];
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('boxId', sql.VARCHAR(50), boxId)
            .execute('Select_IsOpenBox_by_Id')
        sql.close();
        success = {"Success" : true, "Result": result.returnValue};
    }
    catch(err)
    {
        sql.close();
        console.log(err);
        success = {"Success" : false, "Result": "Error"};
    }
    res.send(success);
});


 
 server.listen(port, ()=> console.log(`Listening on port ${port}`))