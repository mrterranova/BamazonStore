//import inquirer and mysql
const inquirer = require("inquirer");
const mysql = require("mysql");

//set up the connection to mysql
let connection = mysql.createConnection({
    host:"localhost",
    port: 3306,
    user: "root",
    password: "docker",
    database: "bamazon"
})

//global variables to be used across functions
var numProducts;
var number;

//make the connection and begin the program
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

    //directions of use
    console.log("\t\tYou are now connected to Bamazon.\n\t\tWhile our website is being reconstructed, you can shop here.\n\t\tTake your time to browse the table.\n\t\tIf you wish to purchase something, select the id number and follow the prompts to checkout.\n\t\t We are having a big summer sales event so stock up for next year!\n\n")
    
    //enter into Bamazon Store
    enterBamazon();
});

//the opening of the Bamazon catalogue
function enterBamazon () {
    //view all catalogue items
    connection.query ("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        numProducts = res.length;
        console.log( "\t\tBAMAZON CATALOGUE\n---------------------------------------------------------------\n"+
        "ID\tProduct\t\t\t     Price\t  Amount Left\n---------------------------------------------------------------");
        for (var i=0; i< res.length; i ++){
            //make the table look pretty by adding spaces for varying lengths of words
            padLength = res[i].product_name.length;
            spaces = 30 - padLength;
            for (var j=0; j<spaces; j++) {
                res[i].product_name += " ";
            }
            //print the table in terminal
            console.log(res[i].item_id+"\t"+res[i].product_name+res[i].price+"\t\t"+res[i].stock_quantity);
        }
        console.log("\n---------------------------------------------------------------")
        //see if user would like to shop
        inquireItem();
    });
};

//ask user if they would like to purchase or exit bamazon
function inquireItem() {
    inquirer.
        prompt([
            {
              name: "toDo",
              type: "list",
              message: "What would you like to do?\n",
              choices: [
                  "Purchase a Product",
                  "Leave Bamazon"
              ] 
            }
        ]). then (answer => {
            if (answer.toDo === "Purchase a Product") {
                //send them to shopping window
                purchaseProduct();
            } else {
                exit();
            }
        })
}

//function to make a purchase of an item in catalogue
function purchaseProduct() {
    console.log("\tYou have now entered the shopping window.")
    inquirer
        .prompt ([
            {
                name: "item",
                message: "Provide the ID of the item you wish to purchase: \n"
            }
        ]).then (answer => {
            // make sure answer is number and not string
            number = parseInt(answer.item)
            // make sure that the number is viable
            if (number < numProducts+1){
                connection.query ("SELECT * FROM products", function(err, res) {
                    if (err) throw err;
                    console.log("\nShopping Cart: "+res[number-1].product_name+" at $"+res[number-1].price+".00\n");
                    //confirmation that the order is correct
                    inquirer
                        .prompt([
                            {
                                name: "correct",
                                type: "list",
                                message: "Is this correct?\n",
                                choices: [
                                    "Yes. Continue Purchase.",
                                    "No. A different selection."
                                ]  
                            }
                        ]). then (answer =>{
                            //if the order is correct move on to how many the user wishes to purchase
                            if (answer.correct === "Yes. Continue Purchase.") {
                                numberOfItems(number);
                            //if the order is incorrect, send the user back to the main menu
                            } else {
                                enterBamazon();
                            }
                        })
                })
            //if the user does not provide a viable ID then send them a message
            } else{
                console.log("Sorry we didn't recognize that product ID, please try again.\n\n")
                purchaseProduct();
            }
        });
}

//once order is confirmed goes to this function to complete transaction
function numberOfItems(number) {
    connection.query ("SELECT * FROM products;", function(err, res) {
        if (err) throw err;
        //show the amount in stock to the user so they can determine how many they want to buy
        console.log("\nThere are "+ res[number-1].stock_quantity+" left.");
    inquirer
        .prompt([
            {
                name: "amount",
                message: "How many would you like to purchase?\nPlease note: entering '0' will take you back to the main menu.\n"
            }
        ]).then(answer =>{
                num = parseInt(answer.amount);
                //determine if there are enough of item in stock user requested
                if (num <= res[number].stock_quantity){
                    difference = res[number-1].stock_quantity - num;
                    connection.query("UPDATE products SET stock_quantity = "+ difference +" WHERE item_id = "+res[number-1].item_id+";")
                    console.log("\nWe will have this shipped to you within the next 24 hours.")
                    inquirer
                        .prompt([
                            {
                                name: "next",
                                type: "list",
                                message: "What would you like to do next?\n",
                                choices: [
                                    "Continue shopping",
                                    "View Catalogue of Items",
                                    "Exit Bamazon."
                                ] 
                            }
                        ]).then(answer =>{
                            if (answer.next === "Continue shopping"){
                                inquireItem();
                            } else if (answer.next === "View Catalogue of Items") {
                                enterBamazon();
                            } else {
                                exit();
                            }
                        })
                //if stock is more than what have send user a message
                } else if (num > res[number-1].stock_quantity) {
                    console.log("\nWe apologize for the inconvenience. We do not have "+ num + " "+ res[number-1].product_name +"s at this time.\n")
                    purchaseProduct();
                //if user enters "0" send them back to the main screen
                } else if (num === 0 ) {
                    enterBamazon();
                //anything else requestion user for an amount.
                } else {
                    console.log("\nOur systems don't recognize the selection made. Please try again.");
                    numberOfItems();
                }
            })
        });
    }

//an exit function
function exit () {
    console.log("\nSorry to see you go. Come shop with us again at Bamazon!")
    process.exit();
}