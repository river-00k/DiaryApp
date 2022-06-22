import { Button, TextField, Theme } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/styles'
import React from 'react'


const useStyles = makeStyles((theme:Theme) => createStyles({
    formContainer:{
        width:"450px",
        "& form":{
            backgroundColor:"white",
            height:"450px",
            maxWidth:"450px",
            padding:"30px",
            borderRadius:"10px",
            border:"1px solid #dfdfdf",
            boxShadow: "0px 0px 15px -5px #777777",
            "& h2":{
                textAlign:"center"
            }
        }
    },
    uiForm:{
        display:"flex",
        flexDirection:"column",
        justifyContent: "space-evenly",
        height:"300px",
        "& p":{
            color:"red"
        },
    },
    textField:{
        width:"100%"
    },
    button:{   
        width:"100%"
    }
}))

interface LoginFormInterface {
    data: LoginData,
    errMsg: string,
    inputChange:(event: React.ChangeEvent<HTMLInputElement>) => void,
    btnFunc:() => void,

}

const LoginForm:React.FC<LoginFormInterface> = (props) => {

    const classes = useStyles()

    const {data, errMsg, inputChange, btnFunc} = props

    return (
    <div className={classes.formContainer}>
        <form>
            <h2>ログイン</h2>
            <hr/>
            <div className={classes.uiForm}>
                <TextField className={classes.textField} label="メールアドレス" variant="outlined" name="email" value={data.email} onChange={inputChange}/>
                <TextField className={classes.textField} label="パスワード" type="password" variant="outlined" name="password" value={data.password} onChange={inputChange} />
                <Button className={classes.button} variant='contained' color="primary" onClick={btnFunc}>ログイン</Button>
                <p>{errMsg}</p>
                <a href='/register/input'>ユーザー登録がお済みでない方はこちら</a>
            </div>
        </form>
    </div>
    )
}

export default LoginForm