import { Layout, Menu, Breadcrumb } from 'antd';
import { useEffect, useState } from 'react'
import 'antd/dist/antd.css';
import { Link, useLocation  } from 'react-router-dom';
import { IoHomeSharp, IoGrid, IoPeople, IoPricetag } from "react-icons/io5";

function MainLayout({children}) {
  const location = useLocation();
  const [collapse, setCollapse] = useState(false)
  const [ section, setSection ] = useState("Inicio")
  const onCollapse = () => {setCollapse(!collapse)}
  const { Content, Footer, Sider } = Layout;
  const { SubMenu } = Menu;
  const locationname = location.pathname;
  const pages = [
    {
      name: "Inicio",
      path: "/",
      icon: <IoHomeSharp/>
    },
    {
      name: "Ventas",
      path: "/sells",
      icon: <IoPricetag/>
    },
    {
      name: "Items",
      path: "/items",
      icon: <IoGrid/>
    },
    {
      name: "Usuarios",
      path: "/users",
      icon: <IoPeople/>
    },
  ]

  const result = pages.find(obj => obj.path === locationname);
  
  return (
    <Layout style={{ minHeight:'100vh'}}>
      <Sider collapsible collapsed={collapse} onCollapse={onCollapse}>
        <div className="logo"><h2>POS<span style={{color:'#888'}}>APP</span></h2></div>        
        <Menu defaultSelectedKeys={location.pathname} mode="inline">
          {pages.map((page)=>{
            return(            
           <Menu.Item key={page.path} icon={page.icon}><Link to={page.path}> {page.name}</Link></Menu.Item>
            )
          })}
        </Menu>
      </Sider>
      <Layout className="site-layout" theme="light">
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Seccion</Breadcrumb.Item>
            <Breadcrumb.Item>{result.name}</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-background" style={{ minHeight: 360 }}>
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>POS APP ©{new Date().getFullYear()} creado por <b>Frank Uribe</b></Footer>
      </Layout>
    </Layout>
  );
}

export default MainLayout;