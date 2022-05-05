import React, { useState } from 'react';
import {  useFormik } from 'formik';
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

// const [ openedModalEdit, setopenedModalEdit ] = useState(false);
// const [ openedModalAdd, setopenedModalAdd ] = useState(false);
const[clients, setClients] = useState([
  { id: 0, appName: 'sushimaster 1', systemName: 'iiko'},
  { id: 1, appName: 'sushimaster 2', systemName: 'Poster'},
  { id: 2, appName: 'sushimaster 3', systemName: 'E-app'},
  { id: 3, appName: 'sushimaster 4', systemName: 'E-app'},
]);
const [ editClientData, setEditClientData ] = useState(null);
const [ typeForm, setTypeForm ] = useState(false);
const [ statusModal, setStatusModal ] = useState(false);

const openModal = ( type, data ) => {
  if(type === 'edit'){
    setEditClientData(data);
    console.log(data);
  } else {
    console.log('add');
  }
  setTypeForm(type)
  setStatusModal(true);
};

const closeModal = () => {
  setStatusModal(false);
}



const onAddApp = () => {
  const newApp = {
    id: Math.random().toFixed(2),
    appName: defaultInitialValues.values.appName,
    systemName: defaultInitialValues.values.systemName,
  }
  // setopenedModalAdd(false)
  console.log(defaultInitialValues.values.appName);
  setClients([...clients, newApp])
}

const onDeleteApp = (id) => {
  const index = clients.findIndex(it => it.id === id);
  
  let list = [...clients];
  list.splice(index, 1);
  setClients(list);
  console.log(index);
}

const editApp = ( data ) => {
  const index = clients.findIndex(it => it.appName === data.appName);
  let list = [...clients];
  list[index] = data;
  setClients(list);
};
console.log(clients);
const defaultInitialValues = {
  appName: editClientData ? editClientData.appName : '',
  systemName: editClientData ? editClientData.systemName : '',
  token: '',
  account: '',
  url: '',
  user: '',
  secret: '',
  organization: '',
};

const formikAdd = useFormik({
  initialValues: defaultInitialValues, 
  onSubmit: values => {
    console.log(JSON.stringify(values, null, 2));
    if(typeForm === 'edit'){
      editApp(values)
    } 
  },
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
              id={it.id}
              appName={it.appName}
              systemName={it.systemName}


              handleOpenEdit={() => openModal('edit', it)}


              onDelete={() => onDeleteApp(it.id)}
              key={it.id}/>
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
      id="appName"
      name="appName"
      value={formikAdd.values.appName}
      onChange={formikAdd.handleChange}
    />
   </InputStyled>
   <InputStyled>
   <p>Система</p> 
   <FormControl fullWidth>
  <Select
    id="systemName"
    name="systemName"
    labelId="demo-simple-select-label"
    value={formikAdd.values.systemName}
    onChange={formikAdd.handleChange}
  >
  
    <MenuItem value={"E-app"}>E-app</MenuItem>
    <MenuItem value={"Poster"}>Poster</MenuItem>
    <MenuItem value={"iiko"}>iiko</MenuItem>
  </Select>
</FormControl>
</InputStyled>

{ 
formikAdd.values.systemName==='Poster' ?
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
formikAdd.values.systemName==='iiko' ? 
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