
import './App.css';

import React from 'react';

import 'antd/dist/antd.css';
  import {
  
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import { Table } from 'antd';

import axios from 'axios';

import {Button} from 'antd';
import { Modal } from 'antd';
import { Form, Input } from 'antd';







   class Tutors extends React.Component {
     
    state = {
      collapsed: false,
      tutordata:[],
      isModalVisible:false,
      secondisModalVisible:false,
      id:null
    };

Tutors=()=>{
  axios.get(`http://213.230.99.101:2027/api/admin/tutors`).then(res=>
this.setState({
  tutordata:res
})
  )
}  

componentDidMount(){
  this.Tutors()
}

    toggle = () => {
      this.setState({
        collapsed: !this.state.collapsed,
      });
    };
   
     render() {
      
     
       const showModal=()=>{
         this.setState({
           isModalVisible:true
         })
         this.Tutors()
       }
       const handleCancel=()=>{
       this.setState({
         isModalVisible:false
       })
       }
       const handleOk=()=>{
        this.setState({
          isModalVisible:false,
          
        })
       TutorGet()
       
       this.Tutors()
        
        
         
       }
       const TutorGet=()=>{
        axios.post(`http://213.230.99.101:2027/api/admin/tutor/save`,{
          fullname : document.getElementById('fullname').value,
          username : document.getElementById("username").value,
          address : document.getElementById("address").value,
          password : document.getElementById("password").value
         })
         this.Tutors()      
         }
       const DeleteTable=(id)=>{
         axios.delete(`http://213.230.99.101:2027/api/admin/tutor/delete/${id}`).then(res=>{
           alert("You are very successfull one !!!")
           this.Tutors()
         })
        
       }
       const EditModal=()=>{
   
         axios.put(`http://213.230.99.101:2027/api/admin/tutor/edit/${this.state.id}`,{
          fullname : document.getElementById('Editfullname').value,
          username : document.getElementById("Editusername").value,
          address : document.getElementById("Editaddress").value,
          password : document.getElementById("Editpassword").value
     }).then(()=>{
           this.setState({
             secondisModalVisible:false
           })
           
           this.Tutors()
        
         })
         
           
       }
       const Edit=(tutorId)=>{
         axios.get(`http://213.230.99.101:2027/api/admin/tutor/${tutorId}`).then(res=>{
           document.getElementById("Editfullname").value=res.data.fullname
           document.getElementById("Editusername").value=res.data.username
           document.getElementById("Editaddress").value=res.data.address
         })
         this.setState({
          secondisModalVisible:true,
          id:tutorId
        });}
        
      const EditOk=()=>{
        EditModal()
       
        this.setState({
          secondisModalVisible:false
          })
      }
    const  EditCancel=()=>{
        this.setState({
        secondisModalVisible:false
        })
      }
      
      const tutordata=this.state.tutordata.data
       const columns=[
         {
           title:'F.I.SH',
           dataIndex:'fullname',
           key:'fullname'
         },
         {
           title:'Username',
           dataIndex:'username',
           key:'username'
         },
         {
           title:'Address',
           dataIndex:'address',
           key:'address'
         },
         {
           title:'Amallar',
           render:tutor=>(
            <>
            <Button style={{marginRight:"0.2rem",marginBottom:"0.2rem"}} type='primary' onClick={()=>Edit(tutor.id)}><EditOutlined />Edit</Button>
            <Button type='danger' onClick={()=>DeleteTable(tutor.id)}><DeleteOutlined />Delete</Button>
            </>
           )
             
           
         }
       ]
       return (
         <div>
         
          
        <Table bordered responsive  dataSource={tutordata} columns={columns}></Table>
        <Button type="primary" onClick={showModal}>
        Open Modal  
      </Button>
      <Modal title="Edit Modal" visible={this.state.secondisModalVisible} onOk={EditOk} onCancel={EditCancel}>
      <Form>
  <Form.Item  label="Editfullname">
    <Input id="Editfullname" />
  </Form.Item>
  <Form.Item  label="Editusername">
    <Input id="Editusername" />
  </Form.Item>
  <Form.Item  label="Editaddress">
    <Input id="Editaddress" />
  </Form.Item>
  <Form.Item  label="Editpassword">
    <Input id="Editpassword" />
  </Form.Item>
  
</Form>
      </Modal>
      <Modal title="Basic Modal" visible={this.state.isModalVisible} onOk={handleOk} onCancel={handleCancel}>
      <Form>
  <Form.Item  label="fullname">
    <Input id="fullname" />
  </Form.Item>
  <Form.Item  label="username">
    <Input id="username" />
  </Form.Item>
  <Form.Item  label="address">
    <Input id="address" />
  </Form.Item>
  <Form.Item  label="password">
    <Input id="password" />
  </Form.Item>
  
</Form>
      </Modal>
          




      
         </div>
       );
     }
   }
   
 
   
   export default Tutors;
   