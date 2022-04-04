import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailLink, updatePassword } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../actions';
import {createOrUpdateUser} from '../functions/auth'
import 'react-toastify/dist/ReactToastify.css';

const RegisterComplete = ({history}) => {

  const [email, setEmail] = useState('');
  const [password , setPassword] = useState('');
  const {user} = useSelector((state) => ({...state}));

  useEffect(() => {
    setEmail(window.localStorage.getItem('emailRegistration'));
  },[]);

  let dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if(!email || !password){
      toast.error('El correo y contraseña son requeridos');
      return;
    }
    if(password.length < 6){
      toast.error('La contraseña no puede ser menor a 6 caracteres');
      return;
    }

    try {
      const result = await signInWithEmailLink(auth, email, window.location.href);
      console.log("result : ", result.user);
      if (result.user.emailVerified){
          toast.success('Registrado');
          window.localStorage.removeItem('emailRegistration');
          const user = auth.currentUser;
          console.log(user);
          await updatePassword(user,password);
          const idTokenResult = await user.getIdTokenResult(); 
          //react redux
          console.log("user",user,"idTokenResult",idTokenResult);
          const token = idTokenResult.token;
          createOrUpdateUser(token) 
                  .then((res) => {
                    console.log("Create or Update =>",res.data);
                    //login(user,idTokenResult)
                    dispatch(loginUser(res.data,idTokenResult));
                    })
                    .catch(err => console.log(err));
          history.push('/');
      }
    } catch (error ) {
      toast.error(error.message);
    }
  }

  const handleChange = (event) => {
    setPassword(event.target.value);
  }


  return (
    <div className="container p-3">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Continua con el registro </h4>
          <ToastContainer />
          <form onSubmit={handleSubmit}>
            <input type="email" className="form-control" value={email} disabled />
            <input type="password" className="form-control mt-2" value={password} onChange={handleChange} placeholder="contraseña" />
            <p>*La contraseña debe tener como mínimo 6 caracteres</p>
            <button type="submit" className="btn btn-success mt-2">Registrarte</button>
          </form>
        </div>
      </div>
    </div>
  )

}

export default RegisterComplete;
