import React, { useState } from 'react';
import {
    TextField,
    Button,
    Grid,
    Select,
    MenuItem,
    InputLabel,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';
import { MuiTelInput } from 'mui-tel-input';

export default function ContactForm() {
    const [successDialogOpen, setSuccessDialogOpen] = useState(false);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
        inquiryType: 'Information about a service',
    });

    const initialFormData = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
        inquiryType: 'Information about a service',
    };

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
    });

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

    const handleResetForm = () => {
        setFormData(initialFormData);
        setErrors({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
        });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleMessageChange = (e) => {
        if (e.target.value.length <= 400) {
            handleChange(e);
        }
    };

    const handlePhoneChange = (value) => {
        setFormData({ ...formData, phone: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
        };

        if (!validateName(formData.firstName)) {
            newErrors.firstName = 'First name must contain only letters and be at least 3 characters long';
        }

        if (!validateName(formData.lastName)) {
            newErrors.lastName = 'Last name must contain only letters and be at least 3 characters long';
        }

        if (!validateEmail(formData.email)) {
            newErrors.email = 'Invalid email format (example: email@gmail.com)';
        }

        if (formData.phone.replace(/\D/g, '').length < 8) {
            newErrors.phone = 'Phone number must have at least 8 digits';
        }

        setErrors(newErrors);

        if (!newErrors.firstName && !newErrors.lastName && !newErrors.email && !newErrors.phone) {
            try {
                const response = await fetch('http://localhost:8080/submit-contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                if (response.ok) {
                    console.log('Form submitted successfully');
                    handleResetForm();
                    setSuccessDialogOpen(true);
                } else {
                    console.error('Form submission failed:', response.statusText);
                }
            } catch (error) {
                console.error('Error sending form data:', error);
            }
        }
    };

    return (
        <React.Fragment>
            <Typography variant="h5" gutterBottom>
                Contact Form
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <InputLabel id="inquiry-type-label">Inquiry Type</InputLabel>
                        <Select
                            labelId="inquiry-type-label"
                            id="inquiry-type"
                            variant="outlined"
                            fullWidth
                            name="inquiryType"
                            value={formData.inquiryType}
                            onChange={handleChange}
                            required
                        >
                            <MenuItem value="Information about a service">Information about a service</MenuItem>
                            <MenuItem value="Information about a product">Information about a product</MenuItem>
                            <MenuItem value="Cooperation with the company">Cooperation with the company</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="First Name"
                            variant="outlined"
                            fullWidth
                            name="firstName"
                            value={formData.firstName}
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
                            value={formData.lastName}
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
                            value={formData.email}
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
                            value={formData.phone}
                            onChange={handlePhoneChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Your Message"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={4}
                            name="message"
                            value={formData.message}
                            onChange={handleMessageChange}
                            required
                            helperText={`${formData.message.length}/400`}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" sx={{ backgroundColor: '#3f3f3f' }}>
                            Send Message
                        </Button>
                    </Grid>
                </Grid>
            </form>
            <Dialog open={successDialogOpen} onClose={handleCloseSuccessDialog}>
                <DialogTitle>Form Submitted</DialogTitle>
                <DialogContent>
                    <Typography>
                        Thank you for submitting the form, we will contact you soon !!
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseSuccessDialog} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment >
    );
}
