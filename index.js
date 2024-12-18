import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';
import { layer } from './middleware/layer.js';

dotenv.config();

const app = express();

const corsOptions = {
    origin: 'https://your-frontend.vercel.app',
    methods: ['GET'],
  };

app.use(cors(corsOptions));

app.use('/api', layer);

app.get('/api', async (req, res) => {
    const { exam, practiceSet } = req.query;
    const appscriptUrl = "https://script.google.com/macros/s/AKfycbwHw7S89nHJd7wakH6s-hCBj09SwhF_jAT8tK9aLxZtc4YXT5A8Um1f378J3RgIQ9BHOg/exec";
  
    try {
        const response = await axios.get(appscriptUrl, {
            params: {
                exam: exam,
                practiceSet: practiceSet
            }
        });

        res.status(200).json(response.data);

    } catch (error) {
        console.error('Error fetching data from Apps Script:', error);
        res.status(500).json({ error: 'Failed to fetch data from Apps Script' });
    }
});

app.listen(5000, () => {
    console.log(`Server running on port 5000`);
});
