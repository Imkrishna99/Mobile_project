const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();


const app = express();
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}
app.use(cors(corsOptions));
app.use(bodyParser.json());

// Connect to MongoDB

mongoose.connect(process.env.MONGO_URI).then(()=>console.log("DB CONNECTED IN INDEX")).catch(err){console.log("err in MONGODB")};

const phoneSchema = new mongoose.Schema({
    brand: String,
    year: Number,
    price: Number,
});

const Phone = mongoose.model('Phone', phoneSchema);

// Route to insert phone data
app.post('/api/phones', async (req, res) => {
    const { brand, year, price } = req.body;
    const phone = new Phone({ brand, year, price });
    await phone.save();
    res.status(201).send(phone);
});

// Route to fetch phone data
app.get('/api/phones', async (req, res) => {
    const phones = await Phone.find();
    res.send(phones);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Server is running on http://localhost:3000');
});
