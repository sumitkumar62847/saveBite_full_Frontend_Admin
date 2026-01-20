import { BrowserRouter as Router,Routes, Route } from'react-router-dom';
import Home from './components/Home';
import './App.css';
import Login from './components/Login';
import EmailVerify from './components/EmailVerify';
import RestRegister from './components/RestRegister';
import Address from './components/Address';
import MapComponent from './components/MapAddress';
import Profile from './components/profile';
import AddAds from './components/AddAds';
import AdditemForm from './components/AdditemForm';
import Prediction from './components/Prediction_ml';


function App(){
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path='/profile' element={<Profile></Profile>}/>
        <Route path='/additem' element={<AdditemForm></AdditemForm>}/>
        <Route path='/edit' element={<AdditemForm edit={true}></AdditemForm>}/>
        <Route path='/addAds' element={<AddAds></AddAds>}/>
        <Route path='/prediction' element={<Prediction></Prediction>}/>
        <Route exact path='/login' element={<Login />} />
        <Route path='/verify' element={<EmailVerify></EmailVerify>}/>
        <Route path='/restregister' element={<RestRegister></RestRegister>}/>
        <Route path='/address' element={<Address></Address>}/>
        <Route path='/mapaddress' element={<MapComponent></MapComponent>}/>
      </Routes>
    </Router>
  );
}

export default App;
