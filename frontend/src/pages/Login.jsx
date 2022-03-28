import React,{useEffect, useState} from 'react';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signInWithEmailAndPassword , GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import { auth } from '../firebase';
import {Button} from 'antd';
import {MailOutlined, GoogleOutlined} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../actions';
import {Link} from 'react-router-dom';
import axios from 'axios';

const createOrUpdateUser = async (authtoken) => {
    return await axios.post(
              `${process.env.REACT_APP_API}/auth/create-or-update`,
              {},
              { 
               headers : {authtoken}
              }
    )
}

const Login = ({history}) => {

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [loading , setLoading ] = useState(false);
  const {user} = useSelector((state) => ({...state}));
  
  useEffect(() => {
    if(user && user.token) history.push("/");
  },[user]);

  let dispatch = useDispatch();
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth,email,password);
      const {user} = result;
      const idTokenResult = await user.getIdTokenResult();
      const token = idTokenResult.token;
      console.log("Token =>",token);      
      createOrUpdateUser(token)
              .then((res) => console.log("Create or update =>",res))
              .catch();
      dispatch(loginUser(user,idTokenResult));
      history.push('/');
    }catch(error){
      setLoading(false);
      toast.error('Correo o contraseña incorrectas')
    } 
  }

  const handleChangeEmail=(event) => {
    setEmail(event.target.value);
  }

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  }


  const googleLogin = async () => {
    //Using a popup. 
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const {user} = result;
      const idTokenResult = await user.getIdTokenResult();
      dispatch(loginUser(user,idTokenResult));
      history.push("/");


    } catch (error){
      toast.error(error.message);
      
    } 
  }
  return (
    <div className="container p-3">
        <div className="row">
              <div className="col-md-6 offset-md-3">
                   {loading ?  <h4 className='text-danger'>Loading...</h4> : <h4> Iniciar Sesión</h4>  }
                    <ToastContainer/>
                    <form onSubmit={handleSubmit}>
                        <input type="email" placeholder='Tu correo' className="form-control mb-2" onChange={handleChangeEmail}/>
                        <input type="password" placeholder='contraseña' className="form-control mb-2" onChange={handleChangePassword}/>
                        <Button
                          onClick={handleSubmit}
                          type = "primary"
                          className='mb-2'
                          block
                          shape='round'
                          icon = {<MailOutlined/>}
                          size="large"
                          disabled= {!email || password.length < 6}
                        > 
                        Entrar
                        </Button>
                        <Button
                          onClick={googleLogin}
                          type = "danger"
                          className='mb-2'
                          block
                          shape='round'
                          icon = {<GoogleOutlined />}
                          size="large"
                        > 
                        Inicia sesión con Google
                        </Button>

                        <Link to="/forgot/password"
                        className='float-end text-danger'
                        
                        >Olvidaste tu contraseña</Link>
                    </form>
              </div>
          </div>
    </div>


    )

}

export default Login;
