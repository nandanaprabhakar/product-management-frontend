import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, TextField, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { SearchContext } from '../context/SearchContextShare';
import Wishlist from './Wishlist';

function Header() {
  const { searchKey, setSearchKey } = useContext(SearchContext);
  const [token, setToken] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSearch = () => {
    setSearchKey(searchKey.trim());
  };

  useEffect(() => {
    setToken(sessionStorage.getItem('token'));
  });

  return (
    <Box sx={{ backgroundColor: '#003F62', width: '100%', maxWidth: '1528px', minHeight: { xs: '76px', sm: '88px', md: '100px' }, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', px: { xs: 2, sm: 3, md: '40px' }, gap: { xs: 1.5, sm: 2, md: '316px' }, boxSizing: 'border-box' }}>

      <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', maxWidth: '663px', minWidth: 0, height: '56px', gap: { xs: 0, md: '85px' }, alignItems: 'center', flex: 1 }}>        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', maxWidth: '438px', minWidth: 0, height: { xs: '42px', sm: '48px', md: '50px' }, borderRadius: '20px', pl: { xs: '12px', sm: '20px' }, gap: '8px', backgroundColor: '#fff', overflow: 'hidden', boxSizing: 'border-box' }}>
        <TextField value={searchKey} onChange={(e) => setSearchKey(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }} placeholder="Search any things" variant="standard" fullWidth InputProps={{ disableUnderline: true }} sx={{ display: 'flex', flexDirection: 'row', flex: 1, minWidth: 0, '& input': { fontFamily: 'Poppins', fontSize: { xs: '11px', sm: '13px', md: '14px' }, border: 'none', outline: 'none' } }} />
        <Button onClick={handleSearch} sx={{ height: '100%', minWidth: { xs: '65px', sm: '85px', md: '100px' }, px: { xs: 1, sm: 1.5 }, flexShrink: 0, borderRadius: '20px', backgroundColor: '#F9A602', color: '#fff', fontFamily: 'Poppins', fontSize: { xs: '10px', sm: '12px', md: '13px' }, fontWeight: 600, '&:hover': { backgroundColor: '#e99500' } }}>SEARCH</Button>
      </Box>
      </Box>
      <Box sx={{ display: { xs: 'none', md: 'flex' }, flexDirection: 'row', alignItems: 'center', width: '100%', maxWidth: '213.42px', height: '24px', gap: { xs: '12px', sm: '20px', md: '29px' }, flexShrink: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Wishlist color={'#FFFFFF'} />
          <Box sx={{ width: '14.21px', height: '15px', borderRadius: '394.74px', py: '7.89px', backgroundColor: '#EDA415', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>

            <Typography sx={{ width: '6px', height: '14px', fontFamily: 'Poppins', fontWeight: 400, fontStyle: 'normal', fontSize: '9.47px', lineHeight: '100%', letterSpacing: '0%', color: '#FFFFFF' }}>0</Typography> </Box>        </Box>
        {token ? '' : <Link to="/signin" style={{ textDecoration: 'none' }}>
          <Typography sx={{ fontFamily: 'Poppins', fontWeight: 400, fontSize: '14px', lineHeight: '100%', color: '#FFFFFF', whiteSpace: 'nowrap' }}>Sign in</Typography>
        </Link>}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ShoppingCartOutlinedIcon sx={{ width: '24px', height: '24px', color: '#FFFFFF' }} />
          <Box sx={{ width: '14.21px', height: '15px', borderRadius: '394.74px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, backgroundColor: '#EDA415', textAlign: 'center' }}> <Typography sx={{ width: '14.21px', height: '15px', fontFamily: 'Poppins', fontWeight: 400, fontStyle: 'normal', fontSize: '9.47px', lineHeight: '100%', letterSpacing: '0%', color: '#FFFFFF' }}>0</Typography> </Box>
          <Typography sx={{ fontFamily: 'Poppins', fontWeight: 400, fontSize: '14px', lineHeight: '100%', color: '#FFFFFF', whiteSpace: 'nowrap' }}>Cart</Typography>
        </Box>
      </Box>

      <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', flexShrink: 0 }}>
        <IconButton onClick={handleMenuOpen} aria-label="Open navigation menu" sx={{ color: '#ffffff', p: { xs: 0.5, sm: 1 } }}>
          <MenuIcon sx={{ fontSize: { xs: '25px', sm: '30px' } }} />
        </IconButton>
        <Menu id="header-menu" anchorEl={anchorEl} open={open} onClose={handleMenuClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
          <MenuItem><Wishlist color={'black'} />Wishlist</MenuItem>
          <MenuItem component={Link} to="/signin" onClick={handleMenuClose}>Sign in</MenuItem>
          <MenuItem onClick={handleMenuClose}><ShoppingCartOutlinedIcon sx={{ mr: 1 }} />Cart</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
}

export default Header;