//import inquirer and mysql
// const inquirer = require("inquirer");
const mysql = require("mysql");

let connection = mysql.createConnection({
    host:"localhost",
    port: 3306,
    user: "root",
    password: "docker",
    database: "bamazon"
})

connection.connect(err => {
    if(err) throw err;
    console.log("connected as id " + connection.threadID + "\n")
    enterBamazon();
});

function enterBamazon () {
    connection.query ("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        for (var i=0; i< res.length; i ++){
            console.log(" Item: "+ res[i].product_name)
        }
        connection.end();
    });
};
