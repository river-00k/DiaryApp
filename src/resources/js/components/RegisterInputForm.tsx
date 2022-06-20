import { Button, Card, createStyles, makeStyles, TextField, Theme } from '@material-ui/core'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
        height:"450px", 
        width: "400px"
    },
    nameInput:{
     display:"flex",
     justifyContent:"space-between"
    },
    formInput:{
        display:"flex",
        flexDirection:"column",
        "& input":{
            border:"0.5px solid #c1c1c1",
            borderRadius:"4px",
            padding:"9px",
        },
        "& p":{
            color: "red",
            fontSize:"12px"
        }
    },
    required:{
        "& ::before":{
            content: '"*"',
            color: "red"
        },
    },
    button:{
        width:"100%",
        marginTop:"20px"
    }
    
}))

const RegisterForm= () => {

    const classes = useSytles()

    const {registerInfo, errMsg, inputChange, confirmBtnFunc} = useRegister()

    return (
        <div className={classes.registerContainer}>
            <form>
                <h3>新規登録</h3>
                <hr/>
                <div className={classes.formContents}>
                    <div className={classes.nameInput}>
                        <div className={classes.formInput}>
                            <div className={classes.required}>
                                <label>姓</label>
                            </div>
                            <input type="text" placeholder='姓' name="lastName" value={registerInfo.lastName} onChange={inputChange}/>
                            <p>{errMsg.lastNameErr}</p>
                        </div>
                        <div className={classes.formInput}>
                            <div className={classes.required}>
                                <label>名</label>
                            </div>
                            <input type="text" placeholder='名' name="firstName" value={registerInfo.firstName} onChange={inputChange}/>
                            <p>{errMsg.firstNameErr}</p>
                        </div>
                    </div>
                    <div className={classes.formInput}>
                        <div className={classes.required}>
                            <label>メールアドレス</label>
                        </div>
                        <input type="text" placeholder='メールアドレス' name="mail" value={registerInfo.mail} onChange={inputChange}/>
                        <p>{errMsg.mailErr}</p>
                    </div>
                    <div className={classes.formInput}>
                        <div className={classes.required}>
                            <label>パスワード</label>
                        </div>
                        <input type="password" placeholder='パスワード' name="password" value={registerInfo.password} onChange={inputChange}/>
                        <p>{errMsg.passwordErr}</p>
                    </div>
                    <div className={classes.formInput}>
                        <div className={classes.required}>
                            <label>パスワード(確認用)</label>
                        </div>
                        <input type="password" placeholder='パスワード' name="passConf" value={registerInfo.passConf} onChange={inputChange}/>
                        <p>{errMsg.passConfErr}</p>
                    </div>
                    <Button className={classes.button} variant="contained" color="primary" onClick={confirmBtnFunc}>確認</Button>
                </div>
            </form>
        </div>
    )
}

export default RegisterForm