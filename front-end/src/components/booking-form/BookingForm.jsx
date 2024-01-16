import React from 'react';
import {
    TextField,
    Grid,
    Typography,
} from '@mui/material';
import { MuiTelInput } from 'mui-tel-input';

const BookingForm = ({ formData, setFormData, onFormSubmit }) => {
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePhoneChange = (value) => {
        setFormData({ ...formData, phone: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        onFormSubmit(formData);
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
        });
    };

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Appointment Form
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="First Name"
                            variant="outlined"
                            fullWidth
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Last Name"
                            variant="outlined"
                            fullWidth
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Your Email"
                            variant="outlined"
                            fullWidth
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
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
                </Grid>
            </form>
        </React.Fragment>
    );
};

export default BookingForm;
