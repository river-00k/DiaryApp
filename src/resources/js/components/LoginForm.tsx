import { Button, Card, TextField, Theme } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/styles'
import React from 'react'


const useStyles = makeStyles((theme:Theme) => createStyles({
    card:{
        padding: "40px",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "100px",
        width: "30%",
        height: "400px"
    },
    textField:{
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "30px",
        width: "80%"

    },
    button:{
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "30px",
        width: "80%"

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
    <div>
        <Card className={classes.card}>
            <TextField className={classes.textField} label="メールアドレス" variant="outlined" name="email" value={data.email} onChange={inputChange}/>
            <TextField className={classes.textField} label="パスワード" type="password" variant="outlined" name="password" value={data.password} onChange={inputChange} />
            <Button className={classes.button} variant='contained' color="primary" onClick={btnFunc}>ログイン</Button>
            <p>{errMsg}</p>
        </Card>
    </div>
    )
}

export default LoginForm