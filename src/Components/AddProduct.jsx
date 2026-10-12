import React from 'react'
import Dialog from '@mui/material/Dialog';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { addProductAPI } from '../services/allAPI';
import { useEffect } from 'react';

function AddProduct({ item }) {

  const [token, setToken] = useState('')
  const [formData, setFormData] = useState({ productname: '', variants: [{ ram: '', price: '', qty: '' }, { ram: '', price: '', qty: '' },], category: '', subCategory: '', images: [] });
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  }

  const handleVariantChange = (index, e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      variants: formData.variants.map((item, i) =>
        i === index ? { ...item, [name]: value } : item
      )
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (formData.images.length + files.length > 3) {
      alert('You can upload only 3 images');
      e.target.value = '';
      return;
    }

    setFormData({
      ...formData,
      images: [...formData.images, ...files]
    });

    e.target.value = '';
  };

  const addProduct = async () => {
    const { productname, category, subCategory, images, variants } = formData;
    if (!productname || !category || !subCategory || images.length === 0 || variants.some(item => !item.ram || !item.price || !item.qty)) {
      alert('Please fill the form');
    }
    else {
      const data = new FormData();
      data.append('productname', productname);
      data.append('category', category);
      data.append('subCategory', subCategory);
      images.forEach((image) => {
        data.append('images', image);
      });
      data.append('variants', JSON.stringify(
        variants.map(item => ({
          ram: Number(item.ram),
          price: Number(item.price),
          qty: Number(item.qty)
        }))
      ));
      try {
        const reqHeader = {
          Authorization: `Bearer ${token}`
        };
        const response = await addProductAPI(data, reqHeader);
        console.log(response.data);
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

  useEffect(() => {
    setToken(sessionStorage.getItem('token'));
  }, []);
  return (
    <div>
      <Button onClick={handleOpen} sx={{ width: '100%', maxWidth: '132px', height: { xs: '36px', sm: '56px' }, borderRadius: '20px', gap: '10px', backgroundColor: '#EDA415', fontFamily: 'Poppins', fontWeight: 600, fontSize: { xs: '10px', sm: '14px' }, lineHeight: '100%', letterSpacing: '0%', color: '#FFFFFF' }}>Add product</Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" sx={{ '& .MuiDialog-paper': { width: '100%', maxWidth: '600px', borderRadius: '8px', p: 2 } }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography sx={{ textAlign: 'center', fontWeight: 600 }}>Add Product</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography sx={{ width: '90px', color: '#A7A7A7', fontSize: '13px' }}> Title :</Typography>
            <TextField value={formData.productname} onChange={(e) => setFormData({ ...formData, productname: e.target.value })} size="small" fullWidth placeholder="Enter product title" />
          </Box>
          <Box>
            <Typography sx={{ color: '#A7A7A7', fontSize: '13px', mb: 1 }}>Variants :</Typography>
            {formData.variants.map((variant, index) => (
              <Box key={index} sx={{ display: 'flex', gap: 1, mt: 1 }}>
                <TextField size='small' name='ram' value={variant.ram} onChange={(e) => handleVariantChange(index, e)} label="RAM" />
                <TextField size='small' name="price" value={variant.price} onChange={(e) => handleVariantChange(index, e)} label="Price" />
                <TextField size='small' name="qty" value={variant.qty} onChange={(e) => handleVariantChange(index, e)} label="Quantity" />
              </Box>
            ))}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button onClick={() => setFormData({ ...formData, variants: [...formData.variants, { ram: '', price: '', qty: '' }] })} size="small" sx={{ bgcolor: '#3C3C3C', color: '#FFFFFF', textTransform: 'none', mt: 1 }}> Add variants </Button>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography sx={{ width: '90px', color: '#A7A7A7', fontSize: '13px', whiteSpace: 'nowrap' }}>Sub category :</Typography>
            <TextField value={formData.subCategory} onChange={(e) => setFormData({ ...formData, subCategory: e.target.value })} size="small" fullWidth placeholder="Enter product description" />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography sx={{ width: '90px', color: '#A7A7A7', fontSize: '13px' }}>Category : </Typography>
            <TextField value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} size="small" fullWidth placeholder="Enter product description" />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography sx={{ width: '90px', color: '#A7A7A7', fontSize: '13px' }}>Upload image:</Typography>
            <Button component="label" variant="outlined" sx={{ width: '60px', height: '45px', minWidth: '60px', borderStyle: 'dashed', color: '#A7A7A7', }}>+
              <input type="file" hidden accept="image/*" multiple onChange={handleImageChange} />
            </Button>
            {formData.images.map((image, index) => (
              <Box key={index}>
                <img src={URL.createObjectURL(image)} alt="Product" style={{ width: '60px', height: '45px', objectFit: 'cover', borderRadius: '4px' }} />
              </Box>
            ))}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            <Button onClick={addProduct} sx={{ bgcolor: '#EDA415', color: '#FFFFFF', }}>ADD</Button>
            <Button onClick={handleClose} sx={{ bgcolor: '#EEEEEE', color: '#3C3C3C' }}>DISCARD</Button>
          </Box>
        </Box>
      </Dialog>
    </div>
  )
}

export default AddProduct