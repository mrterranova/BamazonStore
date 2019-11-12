// import packages needed for use
const inquirer = require("inquirer");
const mysql = require("mysql");

//set up the connection to mysql
let connection = mysql.createConnection({
    host:"localhost",
    port: 3306,
    user: "root",
    password: "docker",
    database: "bamazon"
});

//make the connection and begin the program
connection.connect(err => {
    if(err) throw err;
    console.log("Welcome Bamazon Manager")
    managerMenu()
});
function managerMenu() {
inquirer
    .prompt([
        {
            name: "managerList",
            type: "list",
            message: "Pick from the following menu:\n",
            choices: [
                "View Products for Sale",
                "View Low Inventory",
                "Add to Inventory",
                "Add New Product",
                "Exit Program"
            ]  
        }
    ]).then (answers => {
        switch(answers.managerList){
            case "View Products for Sale": 
                viewProducts();
                break;
            case "View Low Inventory":
                lowInventory();
                break;
            case "Add to Inventory":
                addInventory();
                break;
            case "Add New Product":
                newProduct();
                break;
            case "Exit Program":
                exit();
                break;
        }
    });
}
function viewProducts() {
    //view all catalogue items
    connection.query ("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        numProducts = res.length;
        console.log( "\t\t\t\tBAMAZON CATALOGUE\n-------------------------------------------------------------------------------------------------------\n"+
        "ID\tDepartment\t\tProduct\t\t\t     Price\t  Amount Left\t     Profit\n-------------------------------------------------------------------------------------------------------");
        for (var i=0; i< res.length; i ++){
            //make the table look pretty by adding spaces for varying lengths of words
            padLength = res[i].product_name.length;
            departLength = res[i].department_name.length;
            spaces = 30 - padLength;
            moreSpaces = 15 - departLength;
            for (var j = 0; j < spaces; j++) {
                res[i].product_name += " ";
            }
            for (var k=0; k < moreSpaces; k++){
                res[i].department_name += " ";
            }
            res[i].price += " ";
            //print the table in terminal
            console.log(res[i].item_id+"\t"+res[i].department_name+"\t\t"+res[i].product_name+res[i].price+"\t\t"+res[i].stock_quantity+"\t\t"+res[i].product_sales);
        }
        console.log("\n-------------------------------------------------------------------------------------------------------")
        //go back to main menu
        managerMenu();
    });

}

function lowInventory() {
    connection.query ("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.log("\n_________________________________________________\nPlease restore the following items:\n_________________________________________________");
        for (var i=0; i < res.length; i++) {
            if (res[i].stock_quantity < 10 && res[i].stock_quantity > 4) {
                console.log(res[i].product_name +": "+res[i].stock_quantity + " remaining.");
            } else if (res[i].stock_quantity < 5) {
                console.log("CRITICAL: "+ res[i].product_name +": "+res[i].stock_quantity + " remaining.")
            }
        }
        console.log("\n_________________________________________________\n")
        managerMenu();
    });
}
function addInventory() {
    inquirer
        .prompt([
            {
               name: "inventory", 
                message: "Provide the ID of product:\n"

            }, {
                name: "stock",
                message: "Please provide additional stock amount:\n"
            }
        ]).then (answers => {
            connection.query ("SELECT * FROM products;", function(err, res) {
                if (err) throw err;
            if (answers.inventory <= res.length && answers.inventory > 0 && answers.inventory % 1 ===0  && answers.stock % 1 ===0 && answers.stock > 0){
            addStock = res[answers.inventory-1].stock_quantity + parseInt(answers.stock)

            connection.query("UPDATE products SET stock_quantity = "+ addStock +" WHERE item_id = "+res[answers.inventory-1].item_id+";")
            console.log(res[answers.inventory-1].product_name+": "+answers.stock+" added.\nTotal stock: " +addStock+ ".");
            word = "addInventory"
            repeatCurrentCommand(word)
            } else {
                console.log("Error. Please retype the product ID and stock amount.");
                addInventory();
            }
        });
    });
}   

function newProduct() {
    inquirer
        .prompt([
            {
                name: "name",
                message: "Product name:\n"
            }, {
                name: "department",
                message: "Name of Department:\n"
            }, {
                name: "price",
                message: "Price of Product:\n"
            }, {
                name: "stock",
                message: "Starting Stock Amount:\n"
            }
        ]). then (answers => {
            console.log(answers.name, answers.department, answers.price, answers.stock)
            if (parseFloat(answers.price) && answers.stock % 1 === 0 && answers.price > 0 && answers.stock > 0){
            connection.query ("INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales) VALUES ('"+answers.name+"', '"+answers.department+"', "+parseInt(answers.price)+", "+parseFloat(answers.stock)+", 0);");
            console.log("New product "+ answers.name + " has been added.");
            word = "newProduct"
            repeatCurrentCommand(word);
            } else {
                console.log("Error. Please check values for price and stock amounts.");
                newProduct();
            }
        });
}

function repeatCurrentCommand (current) {
    inquirer
        .prompt([
            {
                name: "repeat",
                type: "list",
                message: "\n",
                choices: [
                    "Continue on Current Command",
                    "Return to Main Menu", 
                    "View Table",
                    "Exit Program"
                ]
            }
        ]). then (answers => {
            switch(answers.repeat) {
                case "Continue on Current Command": 
                    if (current === "addInventory") {
                        addInventory();
                    } else if (current === "newProduct") {
                        newProduct();
                    }
                    break;  
                case "Return to Main Menu":
                    managerMenu();
                    break;
                case "View Table":
                    viewProducts();
                    break;
                case "Exit Program": 
                    exit();
                    break;
            }
        })
}

//an exit function
function exit () {
    console.log("\nThank you for updating regulary!")
    process.exit();
}