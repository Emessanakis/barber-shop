import React from 'react';
import Navbar from '../navbar/Navbar';
import {
    Container,
    Typography,
} from '@mui/material';
import ContactForm from '../contact-form/ContactForm';
import Banner from '../banner/Banner';
import Footer from '../footer/Footer';
// import GoogleMaps from '../maps/Maps';

export default function ContactUs() {

    return (
        <React.Fragment >
            <Navbar />
            <Container maxWidth="xl" sx={{ minHeight: 'calc(100vh - 100px - 50px - 22px)' }}>
                <Typography variant="h4" gutterBottom>
                    Contact Us
                </Typography>
                <Typography variant="body1" paragraph sx={{ textAlign: 'justify' }}>
                    Welcome to "Barbers Shop", where style meets tradition. Visit us at our location on Dikaiosinis 35, Heraklion, Crete, and experience
                    the art of grooming in a comfortable and welcoming environment. For inquiries or appointments, feel free to contact us at
                    2810123456. "Barbers Shop" is open from Monday to Saturday, 9:00 AM to 9:00 PM. We appreciate your trust in us and look forward to serving you with the best in barbering.
                    Thank you for choosing Barbers Shop – where every haircut is a masterpiece!
                </Typography>
                <Banner />
                <ContactForm />
                {/* <GoogleMaps /> */}
            </Container>
            <Footer />
        </React.Fragment>
    );
}
