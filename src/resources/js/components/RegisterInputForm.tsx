import { Button, Card, createStyles, makeStyles, TextField, Theme } from '@material-ui/core'
import React, { useState } from 'react'

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

interface RegisterInputFomInterface{
    registerInfo:RegisterData,

}

const RegisterForm= () => {

    const classes = useSytles()

    const [registerInfo, setRegisterInfo] = useState<RegisterInputData>({firstName:"", lastName:"", mail:"", password:"", passConf:""})
    const [errMsg, setErrMsg] = useState<RegisterErrMsg>({firstNameErr:"", lastNameErr:"", mailErr:"", passConfErr:"", passwordErr:""})

    
    const validate = (): boolean => {
        
        let errFlg:boolean = false
        const regexp:RegExp = /^[a-zA-Z0-9_+-]+(\.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/

        if(!registerInfo.firstName){
            errMsg.firstNameErr = "名を入力してください"
            errFlg = true
        }else{
            errMsg.firstNameErr = ""
        }
        if(!registerInfo.lastName){
            errMsg.lastNameErr = "姓を入力してください"
            errFlg = true
        }else{
            errMsg.lastNameErr = ""
        }
        if(!registerInfo.mail){
            errMsg.mailErr = "メールアドレスを入力してください"
            errFlg = true
        }else if(!regexp.test(registerInfo.mail)){
            errMsg.mailErr = "正しいメールアドレスを入力してください"
            errFlg = true
        }else{
            errMsg.mailErr = ""
        }
        if(!registerInfo.password){
            errMsg.passwordErr = "パスワードを入力してください"
            errFlg = true
        }else if(registerInfo.password.length < 8){
            errMsg.passwordErr = "パスワードは8文字以上で設定してください"
            errFlg = true
        }else if((registerInfo.password && registerInfo.passConf) && (registerInfo.password != registerInfo.passConf)){
            errMsg.passwordErr = "パスワードの入力値が異なります"
            errFlg = true
        }
        else{
            errMsg.passwordErr = ""
        }
        if(!registerInfo.passConf){
            errMsg.passConfErr = "確認用パスワードを入力してください"
            errFlg = true
        }else if(registerInfo.passConf.length < 8){
            errMsg.passConfErr = "パスワードは8文字以上で設定してください"
            errFlg = true
        }else if((registerInfo.password && registerInfo.passConf) && (registerInfo.password != registerInfo.passConf)){
            errMsg.passConfErr = "パスワードの入力値が異なります"
            errFlg = true
        }else{
            errMsg.passConfErr = ""
        }
        
      
        const data:RegisterErrMsg = Object.assign({}, errMsg)
        setErrMsg(data)

        return errFlg
    }

    const btnFunc = () => {

        if(validate()) {return}
        console.log("nextpage")

    }

    const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const key = event.target.name
        const value = event.target.value
        registerInfo[key] = value
        const data = Object.assign({}, registerInfo)
        setRegisterInfo(data)
    }

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
                    <Button className={classes.button} variant="contained" color="primary" onClick={btnFunc}>確認</Button>
                </div>
            </form>
        </div>
    )
}

export default RegisterForm