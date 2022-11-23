
import { Button } from "@mui/material";
import React from 'react'
import styled from 'styled-components'
import { useAuth } from "../contexts/AuthContext";
import {IoBody, IoMailOutline} from "react-icons/io5";


const SettingSection = styled.section`
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .controls {
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
  }

  small {
    display: block;
  }

  .heading,
  .message {
    text-align: center;
  }
`;

const List = styled.ul`
  padding: 0;
  list-style-type: none;
  max-width: 100%;
`;

const Item = styled.li`
  display: grid;
  grid-template-rows: 37px 1fr 37px;
  grid-template-areas:
    'title'
    'description'
    'button';
  grid-gap: ${props => props.theme.spacing['4']};
  box-shadow: ${props => props.theme.boxShadow.default};
  padding: ${props => props.theme.spacing['4']};
  margin: ${props => props.theme.spacing['8']} 0;
  border: 1px solid ${props => props.theme.border.light};
  max-width: 100%;
  margin-top: 0;

  h3 {
    margin: 0 0 ${props => props.theme.spacing['2']};
    overflow: hidden;
    max-width: 100%;
  }

  th {
      padding: 5px;
  }

  .button{
      width: 15%;
      padding: 0;
      font-size: 12px;
  }


  .title {
    grid-area: title;
    display: block;
    max-widh: 100%;
    font-size: ${props => props.theme.fontSize['2xl']};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    @media (min-width: 700px) {
      display: block;
    }
  }

  .description {
    grid-area: description;
    max-width: 100%;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    
  }

  table {
    margin-top: 20px;
    margin-bottom: 20px;
  }


`;

const Icon = styled.section`
  .icon-container { 
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px; 
  }
  
  .icons {
    padding: 5px;
    margin-right: 10px;
  }
`;

const Setting: React.FC = () => {
    const auth = useAuth()
    const user = auth?.user;
  
    return (
        <SettingSection>
            <Item>
                <h3 className="title">ユーザー情報</h3>
                <div className="description">
                  <p>登録されているユーザー情報を変更します</p>
                  <table>
                    <tbody>
                        <tr>
                            <td><IoBody/></td>
                            <td>{user?.name}</td>
                        </tr>
                        <tr>
                            <td><IoMailOutline/></td>
                            <td>{user?.email}</td>
                        </tr>
                      </tbody>
                  </table>
                </div>
                <Button className="button" variant="contained" disabled>変更する</Button>
            </Item>
            <Item>
                <h3 className="title">パスワード</h3>
                <div className="description">
                    <p>登録されているパスワードを変更します</p>
                </div>
                <Button className="button" variant="contained" disabled>変更する</Button>
            </Item>
            <Item>
                <h3 className="title">退会</h3>
                <div className="description">
                  <p>ユーザーアカウントの削除を行います</p>
                </div>
                <Button className="button" variant="contained" onClick={() => auth?.withdrawal(user)}>退会する</Button>
            </Item>

        </SettingSection>
    )

} 
export default Setting