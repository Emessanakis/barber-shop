import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Card, CardContent, Grid } from '@mui/material';
import Image from 'mui-image';

const TeamMemberCard = ({ member }) => (
    <Card >
        <Image
            src={require(`../images/${member.user_icon}`)}
            alt="Icon"
            sx={{ width: '100%', maxHeight: '400px', objectFit: 'cover', objectPosition: 'top' }}
        />
        <CardContent>
            <Typography variant="h6" gutterBottom>
                {member.user_name}
            </Typography>
            <Typography variant="body2">
                {member.user_role}
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'justify' }}>
                {member.user_bio}
            </Typography>
        </CardContent>
    </Card>
);

const OurTeam = () => {
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
        <>
            <Typography variant="h5" gutterBottom>
                Meet Our Team
            </Typography>

            <Grid container spacing={2}>
                {teamMembers.map((member, index) => (
                    <Grid key={index} item xs={12} md={6} lg={4} >
                        <TeamMemberCard member={member} />
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default OurTeam;
