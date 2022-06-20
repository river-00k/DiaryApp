import { Button, createStyles, makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import { useRegister } from '../pages/RegisterPage'

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
            marginBottom:"20px",
            textAlign:"center",
            color:"red"
            
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
        display:"flex",
        justifyContent:"space-between",
        margin:"5px"
    }
    
}))

const RegisterConfirm = () => {

    const classes = useSytles()

    const {registerInfo, modifyBtnFunc} = useRegister()

    //const userData:RegisterInputData = {firstName:"航平", lastName:"大川", mail:"ookawa2@sample.com", password:"password", passConf:"passConf"}

    const userName = registerInfo.lastName+registerInfo.firstName

    return (
        <div className={classes.registerContainer}>
            <form>
                <h3>新規登録</h3>
                <hr/>
                <div className={classes.formContents}>
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
                    <p>上記の内容でお間違いないかご確認ください</p>
                    <div className={classes.button}>
                        <Button variant="contained" color="primary" onClick={modifyBtnFunc}>修正する</Button>
                        <Button variant="contained" color="primary">登録する</Button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default RegisterConfirm