import './App.css';
import {useState} from 'react';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';
import ProductPage from './pages/Product';
import Products from './pages/Products';
import RequireAuth from './components/RequireAuth';
import Cart from './components/Cart'
import New from './pages/New'
import {ToastContainer} from 'react-toastify';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom'

function App() {
  


  return (
    <Router>
    <div className="App">
       <Navbar/>
      <Routes>
        <Route path = '/products' element = {<Products/>}/>
        <Route path = '/signup' element = {<Register/>} />
        <Route path = '/login' element = {<Login/>} />
        <Route path = '/product/:productid' element = {<RequireAuth><ProductPage/></RequireAuth>} />
        <Route path = '/cart' element = {<Cart/>} />
        <Route path = '/new' element = {<New/>} />
      </Routes>
    </div>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
    </Router>
  );
}

export default App;
