import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import axios from 'axios';
import Box from '@mui/material/Box';

const Cookies = () => {
    const [open, setOpen] = useState(true);
    const [consent, setConsent] = useState(false);

    useEffect(() => {
        const hasConsent = localStorage.getItem('cookieConsent');
        if (hasConsent === 'true') {
            setConsent(true);
            setOpen(false);
        }
    }, []);

    const handleAccept = async () => {
        try {
            const response = await axios.post('http://localhost:8080/accept-cookies', {
                acceptCookies: true,
            });

            if (response.status === 200) {
                const { token } = response.data;
                // You can use the token as needed, for example, store it in a cookie or localStorage
                console.log('JWT Token:', token);
            } else {
                console.error('Failed to generate JWT token');
            }
        } catch (error) {
            console.error('Error:', error);
        }

        setConsent(true);
        setOpen(false);
        localStorage.setItem('cookieConsent', 'true');
    };

    const handleDecline = () => {
        setOpen(false);
    };

    return (
        <div>
            <Snackbar
                open={open && !consent}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert severity="info">
                    <Box>
                        This website uses cookies to ensure you get the best experience on our website.
                    </Box>
                    <Box>
                        <Button color="inherit" size="small" onClick={handleAccept}>
                            Accept
                        </Button>
                        <Button color="inherit" size="small" onClick={handleDecline}>
                            Decline
                        </Button>
                    </Box>
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Cookies;
