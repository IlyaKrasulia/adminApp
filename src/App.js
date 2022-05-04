import React from 'react';
import { Formik, useFormik } from 'formik';
import './App.scss';
import { CadrItem } from './components/CadrItem';
import { Inputs } from './components/Inputs';
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
  InputLabel,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';


function App() {

const[openedModalEdit, setopenedModalEdit] = React.useState(false);
const[openedModalAdd, setopenedModalAdd] = React.useState(false);
const[clients, setClients] = React.useState([
  { id: 1,companyName: 'sushimaster', system: 'iiko'},
  { id: 2,companyName: 'sushimaster', system: 'Poster'},
  { id: 3,companyName: 'sushimaster', system: 'E-app'},
  { id: 4,companyName: 'sushimaster', system: 'E-app'},
]);

const handleOpenEidt = () => {
  setopenedModalEdit(!openedModalEdit);
};
const handleOpenAdd = () => {
  setopenedModalAdd(!openedModalAdd);
};
const onAddApp = () => {
  const newApp = {
    id: Math.random().toFixed(2),
    companyName: formikAdd.values.appName,
    system: formikAdd.values.systemName,
  }
  setopenedModalAdd(false)
  setClients([...clients, newApp])
}
const onDeleteApp = (id) => {
  const index = clients.findIndex(it => it.id === id);
  
  let list = [...clients];
  list.splice(index, 1);
  setClients(list);
  console.log(index);
}

const validate = values => {

};
const formikEdit = useFormik({
  initialValues:{
    appName: '',
    systemName: '',
    token: '',
    account: '',
    url: '',
    user: '',
    secret: '',
    organization: '',
  }, 
  onSubmit: values => {
    console.log(JSON.stringify(values, null, 2));
  },
});

const formikAdd = useFormik({
  initialValues:{
    appName: '',
    systemName: '',
    token: '',
    account: '',
    url: '',
    user: '',
    secret: '',
    organization: '',
  }, 
  onSubmit: values => {
    console.log(JSON.stringify(values, null, 2));
  },
});


  return (
    <Container fixed>
      <div className='top'>
        <h2>Клиенты</h2>
        <StyledButtonAdd size='small' onClick={handleOpenAdd}>
          <AddIcon />
        </StyledButtonAdd>
      </div>
      <div>
        {clients.map((it) => {
          return(
            <CadrItem 
            id={it.id}
            companyName={it.companyName}
            system={it.system}
            onClick={handleOpenEidt}
            onDelete={() => onDeleteApp(it.id)}
            key={it.id}/>
          )
        })}
      </div>


      <Modal
        open={openedModalEdit}
        onClose={handleOpenEidt}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
       
        <BoxStyled>
          <ModalTitleStyled>Редактирование <CloseIcon onClick={handleOpenEidt}/></ModalTitleStyled>
          <FormStyled onSubmit={formikEdit.handleSubmit}>
     <FormContainer>
     <InputStyled>
     <p>Приложение</p>   
    <TextField 
      id="appName"
      name="appName"
      value={formikEdit.values.appName}
      onChange={formikEdit.handleChange}
    />
   </InputStyled>
   <InputStyled>
   <p>Система</p> 
   <FormControl fullWidth>
  <Select
    id="systemName"
    name="systemName"
    labelId="demo-simple-select-label"
    value={formikEdit.values.systemName}
    onChange={formikEdit.handleChange}
  >
  
    <MenuItem value={"E-app"}>E-app</MenuItem>
    <MenuItem value={"Poster"}>Poster</MenuItem>
    <MenuItem value={"iiko"}>iiko</MenuItem>
  </Select>
</FormControl>
</InputStyled>

{ 
formikEdit.values.systemName==='Poster' ?
 <>
<InputStyled>
     <p>Token</p>   
    <TextField 
      id="token"
      name="token"
      placeholder='введите'
      value={formikEdit.values.token}
      onChange={formikEdit.handleChange}
    />
   </InputStyled>
   <InputStyled>
   <p>Account</p>   
  <TextField 
    placeholder='введите'
    id="account"
    name="account"
    value={formikEdit.values.account}
    onChange={formikEdit.handleChange}
  />
 </InputStyled>
</> 

: 
formikEdit.values.systemName==='iiko' ? 
 <>
<InputStyled>
     <p>URL</p>   
    <TextField 
      id="url"
      name="url"
      placeholder='введите'
      value={formikEdit.values.url}
      onChange={formikEdit.handleChange}
    />
   </InputStyled>
   <InputStyled>
   <p>User</p>   
  <TextField 
    placeholder='введите'
    id="user"
    name="user"
    value={formikEdit.values.user}
    onChange={formikEdit.handleChange}
  />
 </InputStyled>
 <InputStyled>
     <p>Secret</p>   
    <TextField 
      id="secret"
      name="secret"
      placeholder='введите'
      value={formikEdit.values.secret}
      onChange={formikEdit.handleChange}
    />
   </InputStyled>
   <InputStyled>
   <p>Organization</p>   
  <TextField 
    placeholder='введите'
    id="organization"
    name="organization"
    value={formikEdit.values.organization}
    onChange={formikEdit.handleChange}
  />
 </InputStyled>
</> : ''
} 
     </FormContainer>
   
    
   <ButtonSubmit type='submit' onClick={onAddApp} variant="contained">Готово</ButtonSubmit> 
    </FormStyled>
        </BoxStyled>
      </Modal>



         <Modal
        open={openedModalAdd}
        onClose={handleOpenAdd}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
       
        <BoxStyled>
          <ModalTitleStyled>Добавить нового клиента<CloseIcon onClick={handleOpenAdd}/></ModalTitleStyled>         
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
   
    
   <ButtonSubmit type='submit' onClick={onAddApp} variant="contained">Готово</ButtonSubmit> 
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