import React from 'react';
import { Button, Paper, Box, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';

const ProductList = ({ allProducts, handleAddToCart, disabledButtons }) => {
    return (
        <>
            {allProducts.map((product, index) => (
                <Button
                    key={index}
                    onClick={() => handleAddToCart(product, index)}
                    disableRipple
                    sx={{
                        width: '100%',
                        textAlign: 'left',
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
                            display: 'flex',
                            p: 2,
                            mb: 2,
                            mt: 2,
                            height: 'auto',
                            width: '100%',
                            border: disabledButtons.includes(index) ? '2px solid #6f00ff' : 'none',
                            '&:hover': {
                                backgroundColor: '#F1F1F1',
                            }
                        }}
                    >
                        <Box sx={{ textTransform: 'capitalize' }}>
                            <Typography variant="body1" >
                                {product.product_title}
                            </Typography>
                            <Typography variant="body2">{product.product_duration}</Typography>
                            <Typography variant="body2">{product.product_price} €</Typography>
                        </Box>
                        <Box sx={{ marginLeft: 'auto' }}>
                            {disabledButtons.includes(index) ?
                                <CheckIcon sx={{ color: ' whitesmoke', backgroundColor: 'blue', borderRadius: '5px', opacity: .6 }} />
                                :
                                <AddIcon sx={{ color: '#454545', backgroundColor: '#E7E7E7', borderRadius: '5px' }} />}
                        </Box>
                    </Paper>
                </Button>
            ))}
        </>
    );
};

export default ProductList;
