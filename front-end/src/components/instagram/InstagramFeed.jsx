import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Avatar, Box, Button, ImageList, ImageListItem, Link, Typography } from '@mui/material';
import Image from 'mui-image';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import InstagramIcon from '@mui/icons-material/Instagram';
import Logo from '../images/user-profile-img.png';
import Banner from '../banner/Banner';

const InstagramFeed = () => {
    const [userData, setUserData] = useState(null);
    const [mediaData, setMediaData] = useState(null);
    const [selectedMedia, setSelectedMedia] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    // const [imageCount, setImageCount] = useState(10);

    const accessToken = 'Add your token here';
    const getUserUrl = `https://graph.instagram.com/me?fields=id,username&access_token=`;
    const getMediaUrl = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp&limit=`;
    //${imageCount}

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userResponse = await Axios.get(`${getUserUrl}${accessToken}`);
                const userData = userResponse.data;

                if (userData && userData.id && userData.username) {
                    setUserData(userData);
                    // setProfilePicture(userSocialCount.profile_picture_url);
                } else {
                    console.error("Instagram User Data is not present or incomplete in the response:", userResponse);
                }
                const mediaResponse = await Axios.get(`${getMediaUrl}&access_token=${accessToken}`);
                const mediaData = mediaResponse.data.data;
                if (mediaData && mediaData.length > 0) {
                    setMediaData(mediaData);
                } else {
                    console.error("Instagram Media Data is not present or empty in the response:", mediaResponse);
                }
            } catch (error) {
                console.error("Failed to fetch Instagram data:", error);
            }
        };

        fetchData();
    }, [getMediaUrl, getUserUrl]);

    // Dependency on imageCount so that it updates when the count changes }, [imageCount]);
    // const loadMoreImages = () => {
    //     setImageCount(prevCount => prevCount + 10);
    // };

    const formatTimestamp = (timestamp) => {
        const options = { month: 'short', day: 'numeric' };
        const formattedDate = new Date(timestamp).toLocaleDateString(undefined, options);
        return formattedDate;
    };
    const handleImageItemClick = (media) => {
        setSelectedMedia(media);
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Banner />
            {mediaData ? (
                <ImageList
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        padding: '5px'
                    }}
                >
                    {mediaData.map((media) => (
                        <ImageListItem
                            key={media.id}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                maxWidth: '300px',
                                height: 'auto',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: '5px',
                                ':hover': {
                                    opacity: 0.9,
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
                                    transition: 'opacity 0.5s ease-in-out, box-shadow 0.5s ease-in-out',
                                },
                                '@media (max-width: 700px)': { maxWidth: '210px' }
                            }}
                        >
                            <Button onClick={() => handleImageItemClick(media)}>
                                <Image
                                    src={media.media_url}
                                    alt={media.caption}
                                    sx={{ borderRadius: '15px' }}
                                />
                            </Button>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '5px',
                                        '@media (max-width: 700px)': { flexDirection: 'row' },
                                    }}
                                >
                                    <Avatar
                                        src={Logo}
                                        alt={userData.username}
                                        variant="square"
                                        sx={{ width: 30, height: 30, borderRadius: '5px' }}
                                    />
                                    <Typography>{userData.username}</Typography>
                                </Box>
                                <Typography
                                    sx={{
                                        fontSize: '12px',
                                        fontStyle: 'italic',
                                        fontWeight: 'bold',
                                        padding: '2px',
                                        borderRadius: '5px 0px 5px 0px',
                                        backgroundColor: '#CBCED0',
                                        fontFamily: 'sans-serif',
                                    }}
                                >
                                    {formatTimestamp(media.timestamp)}
                                </Typography>
                            </Box>
                            <Link
                                href={media.permalink}
                                target="_blank"
                                rel="noopener"
                                sx={{ color: 'black', cursor: 'pointer', display: 'flex', paddingLeft: '20px' }}
                            >
                                <InstagramIcon sx={{ fontSize: '14px', margin: '3px' }} />
                                <Typography variant="body1" sx={{ fontSize: '14px' }}>
                                    View on Instagram
                                </Typography>
                            </Link>
                        </ImageListItem>
                    ))}
                </ImageList>
            ) : (
                <p></p>
            )}

            <Dialog open={dialogOpen} onClose={handleDialogClose} maxWidth="md">
                <DialogContent sx={{ display: 'flex', padding: '0px', flexDirection: { xs: 'column', md: 'row' } }}>
                    {selectedMedia && (
                        <>
                            {/* Left side: */}
                            <Box sx={{ flex: '0 0 60%', '@media (max-width: 900px)': { flex: '0 0 100%' } }}>
                                <Image src={selectedMedia.media_url} alt={selectedMedia.caption} sx={{ width: '100%', '@media (max-width: 900px)': { maxHeight: '500px' } }} />
                            </Box>

                            {/* Right side: */}
                            <Box sx={{ flex: '0 0 40%', display: 'flex', flexDirection: 'column' }}>
                                {/* Avatar and Username on the same line */}
                                <Box sx={{ display: 'flex', alignItems: 'center', padding: '20px' }}>
                                    <Avatar src={Logo} alt={userData.username} sx={{ width: 35, height: 35, marginRight: '16px' }} />
                                    <Typography variant="h6">{userData.username}</Typography>
                                </Box>
                                <Typography variant="body1" sx={{ fontSize: '14px', paddingLeft: '20px', paddingRight: '20px', alignItems: 'center', justifyContent: 'center' }}>{selectedMedia.caption}</Typography>
                                <Box>
                                    <Link href={selectedMedia.permalink} target="_blank" rel="noopener" sx={{ margin: '5px', color: 'black', cursor: 'pointer', display: 'flex', paddingLeft: '20px' }}>
                                        <InstagramIcon sx={{ fontSize: '14px', margin: '3px' }} />
                                        <Typography variant="body1" sx={{ fontSize: '14px' }}>
                                            View on Instagram
                                        </Typography>
                                    </Link>
                                    <Link href="https://www.instagram.com/barbers.shop.images/" target="_blank" rel="noopener" sx={{ margin: '5px', color: 'black', cursor: 'pointer', display: 'flex', paddingLeft: '20px' }}>
                                        <InstagramIcon sx={{ fontSize: '14px', margin: '3px' }} />
                                        <Typography variant="body1" sx={{ fontSize: '14px' }}>
                                            Follow us on Instagram
                                        </Typography>
                                    </Link>
                                </Box>
                            </Box>
                        </>
                    )}
                </DialogContent>
            </Dialog>

            {/* <Button className="load-more-images" onClick={loadMoreImages} sx={{ color: 'black', borderRadius: '5px', fontSize: '17px', cursor: 'pointer', textTransform: 'capitalize', padding: '5px', margin: '10px' }} >
                <p>Load More</p>
            </Button> */}
        </Box >
    );
};

export default InstagramFeed;