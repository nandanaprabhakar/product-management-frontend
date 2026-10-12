import React, { useState } from 'react'
import { Box, Button, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import { useNavigate } from 'react-router-dom';
import { loginAPI } from '../services/allAPI';

function Login() {

  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' })
  const navigate = useNavigate();

  const handleSignIn = async () => {
    console.log(formData);
    const { email, password } = formData;
    if (!email || !password) {
      alert('Please fill the form');
    }
    else {
      try {
        const response = await loginAPI(formData);
        console.log(response);
        if (response.status == 200) {
          sessionStorage.setItem('token', response.data.token);
          alert(response.data.message);
          navigate('/home');
        }
        else if (response.status == 401) {
          alert(response.response.data);
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
      <Box sx={{ width: '100%', maxWidth: '1619px', height: { xs: 'auto', sm: 'auto', md: '1023.68px' }, minHeight: { xs: '100vh', sm: '100vh', md: '1023.68px' }, mx: 'auto', overflow: 'hidden', display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr', md: '942.403px 676.597px', }, }}>
        <Box sx={{ width: { xs: '100%', sm: '100%', md: '942.403px' }, height: { xs: '650px', sm: '700px', md: '1023.68px' }, backgroundColor: '#FFFFFF', position: 'relative' }}>
          <Typography sx={{ position: 'absolute', width: { xs: '90%', sm: '404px', md: '404px' }, height: 'auto', top: { xs: '70px', sm: '100px', md: '298.77px' }, left: { xs: '5%', sm: '50%', md: '300px' }, transform: { xs: 'none', sm: 'translateX(-50%)', md: 'none' }, color: '#EDA415', fontFamily: '"Montserrat", sans-serif', fontWeight: 700, fontSize: { xs: '32px', sm: '42px', md: '57.12px' }, letterSpacing: 0, lineHeight: '100%', textAlign: 'center' }}> Sign In to <br /> Your Account</Typography>
          <TextField onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="Email" variant="outlined" sx={{ position: 'absolute', top: { xs: '200px', sm: '250px', md: '478.68px' }, left: { xs: '5%', sm: '50%', md: '236px' }, transform: { xs: 'none', sm: 'translateX(-50%)', md: 'none' }, width: { xs: '90%', sm: '75%', md: '531.61px' }, height: '79.08px', backgroundColor: '#F4F8F5', '& fieldset': { border: 'none' } }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <MailOutlinedIcon
                      sx={{
                        width: '35.15px',
                        height: '35.15px',
                        color: '#9A9A9A',
                      }}
                    />
                  </InputAdornment>
                ),
              },
            }}
          />
          <TextField onChange={(e) => setFormData({ ...formData, password: e.target.value })} type={visible ? 'text' : 'password'} placeholder="Password" variant="outlined"
            sx={{ position: 'absolute', top: { xs: '300px', sm: '350px', md: '584.33px' }, left: { xs: '5%', sm: '50%', md: '236px' }, transform: { xs: 'none', sm: 'translateX(-50%)', md: 'none' }, width: { xs: '90%', sm: '75%', md: '531.61px' }, height: '79.08px', backgroundColor: '#F4F8F5', '& fieldset': { border: 'none' }, }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Box
                      onClick={() => setVisible(!visible)}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        cursor: 'pointer',
                      }}
                    >
                      {visible ? (
                        <LockOutlinedIcon
                          sx={{
                            width: '35.15px',
                            height: '35.15px',
                            color: '#9A9A9A',
                          }}
                        />
                      ) : (
                        <LockOpenOutlinedIcon
                          sx={{
                            width: '35.15px',
                            height: '35.15px',
                            color: '#9A9A9A',
                          }}
                        />
                      )}
                    </Box>
                  </InputAdornment>
                ),
              },
            }}
          />
          <Typography sx={{ position: 'absolute', top: { xs: '405px', sm: '455px', md: '698.56px' }, left: { xs: '50%', sm: '50%', md: '401px' }, transform: { xs: 'translateX(-50%)', sm: 'translateX(-50%)', md: 'none' }, width: '202px', fontFamily: '"Montserrat", sans-serif', fontSize: { xs: '16px', sm: '18px', md: '21.97px' }, fontWeight: 700, lineHeight: '140%', textAlign: 'center', textDecoration: 'underline', color: '#373737', cursor: 'pointer', whiteSpace: 'nowrap' }}> Forgot password?</Typography>
          <Button onClick={handleSignIn} variant="contained" sx={{ position: 'absolute', top: { xs: '460px', sm: '510px', md: '764.47px' }, left: { xs: '50%', sm: '50%', md: '329px' }, transform: { xs: 'translateX(-50%)', sm: 'translateX(-50%)', md: 'none' }, width: { xs: '80%', sm: '347.09px', md: '347.09px' }, height: '85.67px', borderRadius: '43.93px', backgroundColor: '#EDA415', fontFamily: '"Montserrat", sans-serif', fontSize: { xs: '16px', sm: '18px', md: '20px' } }}>SIGN IN</Button>
        </Box>
        <Box sx={{ width: { xs: '100%', sm: '100%', md: '674.4px' }, height: { xs: '350px', sm: '400px', md: '1023.68px' }, backgroundColor: '#003F62', position: 'relative', left: { xs: 0, sm: 0, md: '-2.2px' }, }}>
          <Typography sx={{ position: 'absolute', width: { xs: '90%', sm: '380px', md: '380px' }, height: '70px', top: { xs: '65px', sm: '80px', md: '298.77px' }, left: { xs: '5%', sm: '50%', md: '44.37px' }, transform: { xs: 'none', sm: 'translateX(-50%)', md: 'none' }, color: '#FFFFFF', fontFamily: '"Montserrat", sans-serif', fontWeight: 700, fontSize: { xs: '36px', sm: '46px', md: '57.12px' }, lineHeight: '100%', textAlign: 'center', whiteSpace: 'nowrap' }}>Hello Friend!</Typography>
          <Typography sx={{ position: 'absolute', top: { xs: '145px', sm: '170px', md: '410.68px' }, left: { xs: '5%', sm: '50%', md: '15.82px' }, transform: { xs: 'none', sm: 'translateX(-50%)', md: 'none' }, width: { xs: '90%', sm: '434.96px', md: '434.96px' }, height: '74px', color: '#FFFFFF', fontFamily: '"Montserrat", sans-serif', fontWeight: 400, fontSize: { xs: '18px', sm: '22px', md: '26.36px' }, lineHeight: '140%', textAlign: 'center' }}>Enter your personal details and <br /> start your journey with us</Typography>
          <Button variant="outlined" sx={{ position: 'absolute', top: { xs: '240px', sm: '270px', md: '584.33px' }, left: { xs: '50%', sm: '50%', md: '57.80px' }, transform: { xs: 'translateX(-50%)', sm: 'translateX(-50%)', md: 'none', }, width: { xs: '80%', sm: '347.09px', md: '347.09px' }, height: '85.67px', borderRadius: '43.93px', border: '2.2px solid #FFFFFF', color: '#FFFFFF', fontFamily: '"Montserrat", sans-serif', fontWeight: 600, fontSize: { xs: '18px', sm: '20px', md: '21.97px' }, lineHeight: '100%', }}>SIGN UP</Button>
        </Box>
      </Box>
    </div>
  )
}

export default Login