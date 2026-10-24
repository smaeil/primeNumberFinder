import express from 'express';
import cors from 'cors';
import primeNumberFinder from './middleware/primeNumberFinder.js';
import { createOrReadFile } from './middleware/primeNumberFinder.js';


const app = express();



app.use(cors());
app.use(express.static('./public'));
app.use(express.urlencoded({extended: true}));


// routes
app.get('/', async (req, res) => {
    try {
        return res.sendFile('./public/index.html');
    } catch (error) {
        return res.status(404);
    }
});



const dbPath = './DB/db.json';
app.get('/number/:number', async (req, res) => {
    try {

        const number = Number(req.params.number);
        if (!number) return res.status(400).json({msg: 'Bad request!'});

        // Bussiness logic.
        const isPrime = await primeNumberFinder(number, dbPath);
        const list = await createOrReadFile(dbPath);


        return res.status(200).json({msg: 'Success', isPrime, list, ok: true, number});
    } catch (error) {
        return res.status(500).json({msg: 'Server Error!', ok: false});
        console.log(error);
    }
});



// server
const port = 7017;
app.listen(port, () => {
    console.log(`The PrimeNumberFinder App is running on port=${port}`);
});