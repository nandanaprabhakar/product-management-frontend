import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FavoriteBorderSharpIcon from '@mui/icons-material/FavoriteBorderSharp';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Typography } from '@mui/material';
import { deletWishlistProductAPI, getWishlistAPI } from '../services/allAPI';
import StarPurple500OutlinedIcon from '@mui/icons-material/StarPurple500Outlined';

function Wishlist({ color }) {

    const [token, setToken] = useState('');
    const [open, setOpen] = React.useState(false);
    const [wishlist, setWishlist] = useState([]);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const getWishlist = async () => {
        const reqHeader = {
            Authorization: `Bearer ${token}`
        }
        try {
            const response = await getWishlistAPI(reqHeader);
            console.log(response);
            setWishlist(response.data);
        }
        catch (err) {
            console.log(err);
        }
    }

    const deleteWishlistProduct = async (id) => {
        const reqHeader = {
            Authorization: `Bearer ${token}`
        }
        try {
            const response = await deletWishlistProductAPI(id, reqHeader);
            console.log(response);
            alert(response.data);
            getWishlist();
        }
        catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getWishlist();
        setToken(sessionStorage.getItem('token'));
    }, [token]);

    return (
        <div>
            <FavoriteBorderSharpIcon onClick={toggleDrawer(true)} sx={{ width: '24px', height: '24px', color }} />
            <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                <Box sx={{ width: { xs: '80vw', sm: '350px', md: '451px' }, borderLeft: '1px solid #ACACAC', position: 'relative' }} role="presentation" onClick={toggleDrawer(false)}>
                    <List sx={{ width: '100%', maxWidth: '451px', height: '100px', backgroundColor: '#003F62' }}>
                        <ListItem disablePadding sx={{ width: '100%', maxWidth: '340px', height: '53.71px' }}>
                            <ListItemButton sx={{ height: '100%', display: 'flex', justifyContent: 'space-between' }}>
                                <ListItemIcon sx={{ width: '54.44px', height: '53.71px', borderRadius: '50%', border: '1px solid #FFFFFF', display: 'flex', justifyContent: 'center', alignItems: 'center', minWidth: '54.44px' }}>
                                    <FavoriteBorderSharpIcon sx={{ width: '26.49px', height: '26.49px', color: '#FFFFFF' }} />
                                </ListItemIcon>
                                <ListItemText primary="Items" sx={{ ml: '12px', color: '#FFFFFF', '& .MuiListItemText-primary': { color: '#FFFFFF' } }} />
                                <ListItemIcon sx={{ width: '54.44px', height: '53.71px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', minWidth: '54.44px' }}>
                                    <ChevronRightIcon sx={{ width: '15.95px', height: '15.95px', color: '#FFFFFF' }} />
                                </ListItemIcon>
                            </ListItemButton>
                        </ListItem>
                    </List>
                    <List sx={{ width: '100%', maxWidth: '650px', mx: 'auto', p: 0, boxSizing: 'border-box' }}> {wishlist?.map((item) => (
                        <ListItem key={item?._id} disablePadding sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, sm: 2 }, width: '100%', minHeight: { xs: '120px', sm: '150px' }, mb: 2, p: { xs: 1, sm: 2 }, border: '1px solid #ACACAC', borderRadius: '10px', boxSizing: 'border-box', }}>
                            <Box component="img" src={`https://product-management-backend-23i3.onrender.com/uploads/${encodeURIComponent(item?.image)}`} alt={item?.productname} sx={{ width: { xs: '85px', sm: '120px', md: '130px' }, height: { xs: '95px', sm: '120px' }, flexShrink: 0, objectFit: 'contain', borderRadius: '8px', }} />
                            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', flex: 1, minWidth: 0, gap: 1 }}>
                                <Typography sx={{ fontFamily: 'Poppins', fontSize: { xs: '13px', sm: '15px', md: '17px' }, color: '#003F62', fontWeight: 500, overflowWrap: 'anywhere' }}>{item?.productname}</Typography>
                                <Typography sx={{ fontFamily: 'Poppins', fontSize: { xs: '12px', sm: '14px' }, fontWeight: 600, color: '#003F62' }}>${item?.price}</Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'row', width: '117.02px', height: '14.65px', gap: '10.82px' }}>
                                    <StarPurple500OutlinedIcon sx={{ width: '14.75px', height: '14.65px', color: '#ACACAC' }} /><StarPurple500OutlinedIcon sx={{ width: '14.75px', height: '14.65px', color: '#ACACAC' }} /><StarPurple500OutlinedIcon sx={{ width: '14.75px', height: '14.65px', color: '#ACACAC' }} /><StarPurple500OutlinedIcon sx={{ width: '14.75px', height: '14.65px', color: '#ACACAC' }} /><StarPurple500OutlinedIcon sx={{ width: '14.75px', height: '14.65px', color: '#ACACAC' }} />
                                </Box>
                            </Box>
                            <Button onClick={(e) => { e.stopPropagation(); deleteWishlistProduct(item._id) }} sx={{ minWidth: '28px', width: '28px', height: '28px', p: 0, flexShrink: 0, color: '#003F62', fontSize: '22px', alignSelf: 'flex-start' }}>×</Button>
                        </ListItem>
                    ))}
                    </List>
                </Box>
            </Drawer>
        </div>
    )
}

export default Wishlist