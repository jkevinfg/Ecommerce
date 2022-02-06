import React,{useState} from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Button} from 'antd';
import {MailOutlined} from '@ant-design/icons';

const Login = () => {

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(email,password);
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
