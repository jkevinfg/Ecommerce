import React from 'react';
import {BrowserRouter , Route ,Switch}from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';

const App = () => {
  return (
   <BrowserRouter>
    <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route component={NotFound} />
    </Switch>
   </BrowserRouter>
  )
}
export default App;
