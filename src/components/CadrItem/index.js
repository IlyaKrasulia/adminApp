import React from "react";
import styled from '@emotion/styled'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { ListItem, Button } from '@mui/material';

export const CadrItem = ({ app, system, handleOpenEdit, onDelete}) => {



    return(
        <ListItemStyled disablePadding>
                <ItemLeft>
                <TitleCompany>{app.length === 0 ? 'Поле не заполненно' : app}</TitleCompany>
                <SystemName><span>Система:</span>{system ? system : 'Поле не заполненно'}</SystemName>
                </ItemLeft>
                <ItemRight>
                <EditButton onClick={handleOpenEdit}>Редактировать</EditButton>
                <EditButton onClick={onDelete}><DeleteOutlineIcon/></EditButton>
                </ItemRight>
        </ListItemStyled>
    )
}


const ListItemStyled = styled(ListItem, {})`
    background-color: #fff;
    border: 1px solid #D3D9DD;
    border-radius: 5px;
    display: flex;
    padding: 12px 24px;
    justify-content: space-between;
    margin-bottom: 12px;
`;


const TitleCompany = styled.h3`
    font-size: 18px;
    font-weight: 500;
    margin-right: 130px;
`;
const SystemName = styled.h3`
    font-weight: 500;
    span{
    margin-right: 12px;
    color: #6E7F8D;
    }
`

const ItemLeft = styled.div`
    display: flex;
`

const ItemRight = styled.div`
    display: flex;
`
const EditButton = styled(Button, {})`
    color: #73777E;
    border: 1px solid #D6DBE5;
    padding: 12px;
    line-height: 0;
    margin-right: 12px;
    &:last-child{
    margin-right: 0;
    }
`