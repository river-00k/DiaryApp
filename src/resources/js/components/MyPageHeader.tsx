import { createStyles, makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import { useAuth } from '../contexts/AuthContext';
import { slide as Menu } from 'react-burger-menu'
import { left } from '@popperjs/core';
import { right } from '@popperjs/core/lib';

const useStyles = makeStyles((theme: Theme) => createStyles({
    header:{
        width:"100%",
        height:"32px",
        backgroundColor:"#3f51b5",
        display:"flex",
        justifyContent:"start",
        alignItems:"center",
        color:"white",
        position:"fixed",
        top:"0",
        left:"0",
        "& nav":{
            "& ul":{
                margin:"0",
                marginLeft:"600px",
                "& li":{
                    listStyle:"none",
                    display:"inline-block",
                    marginLeft:"30px",
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
            margin:"0",
            marginLeft:"400px",
        }
    }

}))

const styles = {
    bmBurgerButton: {
      position: 'fixed',
      width: '32px',
      height: '20px',
      left: '5px',
      top: '5px'
    },
    bmBurgerBars: {
      background: '#373a47'
    },
    bmBurgerBarsHover: {
      background: '#a90000'
    },
    bmCrossButton: {
      height: '24px',
      width: '24px'
    },
    bmCross: {
      background: '#bdc3c7'
    },
    bmMenuWrap: {
      position: 'fixed',
      height: '100%'
    },
    bmMenu: {
      background: '#373a47',
      padding: '2.5em 1.5em 0',
      fontSize: '2.0em',
      fontWeight: 'bold'
    },
    bmMorphShape: {
      fill: '#373a47'
    },
    bmItemList: {
      color: '#b8b7ad',
      padding: '0.8em'
    },
    bmItem: {
      display: 'block'
    },
    bmOverlay: {
      background: 'rgba(0, 0, 0, 0.3)'
    }
  }


const MyPageHeader = () => {

    const classes = useStyles();

    const auth = useAuth()

    const btnFunc = auth?.logout

    return (<>

        <div className={classes.header}>
            <Menu styles={ styles } >
            <a id="login" className="menu-item" href="/login">Logout</a>
            <a id="about" className="menu-item" href="/about">About</a>
            <a id="contact" className="menu-item" href="/contact">Contact</a>
            </Menu>
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
        </>
    )
}

export default MyPageHeader