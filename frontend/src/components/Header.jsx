import React , {useState} from 'react';
import { Menu } from 'antd';
import { HomeOutlined, UserAddOutlined,LoginOutlined,
  LogoutOutlined,
  SettingOutlined } from '@ant-design/icons';

import {Link } from 'react-router-dom';
import { auth } from '../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logoutUser} from '../actions/index'

const { SubMenu } = Menu;

const Header = () => {

  const [current , setCurrent ] = useState("home");
  let dispatch = useDispatch();
  let history = useHistory();
  /*
  state = {
    user : {
      email
      token
    }
  }

  */
  let user = useSelector((state) => {
    const {user} = state;
    return user;
  }) ; //traendo el estado -> mapStateToProps

  const handleClick =(event) => {
    setCurrent(event.key)
  }

  const logout = () => {
    auth.signOut();
    dispatch(logoutUser());
    history.push('/login');
  }

  return(
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      
      <Menu.Item key="home" icon={<HomeOutlined />} className="me-auto">
       <Link to="/">Inicio</Link>
      </Menu.Item>

      {!user && ( <Menu.Item key="login" icon={<LoginOutlined />}>
      <Link to="/login"> Iniciar Sesión</Link>
      </Menu.Item>) }
      
      {!user && (
        <Menu.Item key="register" icon={<UserAddOutlined />}>
        <Link to="/register"> Registro</Link>
      </Menu.Item>
      )}
      
      {user && (
        <SubMenu key="SubMenu" icon={<SettingOutlined />} title={user.email.split("@")[0]}>
          <Menu.Item key="opcion1">opcion1</Menu.Item>
          <Menu.Item icon={<LogoutOutlined/>} key="logout"
            onClick={logout}
          >Cerrar Sesión</Menu.Item>
      </SubMenu>
      )}
      

    </Menu>
  );
}

export default Header;

