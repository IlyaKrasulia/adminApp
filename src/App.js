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
  OutlinedInput, 
  TextField ,
  Autocomplete,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

function App() {
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
  width: 100%;
  margin: 0 12px;
`


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
const systems = [
  {title: 'e-app'},
  {title: 'Poster'},
  {title: 'iiko'},
];

// const onAddApp = () => {
//   const newApp = {
//     companyName: addApp.appName,
//     system: addApp.systemName,
//   }
//   setClients(...clients, newApp)
// }
const onDeleteApp = (id) => {
  const index = clients.findIndex(it => it.id === id)
  
  let list = [...clients];
  list.splice(index, 1);
  setClients(list);
  console.log(index);
}

const formik = useFormik({
  initialValues:{
    systemName: '',
    appName: '',
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
        {clients.map((it, index) => {
          return(
            <CadrItem 
            {...it}
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
          <FormStyled>
            <Inputs input placeholder="Приложение" title="Приложение"/>
            <Inputs title="Система"/>
          </FormStyled>
          <ButtonSubmit variant="contained">Готово</ButtonSubmit>
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
   <FormStyled onSubmit={formik.handleSubmit}>
     <FormContainer>
     <InputStyled>
     <p>Приложение</p>   
  <TextField 
    id="appName"
    name="appName"
    type="text"
    value={formik.values.appName}
    onChange={formik.handleChange}
  />
   </InputStyled>
   <InputStyled>
   <p>Система</p> 
   <Autocomplete
     id="systemName"
     freeSolo
     type="text"
     name="systemName"
     onChange={formik.handleChange}
     value={formik.values.systemName}
     options={systems.map((option) => option.title)}
     renderInput={(params) => <TextField {...params} placeholder="Система"/>}
   />
   </InputStyled>
     </FormContainer>
   
    
   <ButtonSubmit type='submit' variant="contained">Готово</ButtonSubmit> 
    </FormStyled>
        </BoxStyled>
        </Modal>
      
      

    </Container>
  );
};

export default App;



