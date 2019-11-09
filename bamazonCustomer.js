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
    console.log(
"#     #                                                              ######     #    #     #    #    ####### ####### #     #     ###\n"+
"#  #  # ###### #       ####   ####  #    # ######    #####  ####     #     #   # #   ##   ##   # #        #  #     # ##    #     ###\n"+ 
"#  #  # #      #      #    # #    # ##  ## #           #   #    #    #     #  #   #  # # # #  #   #      #   #     # # #   #     ###\n"+
"#  #  # #####  #      #      #    # # ## # #####       #   #    #    ######  #     # #  #  # #     #    #    #     # #  #  #      #\n"+ 
"#  #  # #      #      #      #    # #    # #           #   #    #    #     # ####### #     # #######   #     #     # #   # #     \n"+
"#  #  # #      #      #    # #    # #    # #           #   #    #    #     # #     # #     # #     #  #      #     # #    ##     ###\n"+
" ## ##  ###### ######  ####   ####  #    # ######      #    ####     ######  #     # #     # #     # ####### ####### #     #     ###\n"
    )
    console.log("\t\tYou are now connected to Bamazon.\n\t\tWhile our website is being reconstructed, you can shop here.\n\t\tTake your time to browse the table.\n\t\tIf you wish to purchase something, select the id number and follow the prompts to checkout.\n\t\t We are having a big summer sales event so stock up for next year!\n\n")
    enterBamazon();
});

function enterBamazon () {
    connection.query ("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        for (var i=0; i< res.length; i ++){
            console.log( res[i].product_name)
        }
        connection.end();
    });
};
