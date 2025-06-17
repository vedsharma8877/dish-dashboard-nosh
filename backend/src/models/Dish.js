const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
    dishId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        index: true
    },
    dishName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    imageUrl: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: function (v) {
                return /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i.test(v);
            },
            message: 'Please provide a valid image URL'
        }
    },
    isPublished: {
        type: Boolean,
        required: true,
        default: true
    }
}, {
    timestamps: true, // adds createdAt and updatedAt fields
    toJSON: {
        transform: function (doc, ret) {
            delete ret.__v;
            return ret;
        }
    }
});

// Indexes for better query performance
dishSchema.index({ isPublished: 1 });
dishSchema.index({ dishName: 'text' }); // Text index for search functionality

// Instance methods
dishSchema.methods.togglePublishedStatus = function () {
    this.isPublished = !this.isPublished;
    return this.save();
};

// Static methods
dishSchema.statics.findPublished = function () {
    return this.find({ isPublished: true });
};

dishSchema.statics.findUnpublished = function () {
    return this.find({ isPublished: false });
};

// Pre-save middleware
dishSchema.pre('save', function (next) {
    if (this.isModified('dishName')) {
        this.dishName = this.dishName.trim();
    }
    next();
});

// Post-save middleware for real-time updates
dishSchema.post('save', function (doc) {
    // This will be used for socket.io real-time updates
    if (global.io) {
        global.io.emit('dishUpdated', {
            action: 'updated',
            dish: doc
        });
    }
});

const Dish = mongoose.model('Dish', dishSchema);

module.exports = Dish;
