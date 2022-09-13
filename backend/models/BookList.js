const mongoose = require('mongoose')

const BookList = new mongoose.Schema({
    title: {type:String, required:true},
    author: {type:String, required:true},
    category: {type:String, required:true},
    description: {type:String, required:true},
    imageUrl : {type:String}
})


const BookModel = mongoose.model("BookList", BookList);
module.exports = BookModel;