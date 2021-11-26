import React from 'react';
import {BrowserRouter , Route ,Switch}from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import Header from './components/Header';
import RegisterComplete from './pages/RegisterComplete';

const App = () => {
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
