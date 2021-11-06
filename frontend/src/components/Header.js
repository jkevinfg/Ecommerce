import React , {useState} from 'react';
import { Menu } from 'antd';
import { HomeOutlined, UserAddOutlined,LoginOutlined,  SettingOutlined } from '@ant-design/icons';

import {Link } from 'react-router-dom';


const { SubMenu } = Menu;


const Header = () => {

  const [current , setCurrent ] = useState("home")

  const handleClick =(event) => {
    setCurrent(event.key)
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
          <Menu.Item key="logout">Cerrar Sesión</Menu.Item>
      </SubMenu>

    </Menu>
  );
}

export default Header;

