import { createStyles, makeStyles, Theme } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Navigate, Outlet, useNavigate, useOutletContext } from 'react-router-dom'
import Header from '../components/Header'
import RegisterForm from '../components/RegisterInputForm'

const useStyles = makeStyles((theme:Theme) => createStyles({
  registerPageContainer:{
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    width:"100%",
    height:"100vh",
  }
}))

type ContextType = {
    registerInfo: RegisterInputData,
    errMsg: RegisterErrMsg
    inputChange: (event: React.ChangeEvent<HTMLInputElement>) => {}
    confirmBtnFunc: () => {} 
    modifyBtnFunc: () => {}
}

const RegisterPage = () => {
  const classes = useStyles()
  const navigate = useNavigate()

  const [registerInfo, setRegisterInfo] = useState<RegisterInputData>({firstName:"", lastName:"", mail:"", password:"", passConf:""})
  
  const [errMsg, setErrMsg] = useState<RegisterErrMsg>({firstNameErr:"", lastNameErr:"", mailErr:"", passConfErr:"", passwordErr:""})

  const [inputChecker, setInputChecker] = useState<number>(0)

  useEffect(()=>{
    if(!inputChecker){
      navigate("/register/input")
    }
  },[] )

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

const confirmBtnFunc = () => {
    if(validate()) {return}
    setInputChecker(1)
    navigate("/register/confirm") 

}

const modifyBtnFunc = () => {
   navigate(-1)
}

  const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const key = event.target.name
    const value = event.target.value
    registerInfo[key] = value
    const data = Object.assign({}, registerInfo)
    setRegisterInfo(data)
}

  return (
    <div className={classes.registerPageContainer}>
        <Header/>
        <Outlet context={{registerInfo, errMsg ,inputChange, modifyBtnFunc, confirmBtnFunc}}/>
    </div>
  )
}
export default RegisterPage

export const useRegister = ():ContextType => {
  return useOutletContext<ContextType>()
}


