import React from "react";
import { Card, TextField, Button } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core";
import { auto } from "@popperjs/core";


const useStyles = makeStyles((theme) => createStyles({
    card:{
        padding: theme.spacing(3),
        marginLeft: auto,
        marginRight: auto,
        marginTop: "30px",
        width: "60%",
        height:"400px",
    },
    textField:{
        margin: theme.spacing(2),
        width: "80%"
    },
    button: {
        margin: theme.spacing(2)
    }
}));

const LoginForm = (props) => {

    const classes = useStyles();

    const {data, errMsg, inputChange, btnFunc} = props;

    return(
        <Card className={classes.card}>
            <h2>ログイン</h2>
            <TextField className={classes.textField} label="メールアドレス" variant="outlined" name="email" value={data.email} onChange={inputChange}/>
            <TextField className={classes.textField} label="パスワード" type="password" variant="outlined" name="password" value={data.password} onChange={inputChange}/>
            <p>{errMsg}</p>
            <Button className={classes.button} variant="contained" color="primary" onClick={btnFunc}>ログイン</Button>
        </Card>
    );
}
export default LoginForm;

