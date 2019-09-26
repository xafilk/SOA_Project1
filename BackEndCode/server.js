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

const pool1 = new sql.ConnectionPool(config);
const pool1Connect = pool1.connect();

/**    
// Decrypt
var bytes  = CryptoJS.AES.decrypt(pass.toString(), 'zWqhtuy567lKhtgf3');
var plaintext = bytes.toString(CryptoJS.enc.Utf8);
console.log(plaintext);
**/

server.post("/Users/AddNewUser", async (req, res) => {
    console.log(req.body);
    let success;
    try
    {
        let name = req.body["Name"];
        let lastName1 = req.body["LastName1"];
        let lastName2 = req.body["LastName2"];
        let email = req.body["Email"];
        //Encrypt
        let pass =  CryptoJS.AES.encrypt(req.body["Password"], 'zWqhtuy567lKhtgf3');

        let result = await pool1.request()
            .input('name', sql.VarChar(50), name)
            .input('lastName1', sql.VarChar(50), lastName1)
            .input('lastName2', sql.VarChar(50), lastName2)
            .input('email', sql.VarChar(100), email)
            .input('password', sql.VarChar(256), pass)
            .output('Status', sql.VarChar(50))
            .execute('Add_NewUser_SP')
        sql.close();
        success = {"Succes": true, "Result": result["output"]["Status"]};
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
    let success;
    try
    {
        let email = req.body["Email"];
        let pass = req.body["Password"];
        let result = await pool1.request()
            .input('email', sql.VarChar(100), email)
            .output('Password', sql.VarChar(256))
            .execute('Login_SP');

        var bytes  = CryptoJS.AES.decrypt(result["output"]["Password"].toString(), 'zWqhtuy567lKhtgf3');
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
        let result2 = await pool1.request()
            .input('date', sql.DateTime, date)
            .input('content', sql.VarChar, content)
            .input('userEmail', sql.VarChar(50), userEmail)
            .input('boxId', sql.VarChar(50), boxId)
            .output('Success', sql.VarChar(256))
            .execute('Add_Order_SP');
        success = {"Succes": true, "Result": result2["output"]["Success"]};
    }
    catch(err)
    {
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
        let result = await pool1.request()
            .input('statusId', sql.Int, status)
            .execute('Select_Orders_by_Status_SP');
        success = {"Succes": true, "Result": result.recordset};
    }
    catch(err)
    {
        success = {"Succes": false, "Result": err};
        console.log(err);
    }
    res.send(success);
});

server.post("/Orders/GetOrdersbyUser", async (req, res) => {
    //console.log(req.body);
    let success;
    try
    {
        let userId = req.body["UserId"];

        let result = await pool1.request()
            .input('userId', sql.VARCHAR(50), userId )
            .execute('Select_Orders_by_User_SP');

        success = {"Succes": true, "Result": result.recordset};
    }
    catch(err)
    {
        success = {"Succes": false, "Result": err};
        console.log(err);
    }
    res.send(success);
});

server.get("/Orders/GetAllOrders", async (req, res) => {
    //console.log(req.body);
    let success;
    try
    {
        let result = await pool1.request()
            .execute('Select_Orders_All_SP');
        success = {"Succes": true, "Result": result.recordset};
    }
    catch(err)
    {
        success = {"Succes": false, "Result": err};
        console.log(err);
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
        let result = await pool1.request()
            .input('orderId', sql.Int, orderId )
            .input('statusId', sql.Int, statusId)
            .execute('Update_OrderStatus_SP')
        success = {"Succes": true, "Result": result.returnValue};
    }
    catch(err)
    {
        console.log(err);
        success = {"Succes": false, "Result": err};
    }    
    res.send(success);
});

server.get("/Orders/AllStatus", async (res) => {
    console.log("Solicitado");
    try
    {
        let result = await pool1.request()
            .execute('Select_All_Order_Status_SP')
        success = {"Succes": true, "Result": result.recordset};
    }
    catch(err)
    {
        console.log(err);
        success = {"Succes": false, "Result": err};
    }
    res.send(success);
});

server.post("/Box/OpenBox", async(req, res) => {
    console.log(req.body);
    let success;
    try
    {
        let boxId = req.body["BoxId"];
        let result = await pool1.request()
            .input('boxId', sql.VarChar(50), boxId)
            .input('status', sql.Bit, 1)
            .execute('Update_Box_Open_SP');
        success = (result.returnValue == 1) ?  {"Succes": true} :  {"Succes": false};
    }
    catch(err)
    {
        console.log(err);
        success = {"Succes": false};
    }
    res.send(success);
});

server.post("/Box/CloseBox", async(req, res) => {
    console.log(req.body);
    let success;
    try
    {
        let boxId = req.body["BoxId"];

        let result = await pool1.request()
            .input('boxId', sql.VarChar(50), boxId)
            .input('status', sql.Bit, 0)
            .execute('Update_Box_Open_SP')
        success = (result.returnValue == 1) ?  {"Succes": true} :  {"Succes": false};
    }
    catch(err)
    {
        console.log(err);
        success = {"Succes": false};
    }
    res.send(success);
});

server.post("/Box/IsOpen", async(req, res) => {
    console.log(req.body);
    let success;
    try
    {
        let boxId = req.body["BoxId"];
        let result = await pool1.request()
            .input('boxId', sql.VARCHAR(50), boxId)
            .execute('Select_IsOpenBox_by_Id')
        success = {"Success" : true, "Result": result.returnValue};
    }
    catch(err)
    {
        console.log(err);
        success = {"Success" : false, "Result": "Error"};
    }
    res.send(success);
});


 
 server.listen(port, ()=> console.log(`Listening on port ${port}`))