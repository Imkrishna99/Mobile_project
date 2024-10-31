import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./App.css"

const App = () => {
  // placing phones input data in varible using useState hook
    const [phones, setPhones] = useState([]);
    const [brand, setBrand] = useState('');
    const [year, setYear] = useState('');
    const [price, setPrice] = useState('');

//fetching the data from the API 
    useEffect(() => {
        const fetchPhones = async () => {
            const response = await axios.get('http://localhost:5000/api/phones');
            setPhones(response.data);
        };

        fetchPhones();
        const interval = setInterval(fetchPhones, 5000); // Fetch every 5 seconds

        return () => clearInterval(interval);
    }, []);
 
    //using onSubmit handle to post the data using axios.
    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/api/phones', {
            brand,
            year: Number(year),
            price: Number(price),
        });
        setBrand('');
        setYear('');
        setPrice('');
    };

    return (
        <div className='container'>
            <h1>Mobile Phones</h1>
            <div className="input-group">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Brand"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
                <button type="submit">Add Phone</button>
            </form>
            </div>
            <ul className="list">
                {phones.map((phone) => (
                    <li key={phone._id} className='list-item'>
                        {phone.brand} - {phone.year} - {phone.price} rs/-
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;