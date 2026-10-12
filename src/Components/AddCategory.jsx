import React, { useEffect } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Button, TextField } from '@mui/material';
import { useState } from 'react';
import { addCategoryAPI } from '../services/allAPI';

function AddCategory() {

  const [open, setOpen] = useState(false);
  const [token, setToken] = useState('');
  const [formData, setForm] = useState({ category: '' });

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const addCategory = async () => {
    const reqHeader = {
      Authorization: `Bearer ${token}`
    }
    try {
      const response = await addCategoryAPI(formData, reqHeader);
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

  useEffect(() => {
    setToken(sessionStorage.getItem('token'));
  }, []);

  return (
    <div>
      <Button onClick={handleOpen} sx={{ width: { xs: '100%', sm: '146px' }, maxWidth: '146px', height: { xs: '36px', sm: '56px' }, borderRadius: '20px', backgroundColor: '#EDA415', fontFamily: 'Poppins', fontWeight: 600, fontSize: { xs: '10px', sm: '14px' }, color: '#FFFFFF', whiteSpace: 'nowrap' }}>Add category</Button>
      <Dialog onClose={handleClose} open={open} fullWidth maxWidth="sm" sx={{ '& .MuiDialog-paper': { width: { xs: '90%', sm: '496px' }, maxWidth: '496px', minHeight: '326px', height: 'auto', borderRadius: '20px', } }}>
        <Box sx={{ width: '100%', minHeight: '326px', p: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '16px' }}>
          <DialogTitle sx={{ width: '100%', height: '72px', boxSizing: 'border-box', fontFamily: 'Montserrat', fontWeight: 600, fontSize: { xs: '21px', sm: '23.73px' }, textAlign: 'center', color: '#3C3C3C' }}>Add Category</DialogTitle>
          <TextField value={formData.category} onChange={(e) => setForm({ ...formData, category: e.target.value })} label="Category Name" variant="outlined" sx={{ width: '90%', maxWidth: '390.39px', '& .MuiOutlinedInput-root': { height: '70.01px', borderRadius: '14.84px', }, '& .MuiOutlinedInput-notchedOutline': { borderWidth: '1.85px', borderColor: '#3C3C3C' } }} />
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: '16px', width: '90%', maxWidth: '250.37px', height: '52.71px', mt: '4px' }}>
            <Button onClick={addCategory} sx={{ flex: 1, minWidth: 0, height: '52.71px', borderRadius: '9.31px', backgroundColor: '#EDA415', fontFamily: 'Montserrat', fontWeight: 500, fontSize: { xs: '18px', sm: '22.25px' }, color: '#FFFFFF' }}>Add</Button>
            <Button onClick={handleClose} sx={{ flex: 1, minWidth: 0, height: '52.71px', borderRadius: '9.31px', backgroundColor: '#EEEEEE', fontFamily: 'Montserrat', fontWeight: 500, fontSize: { xs: '12px', sm: '14px' }, color: '#3C3C3C' }}>DISCARD</Button>
          </Box>
        </Box>
      </Dialog>
    </div>
  )
}

export default AddCategory