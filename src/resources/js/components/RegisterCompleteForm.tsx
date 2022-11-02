import { Button, createStyles, makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import { useRegister } from '../pages/RegisterPage'
import styled from 'styled-components'

const RegisterCompleteConteiner = styled.section`
   
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
        width: 100%;
        height: 350px;

        p {
            margin-bottom: 10px;
            text-align: center;
            color: red;
            font-size: 15px;
        }

        table {
            margin: 20px;
            & tr {
                padding: 30px;
                & th {
                    font-size: 15px;
                    padding-bottom: 10px;
                }
                & td {
                    font-size: 15px;
                }
            }

        }
    }
   
    button: {
        width: 100%;
        margin-top: 15px;
    }
`;


const RegisterCompleteForm = () => {


    const {registerInfo, completeBtnFunc} = useRegister()

    const maskPassword = (password: string): string => {
        
        let maskString:string = "";
        
        for (let i = 0; i < password.length; i++){
            maskString = maskString + "⚫︎"
        }

        return maskString;
    }

    const userName = registerInfo.lastName+registerInfo.firstName

    return (
        <RegisterCompleteConteiner>
            <div className="register-conteiner">
                <form>
                    <h3>新規登録</h3>
                    <hr/>
                    <div className="form-contents">
                        <table>
                            <tr>
                                <th>氏名</th>
                                <td>{userName}</td>
                            </tr>
                            <tr>
                                <th>メールアドレス</th>
                                <td>{registerInfo.mail}</td>
                            </tr>
                            <tr>
                                <th>パスワード</th>
                                <td>{maskPassword(registerInfo.password)}</td>
                            </tr>
                        </table>
                        <p>お客様情報の登録が完了しました</p>
                        <Button className="button"  variant="contained" color="primary" onClick={completeBtnFunc}>ログイン画面に戻る</Button>
                    </div>
                </form>
            </div>
        </RegisterCompleteConteiner>
    )
}

export default RegisterCompleteForm