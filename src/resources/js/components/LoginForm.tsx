import { Button, TextField, Theme } from '@material-ui/core'
import React from 'react'
import styled from 'styled-components'

const LoginFormSection = styled.section`
    .login-form-container {
        @media (min-width: 450px){
            width: 450px;
        }
    }

    form {
        background-color: white;
        height: 450px;
        width: 450px;
        padding: 30px;
        border-radius: 5px;
        border: 1px solid #dfdfdf;
        display: flex;
        flex-flow: column;
        @media (max-width: 450px){
            width:90vw;
            min-width: 320px;
        }

        & h2{
            text-align: center;
            margin-bottom: 0px;
        }
    }

    .ui-form {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        height: 300px;
        & p {
            color: red;
        }
    }

    .text-field {
        width: 100%;
    }

    .button: {
        width: 20%;
    }

`


interface LoginFormInterface {
    data: LoginData,
    errMsg: string,
    inputChange:(event: React.ChangeEvent<HTMLInputElement>) => void,
    btnFunc:() => void,

}

const LoginForm:React.FC<LoginFormInterface> = (props) => {

    const {data, errMsg, inputChange, btnFunc} = props

    return (
    <LoginFormSection>
        <div className="login-form-container">
            <form>
                <h2>ログイン</h2>
                <hr/>
                <div className="ui-form">
                    <TextField className="text-field" label="メールアドレス" variant="outlined" name="email" value={data.email} onChange={inputChange}/>
                    <TextField className="text-field" label="パスワード" type="password" variant="outlined" name="password" value={data.password} onChange={inputChange} />
                    <Button className="button" variant='contained' color="primary" onClick={btnFunc}>ログイン</Button>
                    <p>{errMsg}</p>
                    <a href='/register/input'>ユーザー登録がお済みでない方はこちら</a>
                </div>
            </form>
        </div>
    </LoginFormSection>
    )
}

export default LoginForm