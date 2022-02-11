import React,{useState} from 'react';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import {Button} from 'antd';
import {MailOutlined} from '@ant-design/icons';
import { useDispatch } from 'react-redux';


const Login = ({history}) => {

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [loading , setLoading ] = useState(false);


  let dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth,email,password);
      const {user } = result;
      const idTokenResult = await user.getIdTokenResult()
      
      dispatch({
        type : 'LOGGED_IN_USER',
        payload : {
          email : user.email,
          token : idTokenResult.token,
        }
      });
      history.push('/');
    }catch (error){
      toast.error(error.message);
      setLoading(false);
    } 
  }

  const handleChangeEmail=(event) => {
    setEmail(event.target.value);
  }

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  }
  return (
    <div className="container p-3">
        <div className="row">
              <div className="col-md-6 offset-md-3">
                    <h4>Inicia Sesión</h4>
                    <ToastContainer/>
                    <form onSubmit={handleSubmit}>
                        <input type="email" placeholder='Tu correo' className="form-control mb-2" onChange={handleChangeEmail}/>
                        <input type="password" placeholder='contraseña' className="form-control mb-2" onChange={handleChangePassword}/>
                        <Button
                          onClick={handleSubmit}
                          type = "primary"
                          className='mb-3'
                          block
                          shape='round'
                          icon = {<MailOutlined/>}
                          size="large"
                          disabled= {!email || password.length < 6}
                        > 
                        Entrar
                        </Button>
                    </form>
              </div>
          </div>
    </div>


    )

}

export default Login;
