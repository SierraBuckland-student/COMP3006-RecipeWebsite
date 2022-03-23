//import models
const mongoose = require('mongoose');

//Creating a definition object with the appropriate fields for a recipe entity

const createSchema = {

    userID: {
        type: String,
        required: true
    },

    author: {
        type: String,
        required: true
    },

    title: {
        type: String, 
        required: true
    }, 

    totalTime: {
        type: String,
        required: true
    }, 

    img: { 
        type: String
    },

    cookTime: {
        type: String,
        required: true
    },

    servings: {
        type: String,
        required: true
    },

    ingredients: {
        type: String, 
        required: true
    }, 

    steps: {
        type: String, 
        required: true
    }, 

    rating: {
        type: Number,
        required: false
    },

    mealProtein: { 
        type: String
    },

    mealTime: { 
        type: String, 
        required: true
    }

}

//create a schema with the definition object

let schObj = new mongoose.Schema(createSchema);
schObj.index({'$**': 'text'}); 
module.exports = mongoose.model('Recipe', schObj);