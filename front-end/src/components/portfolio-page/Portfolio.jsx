import React from 'react';
import Navbar from '../navbar/Navbar';
import { Container, Typography } from '@mui/material';
import InstagramFeed from '../instagram/InstagramFeed';
import Footer from '../footer/Footer';

const Portfolio = () => {

    return (
        <React.Fragment>
            <Navbar />
            <Container maxWidth="xl" className="about-us-container" sx={{ minHeight: '100vh' }}>
                <Typography variant="h4" gutterBottom>
                    Portfolio
                </Typography>
                <Typography variant="body1" paragraph sx={{ textAlign: 'justify' }}>
                    Explore our presence on social media to immerse yourself in our creative journey.
                    Dive into our ever-evolving portfolio, showcasing a curated collection of our finest work.
                    Discover the perfect fit for your style and effortlessly schedule your next appointment.
                    Trust us with the details, and let your style journey begin.
                    Embark on a visual adventure through our diverse range of projects, each a testament to our passion for innovation and quality craftsmanship.
                    Join our community of satisfied clients who have experienced the seamless blend of artistry and professionalism.
                    Your unique style story awaits—uncover it with us.
                </Typography>
                <InstagramFeed />
            </Container>
            <Footer />
        </React.Fragment>
    );
};

export default Portfolio;
