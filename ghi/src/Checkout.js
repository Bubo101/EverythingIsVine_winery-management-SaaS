import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Alert } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import { useContext, useEffect } from 'react';
import { MainContext } from './mainContext';
import { useDispatch, useSelector } from 'react-redux';
import { useAuthContext } from './auth';
import { clearCart } from './store/cartReducer';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link
        color="inherit"
        href="/"
      >
        Everything is Vine
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const steps = ['Billing address', 'Payment details', 'Review your order'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <PaymentForm />;
    case 2:
      return <Review />;
    default:
      throw new Error('Unknown step');
  }
}

const theme = createTheme();

export default function Checkout() {
  const { token } = useAuthContext();
  const [loggedIn, setLoggedIn] = React.useState(false);
  const { cartItems } = useSelector((state) => state.cart);
  const [activeStep, setActiveStep] = React.useState(0);
  let [missingFieldsError, setMissingFieldsError] = React.useState(false);
  let [confNumber, setConfNumber] = React.useState(-1);
  let [userEmail, setUserEmail] = React.useState('');
  const dispatch = useDispatch();
  const {
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
  } = useContext(MainContext);
  async function postOrder() {
    let confirmation_number = Math.floor(
      Math.random() * (99999999999999999 - 10000000000000000 + 1) +
        10000000000000000
    );
    confirmation_number = confirmation_number.toString();
    setConfNumber(confirmation_number);

    let orderData = {
      confirmation_number: confirmation_number,
      first_name: firstName,
      last_name: lastName,
      address_one: addressOne,
      address_two: addressTwo,
      city: city,
      state: state,
      zip_code: zipCode,
      country: country,
      card_name: cardName,
      last_four: lastFour,
      exp_date: expDate,
      discount_ten: loggedIn,
    };
    if (userEmail !== '') {
      orderData['account_email'] = userEmail;
    }
    // const host = `${process.env.REACT_APP_SALES_API}`;
    const host = "http://localhost:8010"
    const orderUrl = host + `/api/orders/`;
    let fetchConfig = {
      method: 'post',
      mode: 'cors',
      body: JSON.stringify(orderData),
      headers: { 'Content-Type': 'application/json' },
    };
    try {
      let response = await fetch(orderUrl, fetchConfig);
      if (response.ok) {
        const newOrder = await response.json();
        let order_id = newOrder['order'];
        setFirstName('');
        setLastName('');
        setAddressOne('');
        setAddressTwo('');
        setCity('');
        setState('');
        setZipCode('');
        setCountry('');
        setCardName('');
        setCardNumber('');
        setExpDate('');
        setCVV('');

        postShoppingItems(order_id);
      }
    } catch (IntegrityError) {
      postOrder();
    }
  }
  async function postShoppingItems(order_id) {
    let shopping_items = JSON.parse(JSON.stringify(cartItems));
    let winery_id = shopping_items[0]['winery_id'];
    let qToSubtract = [];
    for (let i = 0; i < shopping_items.length; i++) {
      let newDict = {};
      shopping_items[i]['item'] = {};
      shopping_items[i]['item']['id'] = shopping_items[i].id;
      shopping_items[i]['item']['winery_id'] = shopping_items[i].winery_id;
      shopping_items[i]['quantity'] = shopping_items[i]['cust_quantity'];
      shopping_items[i]['order_id'] = parseInt(order_id);
      newDict['quantity'] = shopping_items[i]['cust_quantity'];
      newDict['wine_id'] = shopping_items[i].id;
      qToSubtract.push(newDict);
      delete shopping_items[i].id;
      delete shopping_items[i].winery_id;
      delete shopping_items[i].brand;
      delete shopping_items[i].year;
      delete shopping_items[i].varietal;
      delete shopping_items[i].description;
      delete shopping_items[i].region;
      delete shopping_items[i].abv;
      delete shopping_items[i].volume;
      delete shopping_items[i].city_state;
      delete shopping_items[i].year;
      delete shopping_items[i].picture_url;
      delete shopping_items[i].cust_quantity;
      delete shopping_items[i].import_href;
    }
    let shoppingItemsData = {
      shopping_items: shopping_items,
    };

    // const host = `${process.env.REACT_APP_SALES_API}`;
    const host = "http://localhost:8010"
    const shoppingItemsUrl = host + `/api/wineries/${winery_id}/shoppingitems/`;
    let fetchConfig = {
      method: 'post',
      mode: 'cors',
      body: JSON.stringify(shoppingItemsData),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    let response2 = await fetch(shoppingItemsUrl, fetchConfig);
    if (response2.ok) {
      updateStock(qToSubtract);
      return handleNext();
    }
  }
  async function updateStock(qToSubtract) {
    for (let i = 0; i < qToSubtract.length; i++) {
      // const host = `${process.env.REACT_APP_WINERY_API}`;
      const host = "http://localhost:8000"
      const url = host + `/api/wines/update/${qToSubtract[i].wine_id}/`;

      let wine_id = qToSubtract[i].wine_id;
      delete qToSubtract[i].wine_id;
      let fetchConfig = {
        method: 'put',
        mode: 'cors',
        body: JSON.stringify(qToSubtract[i]),
        headers: {
          'Content-Type': 'application/json',
        },
      };
      let response = await fetch(url, fetchConfig);
      if (response.ok) {
        continue;
      } else {
        console.log(`Stock for wine_id ${wine_id} not updated`);
      }
    }
  }
  async function validateForms() {
    if (activeStep === 0) {
      if (
        firstName === '' ||
        lastName === '' ||
        addressOne === '' ||
        city === '' ||
        state === '' ||
        zipCode === '' ||
        country === ''
      ) {
        return setMissingFieldsError(true);
      } else {
        return handleNext();
      }
    }
    if (activeStep === 1) {
      if (
        cardName === '' ||
        cardNumber.length !== 19 ||
        expDate.length !== 5 ||
        cvv.length !== 3
      ) {
        return setMissingFieldsError(true);
      } else {
        return handleNext();
      }
    }
    if (activeStep === 2) {
      await postOrder();
      dispatch(clearCart());
    }
  }
  const handleNext = () => {
    setMissingFieldsError(false);
    setActiveStep(activeStep + 1);
  };
  const handleBack = () => {
    setMissingFieldsError(false);
    setActiveStep(activeStep - 1);
  };

  async function getCurrentUser() {
    // const host = `${process.env.REACT_APP_SALES_API}`;
    const host = "http://localhost:8000"
    const url = host + `/api/accounts/user/`;

    const response = await fetch(url, {
      credentials: 'include',
    });
    if (response.ok) {
      const user = await response.json();

      setUserEmail(user.user.email);
    }
  }

  useEffect(() => {
    if (token) {
      setLoggedIn(true);
      getCurrentUser();
    }
  }, [token]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      ></AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #{confNumber}. We have emailed your order
                  confirmation, and will send you an update when your order is
                  ready for pickup.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {missingFieldsError && (
                    <Alert severity="error">
                      Please fill out all required fields!
                    </Alert>
                  )}
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    onClick={validateForms}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}
