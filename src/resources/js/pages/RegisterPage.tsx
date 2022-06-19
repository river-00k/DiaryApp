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
    registerInfo: RegisterInputData
}

const RegisterPage = () => {
  const classes = useStyles()
  const navigate = useNavigate()

  const [registerInfo, setRegisterInfo] = useState<RegisterInputData>({firstName:"", lastName:"", mail:"", password:"", passConf:""})
  
  // useEffect(()=>{
  //   if((!registerInfo.firstName) || (!registerInfo.lastName) || (!registerInfo.mail) || (!registerInfo.password) || (!registerInfo.passConf)){
  //     navigate("/register/input")
  //   }
  // },[] )

  

  return (
    <div className={classes.registerPageContainer}>
        <Header/>
        <Outlet context={{registerInfo}}/>
    </div>
  )
}
export default RegisterPage

export const useRegisterInfo = () => {
  return useOutletContext<ContextType>()
}


