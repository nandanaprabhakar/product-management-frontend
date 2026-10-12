import { serverURL } from "./serverURL";
import commonAPI from "./commonAPI";

// 1 Register
export const registerAPI = async(reqBody) =>{
    return await commonAPI('POST', `${serverURL}/api/register`, reqBody, {});
}

//2 Login
export const loginAPI = async(reqBody) =>{
    return await commonAPI('POST', `${serverURL}/api/login`, reqBody, {});
}

// Add Category 
export const addCategoryAPI = async(reqBody, reqHeader) =>{
    return await commonAPI('POST', `${serverURL}/api/addcategory`, reqBody, reqHeader);
}

// Get Category
export const getCategoryAPI = async(reqHeader) =>{
    return await commonAPI('GET', `${serverURL}/api/getcategory`, {}, reqHeader);
}

// Add Sub Category
export const addSubCategoryAPI = async(reqBody, reqHeader) =>{
    return await commonAPI('POST', `${serverURL}/api/addsubcategory`, reqBody, reqHeader);
}

// Get Sub Category
export const getSubCategoryAPI = async(reqHeader) =>{
    return await commonAPI('GET', `${serverURL}/api/getsubcategory`, {}, reqHeader);
}

// Add Product
export const addProductAPI = async(reqBody, reqHeader) =>{
    return await commonAPI('POST', `${serverURL}/api/addproduct`, reqBody, reqHeader);
}

// Get Product
export const getProductAPI = async(searchKey, reqHeader) =>{
    return await commonAPI('GET', `${serverURL}/api/getproduct?search=${searchKey}`, {}, reqHeader);
}

// View Product Details
export const viewProductDetailsAPI = async(id, reqHeader) =>{
    return await commonAPI('GET', `${serverURL}/api/viewproduct/${id}`, {}, reqHeader);
}

// Update Product
export const updateProductAPI = async(id, reqBody, reqHeader) =>{
    return await commonAPI('PUT', `${serverURL}/api/updateproduct/${id}`, reqBody, reqHeader);
}

// Add WishList 
export const addWishlistAPI = async(id, reqHeader) =>{
    return await commonAPI('POST', `${serverURL}/api/addwishlist`, { productId: id }, reqHeader);
}

// Get Wishlist
export const getWishlistAPI = async( reqHeader ) =>{
    return await commonAPI('GET', `${serverURL}/api/getwishlist`, {}, reqHeader);
}

// Delete Wishlist Product
export const deletWishlistProductAPI = async(id, reqHeader) =>{
    return await commonAPI('DELETE', `${serverURL}/api/deletewishlistproduct?id=${id}`, reqHeader);
}

// View Product Details
export const filterSubCategoryAPI = async(subCategory, reqHeader) =>{
    return await commonAPI('GET', `${serverURL}/api/filtersubcat?subCategory=${encodeURIComponent(subCategory)}`, {}, reqHeader);
}

