import { createStyles, makeStyles, Theme } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme: Theme) => createStyles({
    header:{
        width:"100%",
        height:"32px",
        backgroundColor:"#3f51b5",
        display:"flex",
        justifyContent:"space-around",
        alignItems:"center",
        color:"white",
        position:"fixed",
        top:"0",
        left:"0",
        "& nav":{
            "& ul":{
                margin:"0",
                "& li":{
                    listStyle:"none",
                    display:"inline-block",
                    marginRight:"30px",
                    "& a":{
                        fontSize:"16px",
                        textDecoration:"none",
                        color:"white",
                        "&:hover":{
                            color:"green"
                        }
                    }
                }
            }
        }
    },
    tytle:{
        "& h3":{
            margin:"0"
        }
    }
}))

const Header = () => {

    const classes = useStyles();

    return (
        <div className={classes.header}>
            <div className={classes.tytle}>
                <h3>サンプルアプリケーション</h3>
            </div>
            <nav>
                <ul>
                    <li>
                        <a href="#">トップ</a>
                    </li>
                    <li>
                        <a href="/login">ログイン</a>
                    </li>
                    <li>
                        <a href="/register/input">新規登録</a>
                    </li>

                </ul>
            </nav>
        </div>
    )
}

export default Header