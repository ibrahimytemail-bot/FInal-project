// Automatically detect the correct backend URL based on how the frontend is accessed
const getBackendUrl = () => {
    // If environment variable is set, use it
    if (process.env.REACT_APP_BACKEND_URL) {
        return process.env.REACT_APP_BACKEND_URL;
    }
    
    // Get the current hostname
    const hostname = window.location.hostname;
    
    // If accessed via network IP (192.168.x.x), use network IP for backend
    if (hostname.match(/^192\.168\.\d+\.\d+$/)) {
        return `http://${hostname}:8080`;
    }
    
    // Default to localhost
    return "http://localhost:8080";
};

const backendDomin = getBackendUrl();

const SummaryApi = {
    signUP : {
        url : `${backendDomin}/api/signup`,
        method : "post"
    },
    signIn : {
        url : `${backendDomin}/api/signin`,
        method : "post"
    },
    current_user : {
        url : `${backendDomin}/api/user-details`,
        method : "get"
    },
    logout_user : {
        url : `${backendDomin}/api/userLogout`,
        method : 'get'
    },
    allUser : {
        url : `${backendDomin}/api/all-user`,
        method : 'get'
    },
    updateUser : {
        url : `${backendDomin}/api/update-user`,
        method : "post"
    },
    deleteUser : {
        url : `${backendDomin}/api/delete-user`,
        method : "post"
    },
    uploadProduct : {
        url : `${backendDomin}/api/upload-product`,
        method : 'post'
    },
    allProduct : {
        url : `${backendDomin}/api/get-product`,
        method : 'get'
    },
    updateProduct : {
        url : `${backendDomin}/api/update-product`,
        method  : 'post'
    },
    deleteProduct : {
        url : `${backendDomin}/api/delete-product`,
        method  : 'post'
    },
    categoryProduct : {
        url : `${backendDomin}/api/get-categoryProduct`,
        method : 'get'
    },
    categoryWiseProduct : {
        url : `${backendDomin}/api/category-product`,
        method : 'post'
    },
    productDetails : {
        url : `${backendDomin}/api/product-details`,
        method : 'post'
    },
    addToCartProduct : {
        url : `${backendDomin}/api/addtocart`,
        method : 'post'
    },
    addToCartProductCount : {
        url : `${backendDomin}/api/countAddToCartProduct`,
        method : 'get'
    },
    addToCartProductView : {
        url : `${backendDomin}/api/view-card-product`,
        method : 'get'
    },
    updateCartProduct : {
        url : `${backendDomin}/api/update-cart-product`,
        method : 'post'
    },
    deleteCartProduct : {
        url : `${backendDomin}/api/delete-cart-product`,
        method : 'post'
    },
    searchProduct : {
        url : `${backendDomin}/api/search`,
        method : 'get'
    },
    filterProduct : {
        url : `${backendDomin}/api/filter-product`,
        method : 'post'
    },
    getFeaturedProduct : {
        url : `${backendDomin}/api/get-featured-product`,
        method : 'get'
    },
    getBestSellingProduct : {
        url : `${backendDomin}/api/get-best-selling-product`,
        method : 'get'
    },
    getHomeCategoryProduct : {
        url : `${backendDomin}/api/get-home-category-product`,
        method : 'post'
    },
    uploadImage : {
        url : `${backendDomin}/api/upload-image`,
        method : 'post'
    },
    getImage : {
        url : `${backendDomin}/api/image`,
        method : 'get'
    },
    getAllImages : {
        url : `${backendDomin}/api/images`,
        method : 'get'
    },
    forgotPassword : {
        url : `${backendDomin}/api/forgot-password`,
        method : 'post'
    },
    verifyOTP : {
        url : `${backendDomin}/api/verify-otp`,
        method : 'post'
    },
    changePassword : {
        url : `${backendDomin}/api/change-password`,
        method : 'post'
    },
    allOrder : {
        url : `${backendDomin}/api/all-orders`,
        method : 'get'
    },
    placeOrder : {
        url : `${backendDomin}/api/place-order`,
        method : 'post'
    },
    addReview : {
        url : `${backendDomin}/api/add-review`,
        method : 'post'
    },
    allReviews : {
        url : `${backendDomin}/api/all-reviews`,
        method : 'get'
    },
    deleteReview : {
        url : `${backendDomin}/api/delete-review`,
        method : 'post'
    }
}


export default SummaryApi