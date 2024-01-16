import React from 'react';
import Navbar from '../navbar/Navbar';
import { Container, Typography } from '@mui/material';
import OurTeam from '../team/OurTeam';
import Footer from '../footer/Footer';

const AboutUs = () => {

    return (
        <React.Fragment >
            <Navbar />
            <Container maxWidth="xl" sx={{ minHeight: '100vh' }}>
                <Typography variant="h4" gutterBottom>
                    About Us
                </Typography>
                <Typography variant="body1" paragraph sx={{ textAlign: 'justify' }}>
                    Welcome to "Barber Shop Images", where style meets tradition. We take pride in delivering exceptional
                    grooming services with a touch of old-school charm. Our skilled barbers are committed to providing
                    precision haircuts, classic shaves, and a personalized experience that goes beyond the ordinary.
                </Typography>

                <Typography variant="h5" gutterBottom>
                    Our Mission
                </Typography>

                <Typography variant="body1" paragraph sx={{ textAlign: 'justify' }}>
                    At "Barber Shop Images", our mission is to redefine the grooming experience. We believe in
                    authenticity, attention to detail, and creating an atmosphere where every client feels welcomed
                    and leaves looking and feeling their best. Whether you're after a modern style or a timeless
                    classic, our barbers are dedicated to crafting a look that suits your unique personality and
                    lifestyle.
                </Typography>
                <OurTeam />
            </Container>
            <Footer />
        </React.Fragment>
    );
};

export default AboutUs;
