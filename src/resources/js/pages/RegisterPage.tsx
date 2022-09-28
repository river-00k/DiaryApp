import { createStyles, makeStyles, Theme } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Navigate, Outlet, useNavigate, useOutletContext } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Header from '../components/Header'
import RegisterForm from '../components/RegisterInputForm'
import styled from 'styled-components'

const useStyles = makeStyles((theme:Theme) => createStyles({
  registerPageContainer:{
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    width:"100%",
    height:"100vh",
  }
}))

const RegisterPageSection = styled.section`
    .register-page-container{
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

type ContextType = {
    registerInfo: RegisterInputData,
    errMsg: RegisterErrMsg
    inputChange: (event: React.ChangeEvent<HTMLInputElement>) => {}
    confirmBtnFunc: () => {} 
    modifyBtnFunc: () => {}
    registerBtnFunc: (registerData: RegisterData) => {}
    completeBtnFunc: () => {}
}

const RegisterPage = () => {
  const classes = useStyles()
  const navigate = useNavigate()
  const auth = useAuth()

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

  //入力画面で確認ボタン押下時の処理
  const confirmBtnFunc = () => {
      if(validate()) {return}
      setInputChecker(1)
      navigate("/register/confirm") 

  }

  //確認画面で修正ボタン押下時の処理
  const modifyBtnFunc = () => {
    navigate(-1)
  }

  //確認画面で登録ボタン押下時の処理
  const registerBtnFunc = (registerData: RegisterData) => {
    auth?.register(registerData)
      .then(() => {
        navigate('/register/complete')
      })
      .catch((err)=>{
        console.log('ユーザー登録に失敗しました')
      })

  }

  //完了画面でログイン画面へ戻るボタン押下時の処理
  const completeBtnFunc = () => {
    navigate("/login")
  }

  const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const key = event.target.name
    const value = event.target.value
    registerInfo[key] = value
    const data = Object.assign({}, registerInfo)
    setRegisterInfo(data)
  }

  return (
    <RegisterPageSection>
      <Header/>
      <div className="register-page-container">
          <Outlet context={{registerInfo, errMsg ,inputChange, modifyBtnFunc, confirmBtnFunc, registerBtnFunc, completeBtnFunc}}/>
      </div>
    </RegisterPageSection>
  )
}
export default RegisterPage

export const useRegister = ():ContextType => {
  return useOutletContext<ContextType>()
}


