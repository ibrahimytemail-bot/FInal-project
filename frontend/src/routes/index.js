import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import Login from '../pages/Login'
import ForgetPassword from '../pages/ForgetPassword'
import VerifyOTP from '../pages/VerifyOTP'
import ChangePassword from '../pages/ChangePassword'
import SignUp from '../pages/SignUp'
import AdminPanel from '../pages/AdminPanel'
import AllUsers from '../pages/AllUsers'
import AllProducts from '../pages/AllProducts'
import AllOrders from '../pages/AllOrders'
import AllReviews from '../pages/AllReviews'
import CategoryProduct from '../pages/CategoryProduct'
import ProductDetails from '../pages/ProductDetails'
import Cart from '../pages/Cart'
import SearchProduct from '../pages/SearchProduct'
import Checkout from '../pages/Checkout'
import OrderPlaced from '../pages/OrderPlaced'
import PrivacyPolicy from '../pages/PrivacyPolicy'
import TermsConditions from '../pages/TermsConditions'
import AboutUs from '../pages/AboutUs'
import ContactUs from '../pages/ContactUs'
import Catalog from '../pages/Catalog'
import Sitemap from '../pages/Sitemap'
import FAQs from '../pages/FAQs'

const router = createBrowserRouter([
    {
        path : "/",
        element : <App/>,
        children : [
            {
                path : "",
                element : <Home/>
            },
            {
                path : "login",
                element : <Login/>
            },
            {
                path : "forgot-password",
                element : <ForgetPassword/>
            },
            {
                path : "verify-otp",
                element : <VerifyOTP/>
            },
            {
                path : "change-password",
                element : <ChangePassword/>
            },
            {
                path : "sign-up",
                element : <SignUp/>
            },
            {
                path : "product-category",
                element : <CategoryProduct/>
            },
            {
                path : "product/:id",
                element : <ProductDetails/>
            },
            {
                path : 'cart',
                element : <Cart/>
            },
            {
                path : 'checkout',
                element : <Checkout/>
            },
            {
                path : 'order-placed',
                element : <OrderPlaced/>
            },
            {
                path : "search",
                element : <SearchProduct/>
            },
            {
                path : "privacy-policy",
                element : <PrivacyPolicy/>
            },
            {
                path : "terms-conditions",
                element : <TermsConditions/>
            },
            {
                path : "about",
                element : <AboutUs/>
            },
            {
                path : "contactus",
                element : <ContactUs/>
            },
            {
                path : "catalog",
                element : <Catalog/>
            },
            {
                path : "sitemap",
                element : <Sitemap/>
            },
            {
                path : "faqs",
                element : <FAQs/>
            },
            {
                path : "admin-panel",
                element : <AdminPanel/>,
                children : [
                    {
                        path : "all-users",
                        element : <AllUsers/>
                    },
                    {
                        path : "all-products",
                        element : <AllProducts/>
                    },
                    {
                        path : "all-orders",
                        element : <AllOrders/>
                    },
                    {
                        path : "all-reviews",
                        element : <AllReviews/>
                    }
                ]
            },
        ]
    }
])


export default router