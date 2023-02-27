import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WineList from './wines';
import Login from './login';
import SignUp from './signup';
import Winery from './winery';
import WineryList from './dashboard';
import { AuthProvider } from './auth';
import ShoppingCart from './ShoppingCart';
import Checkout from './Checkout';
import { MainContext } from './mainContext';
import { useState } from 'react';
import NavbarLayout from './navLayout';
import Contact from './contact';
import EditWinery from './winery_edit';
import EditWine from './wine_edit';
import NewWine from './new_wine';
import Request from './request';
import GetWine from './WineDetails';
import NewWinery from './newWinery';
import Chat from './chat';

function App(props) {
  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, '');

  let [firstName, setFirstName] = useState('');
  let [lastName, setLastName] = useState('');
  let [addressOne, setAddressOne] = useState('');
  let [addressTwo, setAddressTwo] = useState('');
  let [city, setCity] = useState('');
  let [state, setState] = useState('');
  let [zipCode, setZipCode] = useState('');
  let [country, setCountry] = useState('');
  let [cardName, setCardName] = useState('');
  let [cardNumber, setCardNumber] = useState('');
  let [expDate, setExpDate] = useState('');
  let [cvv, setCVV] = useState('');
  let [lastFour, setLastFour] = useState('');

  return (
    <MainContext.Provider
      value={{
        firstName,
        setFirstName,
        lastName,
        setLastName,
        addressOne,
        setAddressOne,
        addressTwo,
        setAddressTwo,
        city,
        setCity,
        state,
        setState,
        zipCode,
        setZipCode,
        country,
        setCountry,
        cardName,
        setCardName,
        cardNumber,
        setCardNumber,
        expDate,
        setExpDate,
        cvv,
        setCVV,
        lastFour,
        setLastFour,
      }}
    >
      <AuthProvider>
        <BrowserRouter basename={basename}>
          <div className="container">
          <Chat />
            <Routes>
              <Route path="/" element={<WineryList />} />
              <Route path="/request/" element={<Request />} />
              <Route path="/wines/:id/edit/" element={<EditWine />} />
              <Route path="/newwinery/" element={<NewWinery />} />
            </Routes>
            <Routes>
              <Route element={<NavbarLayout />}>
                <Route path="/wineries/:id/wines/" element={<WineList />} />
                <Route path="/wineries/:id/contact/" element={<Contact />} />
                <Route
                  path="/wineries/:id/wines/:winevo_id/"
                  element={<GetWine />}
                />
                <Route path="/wineries/:id/" element={<Winery />} />
                <Route path="/wineries/:id/login/" element={<Login />} />
                <Route path="/wineries/:id/signup/" element={<SignUp />} />
                <Route
                  path="/wineries/:id/shoppingcart/"
                  element={<ShoppingCart />}
                />
                <Route
                  path="/wineries/:id/shoppingcart/checkout"
                  element={<Checkout />}
                />
                <Route path="/wineries/:id/edit/" element={<EditWinery />} />
                <Route path="/wineries/:id/wines/new/" element={<NewWine />} />
              </Route>
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </MainContext.Provider>
  );
}

export default App;
