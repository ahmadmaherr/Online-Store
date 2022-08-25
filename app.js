//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
var numberOfProducts = 7;

mongoose.connect("mongodb://localhost:27017/shopDB");

const productsSchema = {
  name: String, price: Number, salePrice: Number
};

const Product = mongoose.model("Product", productsSchema);

var product1 = new Product({
  name: "Stylish shirt", price: 900, salePrice: 600
});

Product.insertMany(product1, function(error, docs) {
  if(error){
    console.log("error with the database!");
  }
  else{
    console.log("successfully added to the database");
  }

});

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

app.get("/", function(req, res){
  Product.find({}, function(err, foundItems){
    console.log(foundItems);
      res.render('index', {
        Products: foundItems,
        numberOfProducts: numberOfProducts
  });

})
});

app.get("/cart", function(req, res){
  res.render("cart");
})

app.get("/contact", function(req, res){
  res.render("contact");
})

app.get("/checkout", function(req, res){
  res.render("checkout");
})

app.get("/detail", function(req, res){
  res.render("detail");
})

app.get("/shop", function(req, res){
  res.render("shop");
})



app.listen(3000, function(){
  console.log("app is running on local host 3000");
})
