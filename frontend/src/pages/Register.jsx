import React,{useState} from 'react';
import { auth } from '../firebase';
import { sendSignInLinkToEmail } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {


const [email,setEmail] = useState('');

const handleSubmit = async (event) => {
  event.preventDefault();
  const actionCodeSettings = {
    url: process.env.REACT_APP_REGISTER_URL,
    handleCodeInApp : true
  }
  try {
    await sendSignInLinkToEmail(auth, email, actionCodeSettings)
    toast.success('Revise su bandeja de entrada , hemos enviado un link para que continue con el registro');
    window.localStorage.setItem('emailRegistration', email);
    setEmail('');
  } catch (error) {
    toast.error(error);
  }
}

const handleChange=(event) => {
  setEmail(event.target.value);
}

return (
  <div className="container p-3">
      <div className="row">
            <div className="col-md-6 offset-md-3">
                  <h4>Registro</h4>
                  <ToastContainer/>
                  <form onSubmit={handleSubmit}>
                      <input type="email" placeholder='Tu correo' className="form-control" onChange={handleChange}/>
                      <button type="submit" className="btn btn-success mt-2">Enviar</button>
                  </form>
            </div>
         </div>
  </div>


  )

}

export default Register;
