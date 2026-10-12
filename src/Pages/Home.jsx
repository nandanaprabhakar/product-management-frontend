import React, { useContext, useEffect, useState } from 'react'
import Header from '../Components/Header'
import { Box, Button, TextField, Typography } from '@mui/material'
import FavoriteBorderSharpIcon from '@mui/icons-material/FavoriteBorderSharp';
import StarPurple500OutlinedIcon from '@mui/icons-material/StarPurple500Outlined';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Checkbox } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import AddCategory from '../Components/AddCategory';
import { addSubCategoryAPI, addWishlistAPI, filterSubCategoryAPI, getCategoryAPI, getProductAPI, getSubCategoryAPI } from '../services/allAPI';
import { Link } from 'react-router-dom';
import AddProduct from '../Components/AddProduct';
import { SearchContext } from '../context/SearchContextShare';

function Home() {

  const { searchKey } = useContext(SearchContext);

  const [token, setToken] = useState('');
  const [product, setProduct] = useState([]);
  const [open, setOpen] = React.useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [filterSubCategoryList, setFilterSubCategoryList] = useState([]);
  const [formData, setFormData] = useState({ category: '', subCategory: '' });
  const [page, setPage] = useState(1);
  
  const rowsPerPage = 6;
const totalPages = Math?.ceil(product?.length / rowsPerPage);

  const handleClick = (category) => {
    setOpen((prev) => (prev === category ? null : category));
  };

  const [dialogOpen, setDialogOpen] = useState(false);
  const handleOpen = () => {
    setDialogOpen(true);
  };
  const handleClose = () => {
    setDialogOpen(false);
  };

  const getProduct = async () => {
    const reqHeader = {
      Authorization: `Bearer ${token}`
    }
    try {
      const response = await getProductAPI(searchKey, reqHeader);
      console.log(response);
      setProduct(response.data);
      setAllProducts(response.data);
    }
    catch (err) {
      console.log(err);
      console.log('Product error:', err.response?.data || err.message);
    }
  }

  const getCategory = async () => {
    const reqHeader = {
      Authorization: `Bearer ${token}`
    }
    try {
      const response = await getCategoryAPI(reqHeader);
      console.log(response);
      setCategoryList(response.data);
    }
    catch (err) {
      console.log(err);
    }
  }

  const addSubCategory = async () => {
    const reqHeader = {
      Authorization: `Bearer ${token}`
    }
    try {
      const response = await addSubCategoryAPI(formData, reqHeader);
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

  const getSubCategory = async () => {
    const reqHeader = {
      Authorization: `Bearer ${token}`
    }
    try {
      const response = await getSubCategoryAPI(reqHeader);
      console.log(response);
      setSubCategoryList(response.data);
    }
    catch (err) {
      console.log(err);
    }
  }

  const filterSubCategory = async (subCategory) => {
    const updatedSubCategories = selectedSubCategories.includes(subCategory)
      ? selectedSubCategories.filter(item => item !== subCategory)
      : [...selectedSubCategories, subCategory];

    setSelectedSubCategories(updatedSubCategories);

    const reqHeader = {
      Authorization: `Bearer ${token}`
    };

    try {
      if (updatedSubCategories.length === 0) {
        setProduct(allProducts);
        setFilterSubCategoryList([]);
        return;
      }
      const responses = await Promise.all(updatedSubCategories.map(item => filterSubCategoryAPI(item, reqHeader)));
      const filteredProducts = responses.flatMap(response => response.data);
      const uniqueProducts = [
        ...new Map(filteredProducts.map(item => [item._id, item])).values()
      ];
      setFilterSubCategoryList(uniqueProducts);
      setProduct(uniqueProducts);
    } catch (err) {
      console.log(err);
    }
  };

  const addWishlist = async (producId) => {
    const reqHeader = {
      Authorization: `Bearer ${token}`
    }
    try {
      const response = await addWishlistAPI(producId, reqHeader);
      console.log(response.data);
      if (response.status == 201) {
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
    getProduct();
    getCategory();
    getSubCategory();
    setToken(sessionStorage.getItem('token'));
  }, [token, searchKey]);

  return (
    <div>
      <Box sx={{ width: '100%', maxWidth: '1528px', height: '1193', backgroundColor: '#FFFFFF', position: 'relative' }}>
        <Header />
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', maxWidth: '502px', height: '56px', position: { xs: 'relative', sm: 'relative', md: 'absolute' }, top: { xs: 'auto', sm: 'auto', md: '130px' }, left: { xs: 'auto', sm: '195px', md: '874px' }, borderRadius: '20px', mt: { xs: '16px', sm: '16px', md: 0 }, mb: { xs: '16px', sm: '16px', md: 0 } }}>          <AddCategory />
          <Button onClick={handleOpen} sx={{width: { xs: '100px', sm: '160px' }, maxWidth: '160px',     height: { xs: '36px', sm: '56px' }, borderRadius: '20px', gap: '10px', backgroundColor: '#EDA415', fontFamily: 'Poppins', fontWeight: 600, fontSize: { xs: '10px', sm: '14px' }, lineHeight: '100%', letterSpacing: '0%', color: '#FFFFFF' }}>Add sub category</Button>
          <AddProduct item={product} />
        </Box>
        <Box sx={{ width: '300px', position: { xs: 'relative', md: 'absolute' }, top: { xs: 'auto', md: '228px' }, left: '63px' }}>
          <Typography sx={{ width: '90px', height: '24px', fontFamily: 'Poppins', fontWeight: 500, fontSize: '16.09px', lineHeight: '100%', letterSpacing: '0%', color: '#003F62', mb: '12px' }}>Categories</Typography>
          <List component="nav" disablePadding sx={{ width: '100%' }}>
            <ListItemButton disableGutters sx={{ minHeight: '24px' }}>
              <ListItemText primary="All categories" primaryTypographyProps={{ width: '208px', height: '24px', fontFamily: 'Poppins', fontWeight: 400, fontSize: '16.09px', lineHeight: '100%', letterSpacing: '0%', color: '#222222' }} />
            </ListItemButton>
            {[...new Set(subCategoryList?.map(item => item.category))].map(category => (<>
              <ListItemButton disableGutters onClick={() => handleClick(category)} sx={{ minHeight: '24px' }}>
                <ListItemText primary={category} primaryTypographyProps={{ width: '208px', height: '24px', fontFamily: 'Poppins', fontWeight: 400, fontSize: '16.09px', color: '#222222' }} />
                {open == category ? (<ExpandMore sx={{ width: '24px', height: '24px', color: '#595959' }} />) : (<ChevronRightIcon sx={{ width: '24px', height: '24px', color: '#595959' }} />)}
              </ListItemButton>
              <Collapse in={open == category} timeout="auto" unmountOnExit>
                <List disablePadding sx={{ pl: '12px' }}>
                  {subCategoryList.filter(item => item.category === category).map(item => (
                    <ListItemButton disableGutters onClick={() => filterSubCategory(item.subCategory)}>
                      <Checkbox checked={selectedSubCategories.includes(item.subCategory)} sx={{ width: '26px', height: '26px', color: '#B3D4E5', '&.Mui-checked': { color: '#3F3F3F', border: '1.5px solid #FFFFFF' } }} />
                      <Typography sx={{ width: '65px', height: '21px', fontFamily: 'Poppins', fontSize: '14px', lineHeight: '100%', letterSpacing: '0%', color: '#222222' }}>{item?.subCategory}</Typography>
                    </ListItemButton>))}
                </List>
              </Collapse></>))}
          </List>
        </Box>
        <Box sx={{ width: { xs: 'calc(100% - 32px)', sm: 'calc(100% - 48px)', md: 'calc(100% - 420px)', }, maxWidth: '979.6px', height: 'auto', position: { xs: 'relative', md: 'absolute' }, top: { xs: 'auto', md: '228px' }, left: { xs: 'auto', md: '396px' }, mx: { xs: '16px', sm: '24px', md: 0 }, mt: { xs: '24px', md: 0 }, display: 'grid', gridTemplateColumns: { xs: 'minmax(0, 1fr)', sm: 'repeat(2, minmax(0, 1fr))', md: 'repeat(2, minmax(0, 1fr))', lg: 'repeat(3, minmax(0, 1fr))', }, gap: { xs: '16px', sm: '20px', lg: '26.56px' }, alignItems: 'start' }}>
          {product?.slice((page - 1) * rowsPerPage, page * rowsPerPage)?.map(item => (
            <Link to={`/productdetails/${item?._id}`} style={{ textDecoration: 'none' }}>
              <Box sx={{ width: '100%', maxWidth: '308.83px', height: '313.75px', display: 'flex', flexDirection: 'column', gap: '9.84px', borderRadius: '19.67px', border: '0.98px solid #B6B6B6', p: '12px' }}>
                <Box sx={{ width: '282.28px', height: '168.18px', display: 'flex', flexDirection: 'column', gap: '1.97px' }}>
                  <Button onClick={() => addWishlist(item?._id)} sx={{ cursor: 'pointer', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '27.54px', minWidth: '27.54px', height: '27.54px', position: 'relative', top: '13.77px', left: { xs: '230px', sm: '200px', md: '241.95px' }, borderRadius: '50%', p: 0, gap: '6.12px', backgroundColor: '#B3D4E5' }}>
                    <FavoriteBorderSharpIcon sx={{ width: '14.69px', height: '14.69px', color: '#292D32' }} onClick={() => addWishlist(item?._id)} />
                  </Button>
                  <Box component="img" src={`https://product-management-backend-23i3.onrender.com/uploads/${encodeURIComponent(item.UploadedImages[0])}`} sx={{ width: '100%', height: '100%', objectFit: 'contain', border: 'none', outline: 'none', boxShadow: 'none', display: 'block' }} />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', width: '136px', height: '98.12px', gap: '15.74px' }}>
                  <Typography sx={{ width: '136px', height: '26px', fontFamily: 'Poppins', fontWeight: 500, fontSize: '17.09px', lineHeight: '100%', letterSpacing: '0%', color: '#003F62' }}>{item?.productname?.slice(0,23)}</Typography>
                  <Typography sx={{ width: '69px', height: '26px', fontFamily: 'Poppins', fontWeight: 600, fontSize: '17.09px', lineHeight: '100%', letterSpacing: '0%', color: '#4A4A4A' }}>${item?.variants?.[0]?.price}</Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'row', width: '117.02px', height: '14.65px', gap: '10.82px' }}>
                    <StarPurple500OutlinedIcon sx={{ width: '14.75px', height: '14.65px', color: '#ACACAC' }} /><StarPurple500OutlinedIcon sx={{ width: '14.75px', height: '14.65px', color: '#ACACAC' }} /><StarPurple500OutlinedIcon sx={{ width: '14.75px', height: '14.65px', color: '#ACACAC' }} /><StarPurple500OutlinedIcon sx={{ width: '14.75px', height: '14.65px', color: '#ACACAC' }} /><StarPurple500OutlinedIcon sx={{ width: '14.75px', height: '14.65px', color: '#ACACAC' }} />
                  </Box>
                </Box>
              </Box>
            </Link>
          ))}
        </Box>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row', md: 'row' }, justifyContent: 'space-between', alignItems: 'center', width: { xs: '100%', sm: '100%', md: '976px' }, height: { xs: 'auto', sm: 'auto', md: '33.12px' }, position: { xs: 'relative', sm: 'relative', md: 'absolute' }, top: { xs: 'auto', sm: 'auto', md: '904px' }, left: { xs: 0, sm: 0, md: '397px' }, gap: { xs: 2, sm: 1, md: 0 } }}>
          <Typography sx={{ width: '248.4px', height: '20px', fontFamily: 'Figtree', fontWeight: 400, fontSize: '14.49px', lineHeight: '140%', letterSpacing: '0%', color: '#747474' }}>10 of 456 items</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '231.84px', height: '33.12px' }}>
            <Pagination onChange={(e, value) => setPage(value)} count={totalPages} size="small" sx={{ color: '#EDA415', '& .MuiPagination-ul': { flexWrap: 'nowrap', gap: '0.1px', '& .MuiPaginationItem-root': { color: '#EDA415', margin: 0 }, '& .MuiPaginationItem-root.Mui-selected': { backgroundColor: '#EDA415', color: '#FFFFFF' } } }} />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'end', width: '284.4px', height: '33.12px', gap: '4.14px' }}>
            <Typography sx={{ width: '37.26px', height: '20.7px', fontFamily: 'Figtree', fontWeight: 400, fontSize: '14.49px', lineHeight: '140%', letterSpacing: '0%', color: '#747474' }}>show</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '108.67px', height: '33.12px', gap: '4.14px' }}>
              <Typography sx={{ width: '58.99px', height: '22.77px', fontFamily: 'Figtree', fontWeight: 600, fontSize: '16.56px', lineHeight: '140%', letterSpacing: '0%', color: '#EDA415' }}>10 rows</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Dialog onClose={handleClose} open={dialogOpen} fullWidth maxWidth="sm" sx={{ '& .MuiDialog-paper': { width: { xs: '90%', sm: '496px' }, maxWidth: '496px', minHeight: '326px', height: 'auto', borderRadius: '20px', } }}>
        <Box sx={{ width: '100%', minHeight: '326px', p: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '16px' }}>
          <DialogTitle sx={{ width: '496px', height: '72px', fontFamily: 'Montserrat', fontWeight: 600, fontSize: { xs: '21px', sm: '23.73px' }, lineHeight: '100%', textAlign: 'center', color: '#3C3C3C' }}>Add Sub Category</DialogTitle>
          <TextField value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} select label="Select Category" variant="outlined" sx={{ width: '100%', maxWidth: '390.39px', height: '70.01px', '& .MuiOutlinedInput-root': { height: '70.01px', borderRadius: '14.84px' }, '& .MuiOutlinedInput-notchedOutline': { borderWidth: '1.85px', borderColor: '#3C3C3C' } }}>
            {categoryList?.map(item => (<MenuItem key={item?._id} value={item?._id}>{item?.category}</MenuItem>))}
          </TextField>
          <TextField value={formData.subCategory} onChange={(e) => setFormData({ ...formData, subCategory: e.target.value })} label="Enter sub catgory name" variant="outlined" sx={{ width: '100%', maxWidth: '390.39px', height: '70.01px', mt: '20px', '& .MuiOutlinedInput-root': { height: '70.01px', borderRadius: '14.84px', }, '& .MuiOutlinedInput-notchedOutline': { borderWidth: '1.85px', borderColor: '#3C3C3C', }, }} />
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: { xs: '100%', sm: '250.37px' }, maxWidth: '250.37px', height: '52.71px', borderRadius: '9.31px', mt: '20px' }}>
            <Button onClick={addSubCategory} sx={{ width: '108.06px', height: '52.71px', borderRadius: '9.31px', backgroundColor: '#EDA415', fontFamily: 'Montserrat', fontWeight: 500, fontSize: { xs: '18px', sm: '22.25px' }, lineHeight: '100%', letterSpacing: '0%', color: '#FFFFFF' }}>Add</Button>
            <Button onClick={handleClose} sx={{ width: '108.06px', height: '52.71px', borderRadius: '9.31px', backgroundColor: '#EEEEEE', fontFamily: 'Montserrat', fontWeight: 500, fontSize: { xs: '18px', sm: '22.25px' }, lineHeight: '100%', letterSpacing: '0%', color: '#3C3C3C' }}>DISCARD</Button>
          </Box>
        </Box>
      </Dialog>
    </div>
  )
}

export default Home