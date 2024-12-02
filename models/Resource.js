const mongoose = require('mongoose');

// Define the Resource Schema
const resourceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'], // More specific error message
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Description is required'], // More specific error message
    },
    link: {
        type: String,
        required: [true, 'Link is required'], // More specific error message
        trim: true,
        validate: {
            validator: function (v) {
                // Validate if the URL starts with http or https
                return /^(https?:\/\/[^\s$.?#].[^\s]*)$/i.test(v);
            },
            message: props => `${props.value} is not a valid URL!`,
        },
    },
    category: {
        type: String,
        required: [true, 'Category is required'], // More specific error message
        enum: {
            values: ['Icons', 'Illustrations', 'Libraries', 'Frameworks', 'APIs', 'Other'], // Predefined categories
            message: '{VALUE} is not a valid category', // Custom error message for invalid category
        },
        default: 'Other',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Create an index on 'name' and 'category' for faster querying
resourceSchema.index({ name: 1, category: 1 });

// Create and export the model
module.exports = mongoose.model('Resource', resourceSchema);
