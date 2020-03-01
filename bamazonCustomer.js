// Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.

// 6. The app should then prompt users with two messages.

//    * The first should ask them the ID of the product they would like to buy.
//    * The second message should ask how many units of the product they would like to buy.

// 7. Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

//    * If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.

// 8. However, if your store _does_ have enough of the product, you should fulfill the customer's order.
//    * This means updating the SQL database to reflect the remaining quantity.
//    * Once the update goes through, show the customer the total cost of their purchase.

const mysql = require("mysql");
const inquirer = require("inquirer");
const dotenv = require("dotenv").config();

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: process.env.mysqlUsername,
  password: process.env.mysqlPassword,
  database: "bamazon"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
});

let items = [];

function showItems() {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;

    // Log all results of the SELECT statement
    
    items = res;
    items.forEach(element => {
      displayProduct(element);
      console.log("------------------------------");
    });
    promptUser();
  });
};

function displayProduct(product){
  console.log(`ID: ${product.item_id}`);
  console.log(`Item Name: ${product.product_name}`);
  console.log(`Department: ${product.department_name}`);
  console.log(`Price: $${product.price}`);
  console.log(`Quantity: ${product.stock_quantity}`);
}

function promptUser() {
  inquirer.prompt([
    {
      type: "number",
      name: "itemID",
      message: "Which Product would you like to buy?"
    },
    {
      type: "number",
      name: "quantity",
      message: "How many would you like to buy?"
    }

    // After the prompt, store the user's response in a variable called location.
  ]).then(function (answers) {
      checkOrder(answers.itemID, answers.quantity);
  });
};

function checkOrder(itemID, quantity){
  connection.query("SELECT * FROM products where item_id = " + itemID, function (err, res) {
    if (err) throw err;

    // Log all results of the SELECT statement
      //console.log(res);
    connection.end();
    if(res[0].stock_quantity > quantity)
    { 
      let total = quantity * res[0].price;
      console.log(`Congrats! Your order of ${res[0].product_name} has been placed.`);
      console.log(`Your total is $${total}`)
    } else {
      console.log(`Sorry, Insufficent amount of ${res[0].product_name} left for your order.`)
    }
  });
};

showItems();
