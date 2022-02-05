import React, { useEffect } from 'react';
import {BrowserRouter , Route ,Switch}from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import Header from './components/Header';
import RegisterComplete from './pages/RegisterComplete';

import {auth} from './firebase';
import  {useDispatch} from 'react-redux';


const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if(user){
        const idTokenResult = await user.getIdTokenResult();
        console.log("user",user);
        dispatch({
          type : 'LOGGED_IN_USER',
          payload : {
            email : user.email,
            token : idTokenResult.token,
          }
        });
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
          <Route component={NotFound} />
    </Switch>
   </BrowserRouter>
  )
}
export default App;
