// Banner.js
import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Box, Typography, Paper, Grid } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import Logo from '../images/user-profile-img.png';
import BannerBackground from '../images/banner-background.jpg';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';

const Banner = () => {
    const [mediaCount, setMediaCount] = useState(null);

    const accessToken = 'Add your token here';
    const getUserFollowersMediaCount = `https://graph.instagram.com/v12.0/me?fields=id,media_count&access_token=`;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userFollowersMediaCount = await Axios.get(`${getUserFollowersMediaCount}${accessToken}`);
                const userSocialCount = userFollowersMediaCount.data;

                if (userSocialCount && userSocialCount.media_count) {

                    setMediaCount(userSocialCount.media_count);
                } else {
                    console.error("Instagram Data is not present or incomplete in the response:");
                }
            } catch (error) {
                console.error("Failed to fetch Instagram data:", error);
            }
        };

        fetchData();
    }, [getUserFollowersMediaCount]);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Paper
                elevation={3}
                sx={{
                    display: 'flex',
                    p: 2,
                    mb: 2,
                    mt: 2,
                    height: 'auto',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundImage: `url(${BannerBackground})`,
                    backgroundSize: 'cover',
                    color: 'whitesmoke',
                }}
            >
                <Grid container spacing={2} alignItems="center" sx={{ flexDirection: { xs: 'column', md: 'row' } }}>
                    <Grid item xs={12} md={4}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                            <img
                                src={Logo}
                                alt="Profile"
                                style={{ width: '100%', height: '100%', objectFit: 'cover', maxHeight: '100px', maxWidth: '100px', borderRadius: '10px' }}
                            />
                            <Typography variant="body1">Barbers Shop</Typography>
                            {mediaCount !== null && (
                                <Typography variant="body1" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                                    <AccountBoxOutlinedIcon /> 152
                                    <InstagramIcon /> {mediaCount}
                                </Typography>
                            )}
                        </Box>
                    </Grid>
                    {/* Information on the right */}
                    <Grid item xs={12} md={8} sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'center' }, gap: '10px', textAlign: { xs: 'center', md: 'left' } }}>
                        <Typography variant="body1" sx={{ display: 'flex', gap: '10px', justifyContent: 'flex-start' }}>
                            <FmdGoodIcon /> Dikaiosinis 35, Heraklion, Crete
                        </Typography>
                        <Typography variant="body1" sx={{ display: 'flex', gap: '10px', justifyContent: 'flex-start' }}>
                            <LocalPhoneOutlinedIcon />2810123456
                        </Typography>
                        <Typography variant="body1" sx={{ display: 'flex', gap: '10px', justifyContent: 'flex-start' }}>
                            <WatchLaterOutlinedIcon /> Mon-Fri 09.00 - 21.00
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default Banner;
