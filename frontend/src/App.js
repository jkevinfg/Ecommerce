import React, { useEffect } from 'react';
import {BrowserRouter , Route ,Switch}from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import Header from './components/Header';
import RegisterComplete from './pages/RegisterComplete';
import ForgotPassword from './pages/ForgotPassword';
import History from './pages/History';
import UserRoute from './components/routes/UserRoute';

import { loginUser } from './actions/index';
import {auth} from './firebase';
import  {useDispatch,useSelector} from 'react-redux';
import { currentUser } from './functions/auth';


const App = () => {
  
  const dispatch = useDispatch();
  const {user} = useSelector((state) => ({...state}));
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if(user){
        const idTokenResult = await user.getIdTokenResult();
        const token = idTokenResult.token;
        currentUser(token) 
          .then((res) => {
            dispatch(loginUser(res.data,idTokenResult));
            })
          .catch(err => console.log(err));
      }
    });
    //cleanup
    return () => unsubscribe();

  },[])
  return (
   <BrowserRouter>
    <Header/>
    <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/register/complete" exact component={RegisterComplete} />
          <Route path="/forgot/password" exact component={ForgotPassword} />
          <UserRoute path="/user/history" exact component={History} />
          <Route component={NotFound} />
    </Switch>
   </BrowserRouter>
  )
}
export default App;
