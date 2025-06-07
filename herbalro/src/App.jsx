import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Nav from './Components/NavBar/Nav';
import { Hero } from './Components/Hero/Hero';
import Science from './Components/Science/Science';
import Title from './Components/Title/Title';
import Footer from './Components/Footer/Footer';
import About from './Components/About/About';
import Contact from './Components/Contact/Contact';
import Shop from './Pages/Shop/Shop';
import Signup from './Pages/Signup/Signup';
import { Login } from './Pages/Login/Login';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import AdminLayout from './Pages/Admin/AdminLayout';
import ProductsTab from './Pages/Admin/ProductsTab';
import OrdersTab from './Pages/Admin/OrdersTab';
import ShopTab from './Pages/Admin/ShopTab';
import FeedbackTab from './Pages/Admin/FeedbackTab';
import UsersTab from './Pages/Admin/UsersTab';

const Home = () => (
  <>
    <Nav />
    <Hero />
    <Title title='Science' subtitle='Behind the Scenes' />
    <Science />
    <About />
    <Title title='Contact Us' subtitle='Get in Touch' />
    <Contact />
    <Footer />
  </>
);

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>

      {/* ✅ Admin Layout Route with Nested Tabs */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<UsersTab />} /> {/* default tab: users */}
          <Route path="products" element={<ProductsTab />} />
          <Route path="orders" element={<OrdersTab />} />
          <Route path="shop" element={<ShopTab />} />
          <Route path="feedback" element={<FeedbackTab />} />
        </Route>
      </Routes>

    </BrowserRouter>
  );
};

export default App;
