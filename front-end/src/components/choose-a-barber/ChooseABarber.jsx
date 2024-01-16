import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Avatar, Button, Paper, Box, Grid } from '@mui/material';

const ChooseABarber = ({ selectedBarbers, onAddToCart }) => {

    const [teamMembers, setTeamMembers] = useState([]);
    const baseURL = "http://localhost:8080";

    useEffect(() => {
        axios.get(`${baseURL}/our-team`)
            .then(response => {
                setTeamMembers(response.data);
            })
            .catch(error => {
                console.error('Error fetching team data:', error);
            });
    }, []);

    return (
        <Grid container spacing={2}>
            {teamMembers.map((member, index) => (
                <Grid key={index} item xs={12} md={6} lg={4}>
                    <Button
                        onClick={() => onAddToCart(member, index)}
                        disableRipple
                        sx={{
                            borderRadius: 0,
                            margin: 0,
                            padding: 0,
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 1)',
                            },
                        }}
                    >
                        <Paper
                            elevation={3}
                            sx={{
                                minWidth: '200px',
                                minHeight: '200px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                textAlign: 'center',
                                border: selectedBarbers.some((barber) => barber.user_id === member.user_id) ? '2px solid #6f00ff' : 'none',
                                p: 2,
                                mb: 2,
                                mt: 2,
                                '&:hover': {
                                    backgroundColor: '#F1F1F1',
                                }
                            }}
                        >
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Avatar
                                    alt={member.user_name}
                                    src={require(`../images/${member.user_icon}`)}
                                    sx={{
                                        minWidth: '70px',
                                        minHeight: '70px',
                                        '& img': {
                                            objectPosition: 'top'
                                        },
                                    }}
                                />
                                <Box>
                                    <Typography variant="h6" sx={{ textTransform: 'capitalize', color: 'black' }}>
                                        {member.user_name}
                                    </Typography>
                                    <Typography variant="body2" sx={{ textTransform: 'capitalize', color: 'black' }}>
                                        {member.user_role}
                                    </Typography>
                                </Box>
                            </Box>
                        </Paper>
                    </Button>
                </Grid>
            ))}
        </Grid>
    );
};

export default ChooseABarber;