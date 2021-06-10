
import './group.css';

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





import { Select } from 'antd';

const { Option } = Select;

function onChange(value) {
  console.log(`selected ${value}`);
}

function onBlur() {
  console.log('blur');
}

function onFocus() {
  console.log('focus');
}

function onSearch(val) {
  console.log('search:', val);
}


   class Tutors extends React.Component {
     
    state = {
      collapsed: false,
      tutordata:[],
      isModalVisible:false,
      secondisModalVisible:false,
      id:null
    };

Tutors=()=>{
  axios.get(`http://213.230.99.101:2027/api/admin/groups`).then(res=>
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
        axios.post(`http://213.230.99.101:2027/api/admin/group/save`,{
          fullname : document.getElementById('fullname').value,
          username : document.getElementById("username").value,
          address : document.getElementById("address").value,
          password : document.getElementById("password").value
         })
         this.Tutors()
       }
       const DeleteTable=(id)=>{
         axios.delete(`http://213.230.99.101:2027/api/admin/group/delete/${id}`).then(res=>{
           alert("You are very successfull one !!!")
           this.Tutors()
         })
        
       }
       const EditModal=()=>{
   
         axios.put(`http://213.230.99.101:2027/api/admin/group/edit/${this.state.id}`,{
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
         axios.get(`http://213.230.99.101:2027/api/admin/group/${tutorId}`).then(res=>{
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
           title:'Name',
           dataIndex:'name',
           key:'name'
         },
         
         {
           title:'Tutor',
           
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
  <Form.Item>
  <Select
    showSearch
    style={{ width: 200 }}
    placeholder="Select a person"
    optionFilterProp="children"
    onChange={onChange}
    onFocus={onFocus}
    onBlur={onBlur}
    onSearch={onSearch}
    filterOption={(input, option) =>
      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
  >
    <Option value="jack">Jack</Option>
    <Option value="lucy">Lucy</Option>
    <Option value="tom">Tom</Option>
  </Select>
  </Form.Item>
  
</Form>
      </Modal>
      <Modal title="Basic Modal" visible={this.state.isModalVisible} onOk={handleOk} onCancel={handleCancel}>
      <Form>
  <Form.Item  label="name">
    <Input id="fullname" />
  </Form.Item>
  
  <Form.Item  label="Tutor">
  <Select
    showSearch
    style={{ width: 200 }}
    placeholder="Select a person"
    optionFilterProp="children"
    onChange={onChange}
    onFocus={onFocus}
    onBlur={onBlur}
    onSearch={onSearch}
    filterOption={(input, option) =>
      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
  >
    <Option value="jack">Jack</Option>
    <Option value="lucy">Lucy</Option>
    <Option value="tom">Tom</Option>
  </Select>
  </Form.Item>
  
</Form>
      </Modal>
          




      
         </div>
       );
     }
   }
   
 
   
   export default Tutors;
   