import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';
import { layer } from './middleware/layer.js';

dotenv.config();

const app = express();

const corsOptions = {
    origin: process.env.Allowed_Domain,
    methods: ['GET'],
  };

app.use(cors(corsOptions));

app.use('/api', layer);

app.get('/api', async (req, res) => {
    const { exam, practiceSet } = req.query;
    const appscriptUrl = process.env.BASE_URL;
  
    if(!exam || !practiceSet){
        res.status(400).json();
    }
    else{
        try {
            const response = await axios.get(appscriptUrl, {
                params: {
                    exam: exam,
                    practiceSet: practiceSet
                }
            });

        res.status(200).json(response.data);

    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data from Script' });
        }
    }
});


app.listen(5000, () => {
    console.log(`Server running on port 5000`);
});
