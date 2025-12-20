import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import SummaryApi from './common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails, setUserLoading } from './store/userSlice';
import ScrollToTop from './components/ScrollToTop';

function App() {
  const dispatch = useDispatch()
  const [cartProductCount,setCartProductCount] = useState(0)

  const fetchUserDetails = async()=>{
    try {
      const dataResponse = await fetch(SummaryApi.current_user.url,{
        method : SummaryApi.current_user.method,
        credentials : 'include'
      })

      const dataApi = await dataResponse.json()

      if(dataApi.success){
        dispatch(setUserDetails(dataApi.data))
      }else{
        dispatch(setUserLoading(false))
      }
    } catch (error) {
      console.log("Error fetching user details:", error)
      dispatch(setUserLoading(false))
    }
  }

  const fetchUserAddToCart = async()=>{
    try {
      const dataResponse = await fetch(SummaryApi.addToCartProductCount.url,{
        method : SummaryApi.addToCartProductCount.method,
        credentials : 'include'
      })

      const dataApi = await dataResponse.json()

      setCartProductCount(dataApi?.data?.count)
    } catch (error) {
      console.log("Error fetching cart count:", error)
    }
  }

  const [currency, setCurrency] = useState(localStorage.getItem('currency') || 'INR')

  const handleCurrencyChange = (newCurrency) => {
    setCurrency(newCurrency)
    localStorage.setItem('currency', newCurrency)
  }

  useEffect(()=>{
    /**user Details */
    fetchUserDetails()
    /**user Details cart product */
    fetchUserAddToCart()

  },[])
  return (
    <>
      <Context.Provider value={{
          fetchUserDetails, // user detail fetch 
          cartProductCount, // current user add to cart product count,
          fetchUserAddToCart,
          currency,
          setCurrency: handleCurrencyChange
      }}>
        <ToastContainer 
          position='top-center'
        />
        <ScrollToTop/>
        <Header/>
        <main className='min-h-[calc(100vh-120px)] pt-16'>
          <Outlet/>
        </main>
        <Footer/>
      </Context.Provider>
    </>
  );
}

export default App;
