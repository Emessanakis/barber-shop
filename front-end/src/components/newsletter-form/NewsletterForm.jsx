import React, { useState } from 'react';
import {
    TextField,
    Button,
    Grid,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@mui/material';
import { MuiTelInput } from 'mui-tel-input';
import Axios from 'axios';

export default function NewsletterForm() {
    const [newsletterFormData, setNewsletterFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        discountCodeValue: '',
        discountCodeName: ''
    });

    const [errors, setErrors] = useState({
        email: '',
        phone: '',
        firstName: '',
        lastName: '',
    });

    const [discountCode, setDiscountCode] = useState('');
    const [discountCodeValue, setDiscountCodeValue] = useState('');
    const [successDialogOpen, setSuccessDialogOpen] = useState(false);

    const baseURL = 'http://localhost:8080';

    const generateRandomCode = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const codeLength = 8;
        let code = '';
        for (let i = 0; i < codeLength; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            code += characters.charAt(randomIndex);
        }

        const discountValue = '20';
        setNewsletterFormData({
            ...newsletterFormData,
            discountCodeValue: discountValue,
            discountCodeName: code,
        });
        return [code, discountValue];
    };


    const subscription = () => {
        const [generatedCode, discountValue] = generateRandomCode();

        Axios.post(
            `${baseURL}/subscribtion`,
            {
                firstName: newsletterFormData.firstName,
                lastName: newsletterFormData.lastName,
                email: newsletterFormData.email,
                phone: newsletterFormData.phone,
                discountCodeValue: generatedCode,
                discountCodeName: discountValue,
            },
            {
                withCredentials: true,
            }
        )
            .then((response) => {
                setSuccessDialogOpen(true);
                setDiscountCode(generatedCode);
                setDiscountCodeValue(discountValue);
            })
            .catch((error) => {
                console.error('Subscription failed:', error);
            });
    };

    const handleChange = (e) => {
        setNewsletterFormData({ ...newsletterFormData, [e.target.name]: e.target.value });
    };

    const handlePhoneChange = (value) => {
        setNewsletterFormData({ ...newsletterFormData, phone: value });
        const newErrors = { ...errors, phone: '' };
        if (value.replace(/\D/g, '').length < 8) {
            newErrors.phone = 'Phone number must have at least 8 digits';
        }
        setErrors(newErrors);
    };

    const validateName = (name) => {
        return /^[A-Za-zÀ-ÖØ-öø-ÿΑ-Ωα-ωĀ-ž]{3,}$/.test(name) && name.length > 2;
    };

    const validateEmail = (email) => {
        const trimmedEmail = email.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(trimmedEmail);
    };


    const handleCloseSuccessDialog = () => {
        setSuccessDialogOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {
            email: '',
            phone: '',
            firstName: '',
            lastName: '',
        };

        if (!validateName(newsletterFormData.firstName)) {
            newErrors.firstName = 'First name must contain only letters and be at least 3 characters long';
        }

        if (!validateName(newsletterFormData.lastName)) {
            newErrors.lastName = 'Last name must contain only letters and be at least 3 characters long';
        }

        if (!validateEmail(newsletterFormData.email)) {
            newErrors.email = 'Invalid email format (example: email@gmail.com)';
        }

        if (newsletterFormData.phone.replace(/\D/g, '').length < 8) {
            newErrors.phone = 'Phone number must have at least 8 digits';
        }
        setErrors(newErrors);
        if (!newErrors.email && !newErrors.phone && !newErrors.firstName && !newErrors.lastName) {
            subscription();
            setNewsletterFormData({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
            });
        }
    };

    return (
        <React.Fragment>
            <Typography variant="h5" gutterBottom>
                Newsletter
            </Typography>
            <form onSubmit={handleSubmit} noValidate>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="First Name"
                            variant="outlined"
                            fullWidth
                            name="firstName"
                            value={newsletterFormData.firstName}
                            onChange={handleChange}
                            required
                            error={!!errors.firstName}
                            helperText={errors.firstName}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Last Name"
                            variant="outlined"
                            fullWidth
                            name="lastName"
                            value={newsletterFormData.lastName}
                            onChange={handleChange}
                            required
                            error={!!errors.lastName}
                            helperText={errors.lastName}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Your Email"
                            variant="outlined"
                            fullWidth
                            name="email"
                            type="email"
                            value={newsletterFormData.email}
                            onChange={handleChange}
                            required
                            error={!!errors.email}
                            helperText={errors.email}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <MuiTelInput
                            label="Your Phone"
                            variant="outlined"

                            fullWidth
                            name="phone"
                            defaultCountry="GR"
                            value={newsletterFormData.phone}
                            onChange={handlePhoneChange}
                            required
                            error={!!errors.phone}
                            helperText={errors.phone}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" sx={{ backgroundColor: '#3f3f3f' }}>
                            Subscribe
                        </Button>
                    </Grid>
                </Grid>
            </form>
            <Dialog open={successDialogOpen} onClose={handleCloseSuccessDialog}>
                <DialogTitle>Subscription Successful</DialogTitle>
                <DialogContent>
                    <Typography>
                        Your discount code is: {discountCode} with value {discountCodeValue} %
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseSuccessDialog} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
