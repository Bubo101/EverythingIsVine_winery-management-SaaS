import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GetWine from './WineDetails';
import WineList from './wines';
import Login from './login';
import SignUp from './signup';
import Winery from './winery';
import WineryList from './dashboard';
import { AuthProvider } from './auth';
import NavbarLayout from './navLayout';
import Contact from './contact';
import EditWinery from './winery_edit';
import EditWine from './wine_edit';
import NewWine from './new_wine';

function App(props) {

  return (

    <AuthProvider>
      <BrowserRouter>
          <div className="container">
            <Routes>
              <Route path="/" element={<WineryList />} />
            </Routes>
            <Routes>
              <Route element={<NavbarLayout />}>
                <Route path="/wineries/:id/wines/" element={<WineList />} />
                <Route path="/wineries/:id/contact/" element={<Contact />} />
                <Route path="/wineries/:winery_id/wines/:winevo_id/" element={<GetWine />} />
                <Route path="/wineries/:id/" element={<Winery />} /> 
                <Route path="/wineries/:id/login/" element={<Login />} />
                <Route path="/wineries/:id/signup/" element={<SignUp />} />
                <Route path="/wineries/:id/edit/" element={<EditWinery />} />
                <Route path="/wines/:id/edit/" element={<EditWine/>} />
                <Route path="/wineries/:id/wines/new/" element={<NewWine />} />

              </Route>
            </Routes>
          </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
