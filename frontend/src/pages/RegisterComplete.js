import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailLink, updatePassword } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterComplete = ({history}) => {

  const [email, setEmail] = useState('');
  const [password , setPassword] = useState('');

  useEffect(() => {
    setEmail(window.localStorage.getItem('emailRegistration'));
  },[]);

  const handleSubmit = async (event) => {
    event.preventDefault();
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
          console.log("user",user,"idTokenResult",idTokenResult);
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
