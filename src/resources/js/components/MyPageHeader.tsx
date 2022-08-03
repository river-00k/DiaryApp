import { createStyles, makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import { useAuth } from '../contexts/AuthContext';

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
                    "& button":{
                        fontSize:"16px",
                        background:"transparent",
                        border:"0",
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

const MyPageHeader = () => {

    const classes = useStyles();

    const auth = useAuth()

    const btnFunc = auth?.logout

    return (
        <div className={classes.header}>
            <div className={classes.tytle}>
                <h3>サンプルアプリケーション</h3>
            </div>
            <nav>
                <ul>
                    <li>
                        <button>HOME</button>
                    </li>
                    <li>
                        <button onClick={btnFunc}>ログアウト</button>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default MyPageHeader