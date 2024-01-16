import React from 'react';
import Navbar from '../navbar/Navbar';
import CarouselContainer from '../carousel/Carousel';
import NewsletterForm from '../newsletter-form/NewsletterForm';
import { Container } from '@mui/material';
import InstagramFeed from '../instagram/InstagramFeed';
import OurTeam from '../team/OurTeam';
import Footer from '../footer/Footer';

export default function HomePage() {

  return (
    <React.Fragment>
      <Navbar />
      <Container maxWidth="xl" sx={{ minHeight: 'calc(100vh - 100px - 50px - 22px)' }}>
        <CarouselContainer />
        <NewsletterForm />
        <InstagramFeed />
        <OurTeam />
      </Container>
      <Footer />
    </React.Fragment>
  );
}
