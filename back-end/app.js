import mysql from 'mysql2';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();
app.use(express.json());
app.use(bodyParser.json());

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "DELETE"],
    credentials: true
}));

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const JWT_SECRET_KEY = 'your-secret-key';

app.post('/accept-cookies', (req, res) => {
    // Check if the user has accepted cookies (you can customize this based on your requirements)
    const { acceptCookies } = req.body;

    if (acceptCookies) {
        // Generate a JWT token
        const token = jwt.sign({ acceptedCookies: true }, JWT_SECRET_KEY, { expiresIn: '1h' });

        // Return the token to the client
        res.json({ token });
    } else {
        res.status(400).json({ error: 'Please accept cookies to proceed.' });
    }
});

app.post('/subscribtion', (req, res) => {
    const { firstName, lastName, email, phone, discountCodeValue, discountCodeName } = req.body;

    pool.query(
        'INSERT INTO newsletter (newsletter_first_name, newsletter_last_name, newsletter_email, newsletter_phone_number, newsletter_discount_code_value, newsletter_discount_code_name) VALUES (?, ?, ?, ?, ?, ?)',
        [firstName, lastName, email, phone, discountCodeValue, discountCodeName],
        (error, results) => {
            if (error) {
                console.error('Subscribe failed:', error);
                return res.status(500).json({ message: 'Subscription failed.', error: error.message });
            }
            res.status(200).json({ message: 'Subscription successful!' });
        }
    );
});

app.get('/products', (req, res) => {
    pool.query('SELECT * FROM products', (error, results) => {
        if (error) {
            console.error('Error fetching products:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.status(200).json({ products: results });
        }
    });
});

app.get("/our-team", (req, res) => {
    pool.query(
        "SELECT * FROM barbers",
        (err, result) => {
            if (err) {
                res.send({ err: err });
            } else {
                res.send(result);
            }
        }
    );
});


app.get("/shifts", (req, res) => {
    pool.query(
        "SELECT * FROM shifts",
        (err, result) => {
            if (err) {
                res.send({ err: err });
            } else {
                res.send(result);
            }
        }
    );
});

app.post('/submit-contact', (req, res) => {
    const {
        firstName,
        lastName,
        email,
        phone,
        message,
        inquiryType
    } = req.body;

    pool.query(
        'INSERT INTO contacts (first_name, last_name, email, phone, message, inquiryType) VALUES (?, ?, ?, ?, ?, ?)',
        [firstName, lastName, email, phone, message, inquiryType],
        (error, results) => {
            if (error) {
                console.error('Form submission failed:', error);
                return res.status(500).json({ message: 'Form submission failed.', error: error.message });
            }
            res.status(200).json({ message: 'Form submitted successfully!' });
        }
    );
});

app.get("/discount-codes", (req, res) => {
    pool.query(
        "SELECT newsletter_discount_code_value, newsletter_discount_code_name FROM newsletter",
        (err, result) => {
            if (err) {
                res.send({ err: err });
            } else {
                res.send(result);
            }
        }
    );
});

app.post('/reservation', (req, res) => {
    const {
        firstName,
        lastName,
        email,
        phone,
        products,
        barber,
        appointmentTime,
        totalPrice,
        totalDuration
    } = req.body;

    pool.query(
        'INSERT INTO reservations (user_id, form_user_first_name, form_user_phone, apointment_time, form_user_last_name, form_user_email, products, price, duration) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [barber, firstName, phone, appointmentTime, lastName, email, products, totalPrice, totalDuration],
        (error, results) => {
            if (error) {
                console.error('Form submission failed:', error);
                return res.status(500).json({ message: 'Form submission failed.', error: error.message });
            }
            res.status(200).json({ message: 'Form submitted successfully!' });
        }
    );
});

app.get("/reservations", (req, res) => {
    const { user_id } = req.query;

    const query = `SELECT user_id, apointment_time, duration FROM reservations WHERE user_id = ${user_id}`;

    pool.query(query, (err, result) => {
        if (err) {
            res.send({ err: err });
        } else {
            res.send(result);
        }
    });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});