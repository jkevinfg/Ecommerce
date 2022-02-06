import React , {useState} from 'react';
import { Menu } from 'antd';
import { HomeOutlined, UserAddOutlined,LoginOutlined,
  LogoutOutlined,
  SettingOutlined } from '@ant-design/icons';

import {Link } from 'react-router-dom';
import { auth } from '../firebase';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';


const { SubMenu } = Menu;

const Header = () => {

  const [current , setCurrent ] = useState("home");
  let dispatch = useDispatch();
  let history = useHistory();

  const handleClick =(event) => {
    setCurrent(event.key)
  }

  const logout = () => {
    auth.signOut();
    dispatch({ 
      type : 'LOGOUT',
      payload : null
    });
    history.push('/login');
  }

  return(
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Menu.Item key="home" icon={<HomeOutlined />} className="me-auto">
       <Link to="/"> Inicio</Link>
      </Menu.Item>
      <Menu.Item key="login" icon={<LoginOutlined />}>
        <Link to="/login"> Iniciar Sesión</Link>
      </Menu.Item>
      <Menu.Item key="register" icon={<UserAddOutlined />}>
        <Link to="/register"> Registro</Link>
      </Menu.Item>
      <SubMenu key="SubMenu" icon={<SettingOutlined />} title="Username">
          <Menu.Item key="opcion1">opcion1</Menu.Item>
          <Menu.Item icon={<LogoutOutlined/>} key="logout"
            onClick={logout}
          >Cerrar Sesión</Menu.Item>
      </SubMenu>

    </Menu>
  );
}

export default Header;

