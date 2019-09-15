const mongoose = require('mongoose');

const shoeSchema = new mongoose.Schema({
	id: {
		type: String,
		unique: true
    },
    title: String,
    subtitle: String,
    link: String,
    img: String,
    fullPrice: Number,
    discountedPrice: Number,
    totalDiscount: Number,
});

const Shoe = mongoose.model('Shoe', shoeSchema);

module.exports = Shoe;
