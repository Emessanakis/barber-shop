import React from 'react';
import Navbar from '../navbar/Navbar';
import { Typography, Container } from '@mui/material';
import NewsletterForm from '../newsletter-form/NewsletterForm';
import Footer from '../footer/Footer';
import NewsletterBanner from '../newsletter-banner/NewsletterBanner';

export default function Newsletter() {

    return (
        <React.Fragment>
            <Navbar />
            <Container maxWidth="xl" sx={{ minHeight: 'calc(100vh - 100px - 50px - 22px)' }} >
                <Typography variant="h4" gutterBottom>
                    Subscribe to Our Newsletter
                </Typography>
                <Typography variant="body1" paragraph sx={{ textAlign: 'justify' }}>
                    Discover the latest news and updates by subscribing to our newsletter. Get ready to receive exclusive insights, exciting announcements, and valuable information directly to your inbox. By joining us, you'll also gain access to special discounts and promotions available exclusively to our newsletter subscribers. It's more than just staying informed; it's about enjoying the perks of being part of our community. Start your journey with us and unlock a world of benefits.
                </Typography>
                <NewsletterBanner />
                <Typography variant="h4" gutterBottom>
                    New subscriptions
                </Typography>
                <Typography variant="body1" paragraph sx={{ textAlign: 'justify' }}>
                    Subscribe now and receive an exclusive 20% discount on your first purchase! Join our newsletter to stay updated on the latest trends, promotions, and insider tips. Being a part of our community means enjoying not just quality content but also incredible savings!
                </Typography>
                <NewsletterForm />
            </Container>
            <Footer />
        </React.Fragment>
    );
}
