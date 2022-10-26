import { Button, Card, createStyles, makeStyles, TextField, Theme } from '@material-ui/core'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRegister } from '../pages/RegisterPage'
import styled from 'styled-components'

const RegisterInputConteiner = styled.section`
   
    .register-conteiner {
        background-color: white;
        padding: 30px;
        border-radius: 5px;
        border: 1px solid #dfdfdf;
        width: 450px;
        @media (max-width: 450px){
            width: 90vw;
            min-width: 320px;
        }
        
        & form { 
            & h3 {
                text-align: center;
            }
        }
    }

    .form-contents {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        height: 450px;
        width: 100%;
    }

    .name-container {
        display: flex;
        justify-content: space-between;

    }

    .name-input {
        display: flex;
        flex-direction: column;
        width: 48%;

         & input {
             border: 0.5px solid #c1c1c1;
             border-radius: 4px;
             padding: 9px;
         }

         & p {
             color: red;
             font-size: 12px;
         }
    }

    .form-input {
        display: flex;
        flex-direction: column;

         & input {
             border: 0.5px solid #c1c1c1;
             border-radius: 4px;
             padding: 9px;
         }

         & p {
             color: red;
             font-size: 12px;
         }
    }

    .required {
        & ::before {
            content: "*";
            color: red;
        }
    }

    button: {
        width: 100%;
        margin-top: 20px;
    }
`;

const RegisterInputForm= () => {

    

    const {registerInfo, errMsg, inputChange, confirmBtnFunc} = useRegister()

    return (
        <RegisterInputConteiner>
            <div className="register-conteiner">
                <form>
                    <h3>新規登録</h3>
                    <hr/>
                    <div className="form-contents">
                        <div className="name-container">
                            <div className="name-input">
                                <div className="required">
                                    <label>姓</label>
                                </div>
                                <input type="text" placeholder='姓' name="lastName" value={registerInfo.lastName} onChange={inputChange}/>
                                <p>{errMsg.lastNameErr}</p>
                            </div>
                            <div className="name-input">
                                <div className="required">
                                    <label>名</label>
                                </div>
                                <input type="text" placeholder='名' name="firstName" value={registerInfo.firstName} onChange={inputChange}/>
                                <p>{errMsg.firstNameErr}</p>
                            </div>
                        </div>
                        <div className="form-input">
                            <div className="required">
                                <label>メールアドレス</label>
                            </div>
                            <input type="text" placeholder='メールアドレス' name="mail" value={registerInfo.mail} onChange={inputChange}/>
                            <p>{errMsg.mailErr}</p>
                        </div>
                        <div className="form-input">
                            <div className="required">
                                <label>パスワード</label>
                            </div>
                            <input type="password" placeholder='パスワード' name="password" value={registerInfo.password} onChange={inputChange}/>
                            <p>{errMsg.passwordErr}</p>
                        </div>
                        <div className="form-input">
                            <div className="required">
                                <label>パスワード(確認用)</label>
                            </div>
                            <input type="password" placeholder='パスワード' name="passConf" value={registerInfo.passConf} onChange={inputChange}/>
                            <p>{errMsg.passConfErr}</p>
                        </div>
                        <Button className="button" variant="contained" color="primary" onClick={confirmBtnFunc}>確認</Button>
                    </div>
                </form>
            </div>
        </RegisterInputConteiner>  
    )
}

export default RegisterInputForm