import styled from '@emotion/styled'
import React from "react";
import 
{
FormControl,
OutlinedInput, 
Stack,
Autocomplete,
TextField
} from '@mui/material';


export const Inputs = ({ title, placeholder, typeInput, value, onBlur, onChange, type, name}) => {
    
const FormControlStyled = styled(FormControl, {})`
   width: 100%;    
   margin: 0 12px; 
`
const systems = [
    {title: 'e-app'},
    {title: 'Poster'},
    {title: 'iiko'},
]
    return(   
        <FormControlStyled>
        {typeInput===true ? 
        <> 
        <p>{title}</p>   
        <OutlinedInput
          placeholder={placeholder}
          value={value}
          onBlur={onBlur}
          onChange={onChange}
          type={type}
        name={name}
        />
        </>
        : <Stack>
            <p>{title}</p>  
      <Autocomplete
        id="free-solo-demo"
        freeSolo
        options={systems.map((option) => option.title)}
        renderInput={(params) => <TextField {...params} placeholder="Система"/>}
      />
     
    </Stack>}



      </FormControlStyled>      
    )
}

