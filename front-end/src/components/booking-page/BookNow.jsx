import React, { useState, useEffect } from 'react';
import Navbar from '../navbar/Navbar';
import Cookies from '../cookies/Cookies';
import { Typography, Paper, Box, Grid, Container, Button, Avatar, TextField } from '@mui/material';
import Footer from '../footer/Footer';
import axios from 'axios';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ProductList from '../product-list/ProductList';
import ChooseABarber from '../choose-a-barber/ChooseABarber';
import Booking from '../booking/Booking';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BookingForm from '../booking-form/BookingForm';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import { format } from 'date-fns';

export default function BookNow() {
    const hasAcceptedCookies = localStorage.getItem('cookieConsent') === 'true';
    const getProductsURL = 'http://localhost:8080/products';
    const [allProducts, setAllProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [selectedBarbers, setSelectedBarbers] = useState([]);
    const [disabledButtons, setDisabledButtons] = useState([]);
    const [breadcrumbStep, setBreadcrumbStep] = useState(0);
    const [selectedDate, setSelectedDate] = useState([]);
    const [selectedDateTime, setSelectedDateTime] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogContent, setDialogContent] = useState('');
    const [successDialogOpen, setSuccessDialogOpen] = useState(false);
    const [discountCodeValue, setDiscountCodeValue] = useState('');
    const [discountCodeName, setDiscountCodeName] = useState('');
    const [discountError, setDiscountError] = useState('');

    const baseURL = 'http://localhost:8080';

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
    });



    const handleDiscountCodeChange = (e) => {
        setDiscountCodeValue(e.target.value);
    };

    const handleActivateDiscount = async () => {
        try {
            const response = await axios.get(`${baseURL}/discount-codes`);
            const discountCodes = response.data;

            const matchedDiscount = discountCodes.find(
                (code) => code.newsletter_discount_code_value === discountCodeValue
            );

            if (matchedDiscount) {
                setDiscountCodeName(matchedDiscount.newsletter_discount_code_name);
                setDiscountError('');
            } else {
                setDiscountCodeName('');
                setDiscountError('Invalid discount code. Please try again.');
            }
        } catch (error) {
            console.error('Error fetching discount codes:', error);
            setDiscountError('Failed to fetch discount codes. Please try again later.');
        }
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(getProductsURL);
                setAllProducts(response.data.products);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleAddDateToCart = (date, shiftIndex, hour) => {
        const isInCart = selectedDate.length > 0;
        const newSelectedDateTime = `${hour} ${date}`;

        if (isInCart) {
            setSelectedDateTime((prevSelectedDateTime) => newSelectedDateTime);
            setSelectedDate([date]);
        } else {
            setSelectedDateTime((prevSelectedDateTime) => newSelectedDateTime);
            setSelectedDate([date]);
        }
    };


    const handleAddBarberToCart = (barber, index) => {
        const isInCart = selectedBarbers.length > 0;

        if (isInCart) {
            setSelectedBarbers([barber]);
        } else {
            setSelectedBarbers([barber]);
        }
    };



    const handleAddToCart = (product, index) => {
        const isInCart = selectedProducts.some((item) => item.product_id === product.product_id);

        if (isInCart) {
            const updatedProducts = selectedProducts.filter((item) => item.product_id !== product.product_id);
            setSelectedProducts(updatedProducts);

            const updatedDisabledButtons = disabledButtons.filter((btnIndex) => btnIndex !== index);
            setDisabledButtons(updatedDisabledButtons);
        } else {
            setSelectedProducts([...selectedProducts, product]);
            setDisabledButtons([...disabledButtons, index]);
        }
    };

    const calculateTotalPrice = () => {
        if (selectedProducts.length === 0) {
            return null;
        }

        let totalPriceWithoutDiscount = selectedProducts.reduce((total, product) => total + product.product_price, 0);

        if (discountCodeName) {
            const discountAmount = (totalPriceWithoutDiscount * discountCodeName) / 100;
            totalPriceWithoutDiscount -= discountAmount;
        }
        return totalPriceWithoutDiscount;
    }

    const calculateTotalTime = () => {
        if (selectedProducts.length === 0) {
            return null;
        }
        return selectedProducts.reduce((totalTime, product) => totalTime + parseInt(product.product_duration), 0);
    };

    const handleFormSubmit = (formData) => {
        console.log('Form Data from BookingForm:', formData);
    };

    const validateName = (name) => /^[A-Za-zÀ-ÖØ-öø-ÿΑ-Ωα-ωĀ-ž]{3,}$/.test(name);
    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePhone = (phone) => phone.replace(/\D/g, '').length >= 8;

    const handleProceed = () => {

        if (breadcrumbStep === 0 && selectedProducts.length === 0) {
            setDialogOpen(true);
            setDialogContent('Please select at least one product.');
        } else if (breadcrumbStep === 0 && selectedProducts.length > 0) {
            setBreadcrumbStep(1);
            // console.log('Products Data:', {
            //     selectedProducts: selectedProducts,
            //     totalPrice: calculateTotalPrice(),
            //     totalDuration: calculateTotalTime(),
            // });
        }
        else if (breadcrumbStep === 1 && selectedBarbers.length === 0) {
            setDialogOpen(true);
            setDialogContent('Please select a barber.');
        } else if (breadcrumbStep === 1 && selectedBarbers.length > 0) {
            setBreadcrumbStep(2);
            // console.log('Barber Data:', {
            //     selectedBarbers: selectedBarbers,
            // });
        }
        else if (breadcrumbStep === 2 && selectedDateTime.length === 0) {
            setDialogOpen(true);
            setDialogContent('Please select a date and time.');
        } else if (breadcrumbStep === 2 && selectedDateTime.length > 0) {
            setBreadcrumbStep(3);
            // console.log('Date Time:', {
            //     selectedDateTime: selectedDateTime,
            // });
        } else if (breadcrumbStep === 3) {
            const newErrors = {};

            if (!validateName(formData.firstName)) {
                newErrors.firstName = 'First name must contain only letters and be at least 3 characters long.';
            }

            if (!validateName(formData.lastName)) {
                newErrors.lastName = 'Last name must contain only letters and be at least 3 characters long.';
            }

            if (!validateEmail(formData.email)) {
                newErrors.email = 'Invalid email format (example: email@gmail.com.)';
            }

            if (!validatePhone(formData.phone)) {
                newErrors.phone = 'Phone number must have at least 8 digits.';
            }

            if (Object.keys(newErrors).length > 0) {
                setDialogContent(Object.values(newErrors).join('\n'));
                setDialogOpen(true);
            } else {
                const currentYear = new Date().getFullYear();
                const formattedDateTime = format(new Date(selectedDateTime), `${currentYear}-MM-dd  HH:mm:ss`);
                // Adjust the format to eliminate extra spaces
                const formattedDateTimeWithoutSpaces = formattedDateTime.replace(/\s+/g, ' ');

                const requestData = {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    phone: formData.phone,
                    products: selectedProducts.map(product => product.product_title).join(', '),
                    barber: selectedBarbers.map(barber => barber.user_id).join(', '),
                    appointmentTime: formattedDateTimeWithoutSpaces,
                    totalPrice: calculateTotalPrice(),
                    totalDuration: calculateTotalTime(),
                };

                console.log('Data:', requestData);

                axios.post(
                    `${baseURL}/reservation`,
                    requestData,
                    {
                        withCredentials: true,
                    }
                )
                    .then((response) => {
                        setSuccessDialogOpen(true);
                    })
                    .catch((error) => {
                        console.error('Reservation failed:', error);
                    });
            }



        } else {
            console.warn('No data selected to proceed.');
        }
    };



    const handleBreadcrumbClick = (step) => {
        if (step <= breadcrumbStep) {
            setBreadcrumbStep(step);
        } else {
            console.warn('Cannot navigate to a higher breadcrumb step.');
        }
    };

    const renderStepComponent = () => {
        switch (breadcrumbStep) {
            case 0:
                return <ProductList
                    allProducts={allProducts}
                    handleAddToCart={handleAddToCart}
                    disabledButtons={disabledButtons}
                />;
            case 1:
                return <ChooseABarber
                    selectedBarbers={selectedBarbers}
                    onAddToCart={handleAddBarberToCart}
                    selectedProducts={selectedProducts}
                />;
            case 2:
                return <Booking
                    selectedBarbers={selectedBarbers}
                    selectedProducts={selectedProducts}
                    onAddDateToCart={handleAddDateToCart}
                    totalPrice={calculateTotalPrice()}
                    totalDuration={calculateTotalTime()}
                />;
            case 3:
                return <BookingForm
                    formData={formData}
                    setFormData={setFormData}
                    selectedBarbers={selectedBarbers}
                    selectedProducts={selectedProducts}
                    onAddDateToCart={handleAddDateToCart}
                    totalPrice={calculateTotalPrice()}
                    totalDuration={calculateTotalTime()}
                    onFormSubmit={handleFormSubmit}
                />;
            default:
                return null;
        }
    };

    return (
        <React.Fragment>
            {!hasAcceptedCookies && <Cookies />}
            <Navbar />
            <Container maxWidth="xl">
                <Grid container spacing={2} alignItems="stretch">
                    <Grid item xs={12}>
                        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                            <Button
                                sx={{ textTransform: 'capitalize' }}
                                onClick={() => handleBreadcrumbClick(0)}
                                disabled={breadcrumbStep < 0}
                            >
                                <Typography variant="body1" color="textSecondary">Services</Typography>
                            </Button>
                            <Button
                                sx={{ textTransform: 'capitalize' }}
                                onClick={() => handleBreadcrumbClick(1)}
                                disabled={breadcrumbStep < 1}
                            >
                                <Typography variant="body1" color="textSecondary">Choose a Barber</Typography>
                            </Button>
                            <Button
                                sx={{ textTransform: 'capitalize' }}
                                onClick={() => handleBreadcrumbClick(2)}
                                disabled={breadcrumbStep < 2}
                            >
                                <Typography variant="body1" color="textSecondary">Book Now</Typography>
                            </Button>
                            <Button
                                sx={{ textTransform: 'capitalize' }}
                                onClick={() => handleBreadcrumbClick(3)}
                                disabled={breadcrumbStep < 3}
                            >
                                <Typography variant="body1" color="textSecondary">Appointment Form</Typography>
                            </Button>
                        </Breadcrumbs>
                    </Grid>

                    <Grid item xs={12} md={8}>
                        {renderStepComponent()}
                    </Grid>

                    {/* Right Side - Selected Products */}
                    <Grid item xs={12} md={4}>
                        <Paper
                            elevation={3}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                p: 2,
                                mb: 2,
                                mt: 2,
                                height: 'auto',
                                minHeight: '75vh',
                            }}
                        >
                            <Typography variant="h6">
                                Overview
                            </Typography>
                            <Box>
                                {selectedProducts.map((selectedProduct, index) => (
                                    <Paper
                                        key={index}
                                        elevation={3}
                                        sx={{
                                            display: 'flex',
                                            p: 2,
                                            mb: 2,
                                            mt: 2,
                                            height: 'auto',
                                        }}
                                    >
                                        <Box>
                                            <Typography variant="body1">{selectedProduct.product_title}</Typography>
                                            <Typography variant="body2">{selectedProduct.product_duration}</Typography>
                                            <Typography variant="body2">{selectedProduct.product_price} €</Typography>
                                        </Box>
                                    </Paper>
                                ))}
                            </Box>


                            <Box>
                                {selectedBarbers.map((selectedBarber, index) => (
                                    <Paper
                                        key={index}
                                        elevation={3}
                                        sx={{
                                            display: 'flex',
                                            p: 2,
                                            mb: 2,
                                            mt: 2,
                                            height: 'auto',
                                        }}
                                    >

                                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '10px', gap: '10px' }}>
                                            <Avatar
                                                alt={selectedBarber.user_name}
                                                src={require(`../images/${selectedBarber.user_icon}`)}
                                                sx={{
                                                    minWidth: '70px',
                                                    minHeight: '70px',
                                                    '& img': {
                                                        objectPosition: 'top',
                                                    },
                                                }}
                                            />

                                            <Box sx={{}}>
                                                <Typography variant="body1">{selectedBarber.user_name}</Typography>
                                                <Typography variant="body2">{selectedBarber.user_role}</Typography>
                                            </Box>
                                        </Box>
                                    </Paper>
                                ))}
                            </Box>
                            <Box>
                                {selectedDate.map((index) => (
                                    <Paper
                                        key={index}
                                        elevation={3}
                                        sx={{
                                            display: 'flex',
                                            p: 2,
                                            mb: 2,
                                            mt: 2,
                                            height: 'auto',
                                        }}
                                    >
                                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '10px', gap: '10px' }}>
                                            <CalendarMonthIcon />
                                            <Typography variant="body1">{selectedDateTime}</Typography>
                                        </Box>
                                    </Paper>
                                ))}
                            </Box>
                            <Box>

                            </Box>
                            <Box sx={{ borderTop: '2px solid #3f3f3f', marginTop: '10px', marginBottom: '10px' }} >
                                <Paper
                                    elevation={3}
                                    sx={{
                                        p: 2,
                                        mt: 2,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '10px'
                                        }}
                                    >
                                        <TextField id="standard-basic"
                                            label="Discount Code"
                                            variant="standard"
                                            value={discountCodeValue}
                                            onChange={handleDiscountCodeChange}
                                        />
                                        <Button variant="contained"
                                            sx={{ marginTop: 'auto', fontSize: '12px', backgroundColor: 'rgb(63, 63, 63)' }}
                                            onClick={handleActivateDiscount}
                                        >
                                            Activate
                                        </Button>
                                    </Box>
                                    <Typography variant="body2" sx={{ marginTop: '10px' }}>
                                        {discountCodeName && `Discount : ${discountCodeName}%`}
                                        {discountError && <span style={{ color: 'red' }}>{discountError}</span>}
                                    </Typography>
                                    <Typography variant="body2" sx={{ marginTop: '10px' }}>
                                        Total Price: {calculateTotalPrice() !== null ? `${calculateTotalPrice()} €` : ''}
                                    </Typography>
                                    <Typography variant="body2">
                                        Duration: {calculateTotalTime() !== null ? `${calculateTotalTime()} minutes` : ''}
                                    </Typography>
                                </Paper>
                            </Box>
                            <Box sx={{ marginTop: 'auto', width: '100%' }}>
                                <Button
                                    variant="contained"
                                    onClick={handleProceed}
                                    sx={{ marginTop: 'auto', width: '100%', backgroundColor: 'rgb(63, 63, 63)' }}
                                >
                                    Proceed
                                </Button>
                            </Box>
                        </Paper>
                    </Grid>

                </Grid>
            </Container>
            <Footer />
            <Dialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Validation Error</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {dialogContent}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)}>Close</Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={successDialogOpen}
                onClose={() => setSuccessDialogOpen(false)}
                aria-labelledby="success-dialog-title"
                aria-describedby="success-dialog-description"
            >
                <DialogTitle id="success-dialog-title">Booking Successful</DialogTitle>
                <DialogContent>
                    <DialogContentText id="success-dialog-description">
                        Products: {selectedProducts.map(product => product.product_title).join(', ')} <br />
                        Barber: {selectedBarbers.map(barber => barber.user_name)}  <br />
                        Date & Time: {selectedDateTime} <br />
                        Total Price: {calculateTotalPrice()} € <br />
                        Total Duration: {calculateTotalTime()} minutes
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={() => setSuccessDialogOpen(false)}>Close</Button>
                </DialogActions>
            </Dialog>


        </React.Fragment>
    );
}
