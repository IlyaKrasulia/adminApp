import React, { useState, useEffect } from 'react';
import {  Formik, useFormik } from 'formik';
import axios from 'axios';
import './App.scss';
import { CadrItem } from './components/CadrItem';
import styled from '@emotion/styled'
import Container from '@mui/material/Container';
import 
{
  Fab,
  Modal,
  Box, 
  Button,
  FormControl,
  MenuItem, 
  TextField ,
  Select,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';


function App() {
const [clients, setClients ] = useState([]);
const [ editClientData, setEditClientData ] = useState(null);
const [ typeForm, setTypeForm ] = useState(false);
const [ statusModal, setStatusModal ] = useState(false);

   
useEffect(() => {
    axios.get('https://e-admin.com.ua/pay-api/get_clients.php').then(res => {
      setClients(res.data)
    })
}, [])
const openModal = ( type, data ) => {
  if(type === 'edit'){
    setEditClientData(data);
  } else {
    console.log('add');
  }
  setTypeForm(type)
  setStatusModal(true);
};

const closeModal = () => {
  setStatusModal(false);
}

const onDeleteApp = (id) => {
  const index = clients.findIndex(it => it.id === id);
  
  let list = [...clients];
  list.splice(index, 1);
  setClients(list);
  console.log(index);
}

const editApp = ( data ) => {
  const index = clients.findIndex(it => it.app === data.app);
  let list = [...clients];
  list[index] = data;
  setClients(list);
  setStatusModal(false);
};

const addApp = ( values ) => {
  console.log(values);
  const newItem = {
    "app": formikAdd.values.app,
    data: {
      "system": formikAdd.values.system,
      "url": formikAdd.values.url,
      "user": formikAdd.values.user,
      "secret": formikAdd.values.secret,
      "organization": formikAdd.values.organization,
      "account": formikAdd.values.account,
      "token": formikAdd.values.token,
    }
    
  }
  setClients([...clients, newItem]);
  setStatusModal(false);

  console.log(newItem, '=>newItem');
  axios.post('http://e-admin.com.ua/pay-api/add_client.php', newItem)


};
const defaultInitialValues = {
  app: editClientData ? editClientData.app : '',
  system: editClientData ? editClientData.system : '',
  token: editClientData ? editClientData.token : '',
  account: editClientData ? editClientData.account : '',
  url: editClientData ? editClientData.url : '',
  user: editClientData ? editClientData.user : '',
  secret: editClientData ? editClientData.secret : '',
  organization: editClientData ? editClientData.organization : '',
};

// const validate = values => {
//   const errors = {};
//   if(values.app.length < 3) {
//     alert('Названия приложения должно быть как минимум из 3 символов');
//   };
//   if(values.app.length > 10) {
//     alert('Названия приложения должно быть до 10 символов');
//   };
//   if(!values.app || !values.system || !values.token || !values.account || !values.url || !values.user || !values.secret || !values.organization){
//     alert('Заполните все поля')
//   }
//   return errors
// }

const formikAdd = useFormik({
  initialValues: defaultInitialValues, 
  onSubmit: values => {
    console.log(JSON.stringify(values, null, 2));
    if(typeForm === 'edit'){
      editApp(values)
    } else {
      addApp(values)
    }
  },
  // validate,
  enableReinitialize: true,
});

  return (
    <Container fixed>
      <div className='top'>
        <h2>Клиенты</h2>
        <StyledButtonAdd size='small' onClick={() => openModal('add')}>
          <AddIcon />
        </StyledButtonAdd>
      </div>
      <div>
        {clients.map((it) => {
          return(
            <CadrItem 
              app={it.app}
              {...it.data}
              handleOpenEdit={() => openModal('edit', it)}
              onDelete={() => onDeleteApp(it.id)}
              />
          )
        })}
      </div>

         <Modal
        open={statusModal}
        onClose={closeModal}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
       
        <BoxStyled>
          <ModalTitleStyled>
            {typeForm === 'add' ? 'Добавить нового клиента' : 'Редактировать'}
            <CloseIcon onClick={closeModal}/>
          </ModalTitleStyled>         
   <FormStyled onSubmit={formikAdd.handleSubmit}>
     <FormContainer>
     <InputStyled>
     <p>Приложение</p>   
    <TextField 
      disabled={typeForm==='edit'?true:false}
      id="app"
      name="app"
      value={formikAdd.values.app}
      onChange={formikAdd.handleChange}
    />
   </InputStyled>
   <InputStyled>
   <p>Система</p> 
   <FormControl fullWidth>
  <Select
    id="system"
    name="system"
    labelId="demo-simple-select-label"
    value={formikAdd.values.system}
    onChange={formikAdd.handleChange}
  >
  
    <MenuItem value={"E-app"}>e-app</MenuItem>
    <MenuItem value={"Poster"}>poster</MenuItem>
    <MenuItem value={"iiko"}>iiko</MenuItem>
  </Select>
</FormControl>
</InputStyled>

{ 
formikAdd.values.system==='Poster' ?
 <>
<InputStyled>
     <p>Token</p>   
    <TextField 
      id="token"
      name="token"
      placeholder='введите'
      value={formikAdd.values.token}
      onChange={formikAdd.handleChange}
    />
   </InputStyled>
   <InputStyled>
   <p>Account</p>   
  <TextField 
    placeholder='введите'
    id="account"
    name="account"
    value={formikAdd.values.account}
    onChange={formikAdd.handleChange}
  />
 </InputStyled>
</> 

: 
formikAdd.values.system==='iiko' ? 
 <>
<InputStyled>
     <p>URL</p>   
    <TextField 
      id="url"
      name="url"
      placeholder='введите'
      value={formikAdd.values.url}
      onChange={formikAdd.handleChange}
    />
   </InputStyled>
   <InputStyled>
   <p>User</p>   
  <TextField 
    placeholder='введите'
    id="user"
    name="user"
    value={formikAdd.values.user}
    onChange={formikAdd.handleChange}
  />
 </InputStyled>
 <InputStyled>
     <p>Secret</p>   
    <TextField 
      id="secret"
      name="secret"
      placeholder='введите'
      value={formikAdd.values.secret}
      onChange={formikAdd.handleChange}
    />
   </InputStyled>
   <InputStyled>
   <p>Organization</p>   
  <TextField 
    placeholder='введите'
    id="organization"
    name="organization"
    value={formikAdd.values.organization}
    onChange={formikAdd.handleChange}
  />
 </InputStyled>
</> : ''
} 
     </FormContainer>
   
    
   <ButtonSubmit type='submit' variant="contained">Готово</ButtonSubmit> 
    </FormStyled>
        </BoxStyled>
        </Modal>
      
      

    </Container>
  );
};

export default App;





const StyledButtonAdd = styled(Fab, {})`
  background: #FF4A6B;
  color: #fff;
  &:hover{
    background-color: #FF4A8B;
  }
`
const BoxStyled = styled(Box, {})`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 702px;
  background-color: #fff;
  box-shadow: 24;
  padding: 34px 24px;
`
const ModalTitleStyled = styled.h2`
  display: flex;
  align-items: center;
  justify-content: space-between;
  svg{
    cursor: pointer;
  }
`
const FormStyled = styled.form`
`
const FormContainer = styled.div`
margin-bottom: 30px;
display: flex;
flex-wrap: wrap;
`
const ButtonSubmit = styled(Button, {})`
background: #FF4A6B;
border-radius: 5px;
display: flex;
margin: 0 auto;
&:hover{
  background-color: #FF4A8B;
}
`
const InputStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 46%;
  margin: 0 12px;`