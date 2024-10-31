const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://thulasikrishna1998:Krishna091999@cluster0.443keie.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(console.log("DB CONNECTED"));

const phoneSchema = new mongoose.Schema({
    brand: String,
    year: Number,
    price: Number,
});

const Phone = mongoose.model('Phone', phoneSchema);

const phones = [
    { brand: 'Apple', year: 2022, price: 69000 },
    { brand: 'Samsung', year: 2022, price: 23000 },
    { brand: 'Realme', year: 2022, price: 24000  },
];

Phone.insertMany(phones)
    .then(() => {
        console.log('Data inserted');
        mongoose.connection.close();
    })
    .catch(err => {
        console.error(err);
        mongoose.connection.close();
    });

