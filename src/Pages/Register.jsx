import React, { useState } from 'react'
import { Box, Button, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import { useNavigate } from 'react-router-dom';
import { registerAPI } from '../services/allAPI';

function Register() {

  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' })
  const navigate = useNavigate();

  const handleSignUP = async () => {
    console.log(formData);
    const { username, email, password } = formData;
    if (!username || !email || !password) {
      alert('Please fill the form');
    }
    else {
      try {
        const response = await registerAPI(formData);
        console.log(response);
        if (response.status == 200) {
          alert(response.data.message);
        }
        else {
          alert(response.response.data);
        }
      }
      catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <div>
      <Box sx={{ width: '100%', maxWidth: '1609.52px', height: { xs: 'auto', sm: 'auto', md: '1017.69px' }, mx: 'auto', overflow: { xs: 'visible', sm: 'visible', md: 'hidden' }, display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr', md: '672.64px 936.89px' } }}>
        <Box sx={{ width: '100%', maxWidth: { xs: '100%', sm: '100%', md: '672.64px' }, height: { xs: '300px', sm: '400px', md: '1017.69px' }, backgroundColor: '#003F62', position: 'relative' }}>
          <Typography sx={{ position: 'absolute', width: { xs: '90%', sm: '80%', md: '464px' }, height: 'auto', top: { xs: '70px', sm: '100px', md: '298.77px' }, left: { xs: '5%', sm: '10%', md: '59.37px' }, color: '#FFFFFF', fontFamily: '"Montserrat", sans-serif', fontWeight: 700, fontSize: { xs: '32px', sm: '42px', md: '56.78px' }, lineHeight: '100%', letterSpacing: '0%', textAlign: 'center' }}>Welcome Back!</Typography>
          <Typography sx={{ position: 'absolute', top: { xs: '130px', sm: '180px', md: '419.83px' }, left: { xs: '5%', sm: '10%', md: '59.18px' }, width: { xs: '90%', sm: '80%', md: '462.98px' }, height: 'auto', color: '#FFFFFF', fontFamily: '"Montserrat", sans-serif', fontWeight: 400, fontSize: { xs: '16px', sm: '21px', md: '26.36px' }, lineHeight: '140%', letterSpacing: '0%', textAlign: 'center' }}>To keep connected with us please<br /> login with your personal info</Typography>
          <Button variant="outlined" sx={{ position: 'absolute', top: { xs: '210px', sm: '260px', md: '584.33px' }, left: { xs: '15%', sm: '25%', md: '125.44px' }, width: { xs: '70%', sm: '50%', md: '345.05px' }, height: { xs: '50px', sm: '65px', md: '85.17px' }, borderRadius: '43.68px', border: '2.18px solid #FFFFFF', color: '#FFFFFF', fontFamily: '"Montserrat", sans-serif', fontWeight: 600, fontSize: { xs: '16px', sm: '19px', md: '21.84px' }, letterSpacing: '0%', lineHeight: '100%', '&:hover': { borderColor: '#FFFFFF', backgroundColor: 'rgba(255,255,255,0.1)' } }}>SIGN IN</Button>
        </Box>
        <Box sx={{ width: '100%', maxWidth: { xs: '100%', sm: '100%', md: '936.89px' }, height: { xs: '650px', sm: '750px', md: '1017.69px' }, backgroundColor: '#FFFFFF', position: 'relative' }}>
          <Typography sx={{ position: 'absolute', width: { xs: '90%', sm: '80%', md: '461px' }, height: 'auto', top: { xs: '45px', sm: '60px', md: '372.87px' }, left: { xs: '5%', sm: '10%', md: '238.04px' }, color: '#EDA415', fontFamily: '"Montserrat", sans-serif', fontWeight: 700, fontSize: { xs: '32px', sm: '42px', md: '56.78px' }, letterSpacing: 0, lineHeight: '100%', textAlign: 'center' }}>Create Account</Typography>
          <TextField type="text" onChange={(e) => setFormData({ ...formData, username: e.target.value })} placeholder="Name" variant="outlined" sx={{ position: 'absolute', top: { xs: '120px', sm: '150px', md: '511.03px' }, left: { xs: '5%', sm: '10%', md: '205.29px' }, width: { xs: '90%', sm: '80%', md: '528.5px' }, height: { xs: '55px', md: '78.62px' }, backgroundColor: '#F4F8F5', '& fieldset': { border: 'none' } }} slotProps={{ input: { startAdornment: (<InputAdornment position="start"><PermIdentityOutlinedIcon sx={{ width: '34.94px', height: '34.94px', color: '#9A9A9A' }} /></InputAdornment>) } }} />
          <TextField type="email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="Email" variant="outlined" sx={{ position: 'absolute', top: { xs: '195px', sm: '240px', md: '607.12px' }, left: { xs: '5%', sm: '10%', md: '205.29px' }, width: { xs: '90%', sm: '80%', md: '528.5px' }, height: { xs: '55px', md: '78.62px' }, backgroundColor: '#F4F8F5', '& fieldset': { border: 'none' } }} slotProps={{ input: { startAdornment: (<InputAdornment position="start"><MailOutlinedIcon sx={{ width: '34.94px', height: '34.94px', color: '#9A9A9A' }} /></InputAdornment>) } }} />
          <TextField onChange={(e) => setFormData({ ...formData, password: e.target.value })} type={visible ? 'text' : 'password'} placeholder="Password" variant="outlined" sx={{ position: 'absolute', top: { xs: '270px', sm: '330px', md: '703.21px' }, left: { xs: '5%', sm: '10%', md: '205.29px' }, width: { xs: '90%', sm: '80%', md: '528.5px' }, height: { xs: '55px', md: '78.62px' }, backgroundColor: '#F4F8F5', '& fieldset': { border: 'none' } }} slotProps={{ input: { startAdornment: (<InputAdornment position="start"><Box onClick={() => setVisible(!visible)} sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>{visible ? <LockOutlinedIcon sx={{ width: '34.94px', height: '39.31px', color: '#9A9A9A' }} /> : <LockOpenOutlinedIcon sx={{ width: '34.94px', height: '39.31px', color: '#9A9A9A' }} />}</Box></InputAdornment>) } }} />
          <Button onClick={handleSignUP} variant="contained" sx={{ position: 'absolute', top: { xs: '360px', sm: '430px', md: '825.51px' }, left: { xs: '15%', sm: '25%', md: '297.01px' }, width: { xs: '70%', sm: '50%', md: '345.05px' }, height: { xs: '55px', sm: '65px', md: '85.17px' }, borderRadius: '43.68px', backgroundColor: '#EDA415', fontFamily: '"Montserrat", sans-serif', fontWeight: 600, fontSize: { xs: '16px', sm: '19px', md: '21.84px' }, lineHeight: '100%', letterSpacing: '0%', '&:hover': { backgroundColor: '#D99410' } }}>SIGN UP</Button>
        </Box>
      </Box>
    </div>
  )
}

export default Register