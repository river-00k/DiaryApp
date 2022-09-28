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
        height: 300px;

        & p {
            margin-top: 25px;
            margin-bottom: 15px;
            text-align: center;
            color: red;
            font-size: 15px;
        }

        &table {
            margin: 20px;
            & tr {
                padding: 30px;
                & th {
                    font-size: 15px;
                }
                & td {
                    font-size: 15px;
                    padding: 20px;
                }
            }

        }
    }
   
    button: {
        width: 100%;
        margin-top: 15px;
    }
`;

const useSytles = makeStyles((theme:Theme) => createStyles({
    registerContainer:{
        backgroundColor:"white",
        padding:"30px",
        borderRadius:"10px",
        border:"1px solid #dfdfdf",
        boxShadow: "0px 0px 15px -5px #777777",
        "& form":{
            "& h3":{
                textAlign:"center"
            }
        }
    },
    formContents:{
        display:"flex",
        flexDirection:"column",
        justifyContent:"space-evenly",
        // height:"450px", 
        width: "400px",
        "& p":{
            marginTop:"25px",
            marginBottom:"15px",
            textAlign:"center",
            color:"red",
            fontSize:"15px"     
        },
        "& table":{
            margin:"20px",
            "& tr":{
                padding:"30px",
                " & th":{
                    fontSize:"15px"
                },
                "& td":{
                    fontSize:"15px",
                    padding:"20px"
                }
            }
        }
    },
    button:{
        width:"90%",
        margin:"15px"
    }
    
}))

const RegisterCompleteForm = () => {

    const classes = useSytles()

    const {registerInfo, completeBtnFunc} = useRegister()

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
                                <td>{registerInfo.password}</td>
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