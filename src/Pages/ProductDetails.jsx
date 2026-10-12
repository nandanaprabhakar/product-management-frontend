import { Box, Button, Dialog, DialogTitle, TextField, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import Header from '../Components/Header'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import h from '../assets/h.png'
import { useState } from 'react';
import DoneIcon from '@mui/icons-material/Done';
import FavoriteBorderSharpIcon from '@mui/icons-material/FavoriteBorderSharp';
import { addWishlistAPI, updateProductAPI, viewProductDetailsAPI } from '../services/allAPI';
import { useParams } from 'react-router-dom';
function ProductDetails() {

  const [token, setToken] = useState('');
  const [product, setProduct] = useState({});
  const [variant, setVariant] = useState(0);
  const { id } = useParams();
  const [editFormData, setEditFormData] = useState({ category: '', subCategory: '', productname: '', price: '', qty: '', ram: '' });

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  }

  const viewProductDetails = async () => {
    const reqHeader = {
      Authorization: `Bearer ${token}`
    }

    try {
      const response = await viewProductDetailsAPI(id, reqHeader);
      console.log(response);
      setProduct(response.data);
    }
    catch (err) {
      console.log(err);
    }
  }

  const updateProduct = async () => {
    const reqHeader = {
      Authorization: `Bearer ${token}`
    }
    try {
      const reqBody = new FormData();
      for (let key in editFormData) {
        reqBody.append(key, editFormData[key]);
      }
      const response = await updateProductAPI(product._id, reqBody, reqHeader);
      console.log(response.data);
      if (response.status == 200) {
        alert(response.data.message);
        console.log(response.data);

        handleClose();
        viewProductDetails();
      }
      else {
        alert(response.response.data);
      }
    }
    catch (err) {
      console.log(err);
    }
  }

  const addWishlist = async (producId) => {
      const reqHeader = {
        Authorization: `Bearer ${token}`
      }
      try {
        const response = await addWishlistAPI(producId, reqHeader);
        console.log(response.data);
        if(response.status == 201){
          alert(response.data.message);
        }
        else{
          alert(response.response.data);
        }
      }
      catch (err) {
        console.log(err);
      }
    }

  useEffect(() => {
    setToken(sessionStorage.getItem('token'));
    viewProductDetails();
  }, [token, id]);
  return (
    <div>
      <Box sx={{ width: '100%', maxWidth: '1528px', height: '1193', backgroundColor: '#FFFFFF', position: 'relative' }}>
        <Header />
        {/* <Box> */}
        {/* <Box sx={{ display: 'flex', flexDirection: 'row', width: '264px', height: '24px', position: 'absolute', top: '196px', left: '63px', gap: '14px' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', width: '88px', height: '24px', gap: '16px' }}>
              <Typography sx={{ width: '48px', height: '24px', fontFamily: 'Poppins', fontWeight: 500, fontSize: '16px', lineHeight: '100%', letterSpacing: '0%', color: '#3A3A3A' }}>Home</Typography>
              <KeyboardArrowDownIcon onClick={handleClick} sx={{ width: '24px', height: '24px', color: '#292D32', transform: open ? 'rotate(0deg)' : 'rotate(-90deg)', transition: 'transform 0.3s ease-in-out', }} />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', width: '162px', height: '24px', gap: '16px' }}>
              <Typography sx={{ width: '122px', height: '24px', fontFamily: 'Poppins', fontWeight: 500, fontSize: '16px', lineHeight: '100%', letterSpacing: '0%', color: '#3A3A3A' }}>Product details</Typography>
              <KeyboardArrowDownIcon onClick={handleClick} sx={{ width: '24px', height: '24px', color: '#292D32', transform: open ? 'rotate(0deg)' : 'rotate(-90deg)', transition: 'transform 0.3s ease-in-out', }} />
            </Box>
          </Box> */}
        <Box sx={{ width: { xs: '90%', sm: '80%', md: '647px' }, maxWidth: '647px', height: { xs: '280px', sm: '380px', md: '561px' }, position: { xs: 'relative', md: 'absolute' }, top: { xs: 'auto', md: '268px' }, left: { xs: 'auto', md: '63px' }, mx: { xs: '16px', sm: '24px', md: 0 }, borderRadius: '20px', border: '1px solid #ACACAC', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Box component='img' src={`https://product-management-backend-23i3.onrender.com/uploads/${encodeURIComponent(product?.UploadedImages?.[0])}`} sx={{ width: '100%', maxWidth: '592px', height: { xs: '270px', sm: '380px', md: '353px' }, objectFit: 'contain' }} />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Box sx={{ width: '100%', maxWidth: '310px', height: { xs: '120px', sm: '140px', md: '157px', }, position: { xs: 'relative', md: 'absolute' }, top: { xs: 'auto', md: '854px' }, left: { xs: 'auto', md: '63px' }, borderRadius: '20px', border: '1px solid #C0C0C0', mt: { xs: '16px', md: 0 }, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Box component='img' src={`https://product-management-backend-23i3.onrender.com/uploads/${encodeURIComponent(product?.UploadedImages?.[1])}`} sx={{ width: '100%', maxWidth: '244px', height: { xs: '110px', sm: '135px', md: '145px' }, objectFit: 'contain' }} />
          </Box>
          <Box sx={{ width: '100%', maxWidth: '310px', height: { xs: '120px', sm: '140px', md: '157px', }, position: { xs: 'relative', md: 'absolute' }, top: { xs: 'auto', md: '854px' }, left: { xs: 'auto', md: '392px' }, borderRadius: '20px', border: '1px solid #C0C0C0', mt: { xs: '16px', md: 0 }, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Box component='img' src={`https://product-management-backend-23i3.onrender.com/uploads/${encodeURIComponent(product?.UploadedImages?.[0])}`} sx={{ width: '100%', maxWidth: '244px', height: { xs: '110px', sm: '135px', md: '145px' }, objectFit: 'contain' }} />
          </Box>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '300px', height: '184px', position: { xs: 'relative', md: 'absolute' }, top: { xs: 'auto', md: '275px' }, left: { xs: 'auto', md: '759px' }, mx: { xs: '16px', md: 0 }, mt: { xs: '24px', md: 0 }, gap: '16px' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '238px', height: '101px', gap: '19.63px' }}>
            <Typography sx={{ width: '238px', height: '45px', fontFamily: 'Poppins', fontWeight: 500, fontSize: '30px', lineHeight: '100%', letterSpacing: '0%', color: '#003F62' }}>{product?.productname}</Typography>
            <Typography sx={{ width: '238px', height: '45px', fontFamily: 'Poppins', fontWeight: 600, fontSize: '29.68px', lineHeight: '100%', letterSpacing: '0%', color: '#4A4A4A' }}>$ {product?.variants?.[variant]?.price}</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', width: '230.88px', height: '27px', gap: '19.08px' }}>
            <Typography sx={{ width: '106px', height: '27px', fontFamily: 'Poppins', fontWeight: 500, fontSize: '18.17pxpx', lineHeight: '100%', letterSpacing: '0%', color: '#232323' }}>Availability:</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', width: '105.8px', height: '27px', gap: '14.59px' }}>
              <DoneIcon sx={{ width: '20.2px', height: '13.47px', color: '#30BD57' }} />
              <Typography sx={{ width: '106px', height: '27px', fontFamily: 'Poppins', fontWeight: 500, fontSize: '18.17pxpx', lineHeight: '100%', letterSpacing: '0%', color: '#30BD57' }}>In stock</Typography>
            </Box>
          </Box>
          <Typography sx={{ width: '300px', height: '24px', fontFamily: 'Poppins', fontWeight: 400, fontSize: '15.93pxpx', lineHeight: '100%', letterSpacing: '0%', color: '#5D5D5D' }}>Hurry up! only {product?.variants?.[variant]?.qty} product left in stock!</Typography>

        </Box>
        <Box sx={{ width: '100%', maxWidth: '618px', height: '0px', position: { xs: 'relative', md: 'absolute' }, top: { xs: 'auto', md: '509px' }, left: { xs: 'auto', md: '759px' }, mx: { xs: '16px', md: 0 }, mt: { xs: '24px', md: 0 }, display: 'flex', flexDirection: 'column', justifyContent: 'center', borderTop: '1px solid #BDBDBD' }}></Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', maxWidth: '294.24px', height: '32px', position: { xs: 'relative', md: 'absolute' }, top: { xs: 'auto', md: '572px' }, left: { xs: 'auto', md: '759px' }, gap: { xs: '10px', md: '19.08px' }, mx: { xs: '16px', md: 0 }, mt: { xs: '24px', md: 0 }, }}>
          <Typography sx={{ width: '48px', height: '27px', fontFamily: 'Poppins', fontWeight: 500, fontSize: '18.17pxpx', lineHeight: '100%', letterSpacing: '0%', color: '#232323' }}>Ram:</Typography>
          {product?.variants?.map((item, index) => (
            <Typography key={item?._id} onClick={() => setVariant(index)} sx={{ width: '49px', height: '27px', fontFamily: 'Poppins', fontWeight: 500, fontSize: '18.17pxpx', lineHeight: '100%', letterSpacing: '0%', color: '#434343', }}>{item?.ram} GB</Typography>
          ))}
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', maxWidth: '241.08px', height: '32px', position: { xs: 'relative', md: 'absolute' }, top: { xs: 'auto', md: '630px' }, left: { xs: 'auto', md: '759px' }, mx: { xs: '16px', md: 0 }, mt: { xs: '24px', md: 0 }, gap: '19.08px' }}>
          <Typography sx={{ width: '89px', height: '27px', fontFamily: 'Poppins', fontWeight: 500, fontSize: '18.17px', lineHeight: '100%', letterSpacing: '0%', color: '#232323', }}>Quantity :</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', width: '133px', height: '32px' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '35px', height: '32px', border: '1px solid #BDBDBD', backgroundColor: '#EEEEEE', gap: '10px' }}>
              <Typography sx={{ width: '11px', height: '27px', fontFamily: 'Poppins', fontWeight: 500, fontSize: '18.17px', lineHeight: '100%', letterSpacing: '0%', color: '#434343' }}>-</Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '63px', height: '32px', border: '1px solid #BDBDBD', backgroundColor: '#EEEEEE', gap: '10px' }}>
              <Typography sx={{ width: '7px', height: '27px', fontFamily: 'Poppins', fontWeight: 500, fontSize: '18.17pxpx', lineHeight: '100%', letterSpacing: '0%', color: '#434343' }}>1</Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '35px', height: '32px', border: '1px solid #BDBDBD', backgroundColor: '#EEEEEE', gap: '10px' }}>
              <Typography sx={{ width: '13px', height: '27px', fontFamily: 'Poppins', fontWeight: 500, fontSize: '18.17pxpx', lineHeight: '100%', letterSpacing: '0%', color: '#434343' }}>+</Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: { xs: 'flex-start', md: 'space-between' }, alignItems: { xs: 'stretch', md: 'center' }, width: '100%', maxWidth: '614px', height: '73px', position: { xs: 'relative', md: 'absolute' }, top: { xs: 'auto', md: '702px' }, left: { xs: 'auto', md: '759px' }, mx: { xs: '16px', md: 0 }, mt: { xs: '24px', md: 0 }, gap: '29px' }}>
          <Button onClick={() => { setEditFormData({ productname: product.productname || '', price: product.variants?.[variant]?.price || '', qty: product.variants?.[variant]?.qty || '', ram: product.variants?.[variant]?.ram || '', image: product?.image || '' }); setOpen(true); }} sx={{ display: 'flex', flexDirection: 'row', width: '241px', height: '73px', borderRadius: '32.42px', gap: '16.21px', backgroundColor: '#EDA415', fontFamily: 'Poppins', fontWeight: 600, fontSize: { xs: '18px', md: '22.7px' }, lineHeight: '100%', letterSpacing: '0%', color: '#FFFFFF' }}>Edit product</Button>
          <Button sx={{ display: 'flex', flexDirection: 'row', width: '241px', height: '73px', borderRadius: '32.42px', gap: '16.21px', backgroundColor: '#EDA415', fontFamily: 'Poppins', fontWeight: 600, fontSize: { xs: '18px', md: '22.7px' }, lineHeight: '100%', letterSpacing: '0%', color: '#FFFFFF' }}>Buy it now</Button>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', lignSelf: { xs: 'center', md: 'auto' }, width: '74px', height: '73px', borderRadius: '500px', gap: '16.21px', backgroundColor: '#EEEEEE' }}>
            <FavoriteBorderSharpIcon onClick={(e)=>addWishlist(product?._id)} sx={{ width: '36px', height: '36px', color: '#292D32' }} />
          </Box>
        </Box>
      </Box>
      <Dialog onClose={handleClose} open={open} fullWidth maxWidth="sm" sx={{ '& .MuiDialog-paper': { width: '100%', maxWidth: { xs: '80%', sm: '496px' }, maxHeight: '90vh', borderRadius: { xs: '14px', sm: '20px' }, m: { xs: 1, sm: 2 }} }}>
        <Box sx={{ width: '100%', p: { xs: 2, sm: 3 }, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: { xs: 1.5, sm: 2 }, overflowY: 'auto' }}>
          <DialogTitle sx={{ width: '100%', p: 0, mb: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'Montserrat', fontWeight: 600, fontSize: { xs: '20px', sm: '23.73px' }, textAlign: 'center', color: '#3C3C3C' }}>Edit Product</DialogTitle>
          <TextField
            value={editFormData.productname}
            onChange={(e) =>
              setEditFormData({ ...editFormData, productname: e.target.value })
            }
            label="Enter product name"
            variant="outlined"
            fullWidth
            sx={{
              maxWidth: '390px',
              '& .MuiOutlinedInput-root': {
                minHeight: { xs: '50px', sm: '60px' },
                borderRadius: '12px'
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderWidth: '1.5px',
                borderColor: '#3C3C3C'
              }
            }}
          />
          <TextField
            value={editFormData.ram}
            onChange={(e) =>
              setEditFormData({ ...editFormData, ram: e.target.value })
            }
            label="RAM (GB)"
            type="number"
            fullWidth
            sx={{
              maxWidth: '390px',
              '& .MuiOutlinedInput-root': {
                minHeight: { xs: '50px', sm: '60px' },
                borderRadius: '12px'
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderWidth: '1.5px',
                borderColor: '#3C3C3C'
              }
            }}
          />

          <TextField
            value={editFormData.price}
            onChange={(e) =>
              setEditFormData({ ...editFormData, price: e.target.value })
            }
            label="Enter price"
            type="number"
            fullWidth
            sx={{
              maxWidth: '390px',
              '& .MuiOutlinedInput-root': {
                minHeight: { xs: '50px', sm: '60px' },
                borderRadius: '12px'
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderWidth: '1.5px',
                borderColor: '#3C3C3C'
              }
            }}
          />

          <TextField
            value={editFormData.qty}
            onChange={(e) =>
              setEditFormData({ ...editFormData, qty: e.target.value })
            }
            label="Enter quantity"
            type="number"
            fullWidth
            sx={{
              maxWidth: '390px',
              '& .MuiOutlinedInput-root': {
                minHeight: { xs: '50px', sm: '60px' },
                borderRadius: '12px'
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderWidth: '1.5px',
                borderColor: '#3C3C3C'
              }
            }}
          />

          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'center',
              gap: 1.5,
              width: '100%',
              maxWidth: '390px',
              mt: 1
            }}
          >
            <Button
              onClick={updateProduct}
              fullWidth
              sx={{
                flex: 1,
                minHeight: { xs: '44px', sm: '48px' },
                borderRadius: '9px',
                backgroundColor: '#EDA415',
                fontFamily: 'Montserrat',
                fontWeight: 500,
                fontSize: { xs: '15px', sm: '18px' },
                color: '#FFFFFF',
                '&:hover': { backgroundColor: '#d99410' }
              }}
            >
              Update
            </Button>

            <Button
              onClick={handleClose}
              fullWidth
              sx={{
                flex: 1,
                minHeight: { xs: '44px', sm: '48px' },
                borderRadius: '9px',
                backgroundColor: '#EEEEEE',
                fontFamily: 'Montserrat',
                fontWeight: 500,
                fontSize: { xs: '14px', sm: '16px' },
                color: '#3C3C3C',
                '&:hover': { backgroundColor: '#dddddd' }
              }}
            >
              DISCARD
            </Button>
          </Box>
        </Box>
      </Dialog>
    </div>
  )
}

export default ProductDetails