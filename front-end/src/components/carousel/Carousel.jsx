import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Typography } from '@mui/material';
import CarouselImage1 from "../images/carousel1.jpg";
import CarouselImage2 from "../images/carousel2.jpg";
import CarouselImage3 from "../images/carousel3.jpg";
import './carousel.scss'

const CarouselContainer = () => {
    return (
        <React.Fragment>
            <div className="intro-cont">
                <Carousel>
                    <div className="carousel-wrap">
                        <img src={CarouselImage2} alt="" className="carousel-image" />
                    </div>
                    <div className="carousel-wrap">
                        <img src={CarouselImage1} alt="" className="carousel-image" />
                    </div>
                    <div className="carousel-wrap">
                        <img src={CarouselImage3} alt="" className="carousel-image" />
                    </div>
                </Carousel>
            </div>
            <Typography variant="h4" gutterBottom>
                Barbers Shop
            </Typography>
            <Typography variant="body1" paragraph style={{ textAlign: 'justify' }}>
                Welcome to "Barbers Shop", where style meets tradition. We take pride in delivering exceptional grooming services with a touch of old-school charm. Our skilled barbers are committed to providing precision haircuts, classic shaves, and a personalized experience that goes beyond the ordinary.
            </Typography>
        </React.Fragment>
    );
};

export default CarouselContainer;
