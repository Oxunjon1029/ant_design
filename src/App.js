
import './App.css';

import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import 'antd/dist/antd.css';
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  CloseSquareOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  AppstoreAddOutlined,
  AppstoreOutlined,
 
} from '@ant-design/icons';


import Students from './Student';
import Tutors from './Tutors';
import Group from '../src/Groups/Group'
const { Header, Sider, Content } = Layout;





   class App extends React.Component {
     
    state = {
      collapsed: false,
      
    };




    toggle = () => {
      this.setState({
        collapsed: !this.state.collapsed,
      });
    };
   
     render() {
      
     
       
       return (
         <div>
          <Router>
            <Layout style={{minHeight:"100vh"}}>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
        
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item className="H1" icon={<AppstoreOutlined />}>
           
              @GeniusAdmin
            
            </Menu.Item>
            <Menu.Item key="1" icon={<UserOutlined />}>
              <Link to="./tutors">
              Tutor

              </Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              <Link to="./students">Students</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              <Link to="./groups">Group</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            
            {React.createElement(this.state.collapsed ? CloseSquareOutlined : MenuUnfoldOutlined, {
              className: 'trigger',
              onClick: this.toggle,
              
            })}
          
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            <Switch>
        <Route path="/" exact>

          <Tutors/>
        </Route>
       <Route path="/tutors">
<Tutors/>
       </Route>
        <Route path="/students">
          <Students/>
        </Route>
<Route path="/groups">
  <Group/>
</Route>
      </Switch>
       
          </Content>
        </Layout>
      </Layout>





      
      </Router>
         </div>
       );
     }
   }
   
 
   
   export default App;
   