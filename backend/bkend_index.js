import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import customer from './routes/customer.js';

dotenv.config();

const port = process.env.PORT || 6000;

const corsOptions = {
    origin: true,
    methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
};

const app = express();

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/v1/customer", customer);

app.get("/", async (req, res) => {
    res.status(200).send({
        status: true,
        message: "Welcome to the Garbage Out API",
        version: "1.0.0",
    });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});