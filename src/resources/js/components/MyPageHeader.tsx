import React from 'react'
import { useAuth } from '../contexts/AuthContext';
import { slide as Menu } from 'react-burger-menu'
import styled from 'styled-components';
import {AiOutlineHome, AiOutlineLogout, AiOutlineSetting,AiFillSignal} from 'react-icons/ai'


const HeaderSection = styled.section`
    
    .header {
        background-color: #3F51B5;
        display: flex;
        justify-content: space-around;
        position: fixed;
        text-align: left;
        top: 0;
        left: 0;
        width: 100%;
        height; 100px;
        & nav {
            @media (max-width: 580px) {
                display: none;
            }
            display: flex;
            align-items: center;
            & ul {
                margin: 0;
                & li {
                    list-style: none;
                    display: inline-block;
                    margin-right: 30px;
                    & a {
                        font-size: 16px;
                        text-decoration: none;
                        color: white;
                    }
                    & a:hover {
                        color: green;
                    }

                    & button {
                      font-size: 16px;
                      background: transparent;
                      border: 0;
                      color: white;
                    }

                    & button:hover {
                      color: green;
                    }
                }
            }
        }
    }

    .title {
         display: flex;
         align-items: center;
         margin-top: 15px;
         margin-bottom: 15px;
         & h3 { 
             margin: 0;
             color: white;
             font-size: 18px;
         }
    }

    .menu-item {
      font-size: 25px;
      margin: 10px;
      font-family: 'Nunito', sans-serif;
    }
`


const styles = {
    bmBurgerButton: {
      position: 'fixed',
      width: '25px',
      height: '20px',
      left: '15px',
      top: '15px',
    },
    bmBurgerBars: {
      background: 'white'
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
      padding: '2.0em 1.0em 0',
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

    const auth = useAuth()

    const btnFunc = auth?.logout

    return (
        <HeaderSection>
         
          <Menu styles={styles}>
              <p>Menu</p>
              <a id="contact" className="menu-item" href="/mypage/diary/home"><AiOutlineHome/> Home</a>
              <a className="menu-item" href="/mypage/setting"><AiOutlineSetting/> Setting</a>
              <a className="menu-item" href="/mypage/chart"><AiFillSignal/> Chart</a>
              <a className="menu-item" onClick={btnFunc} href="#"><AiOutlineLogout/> Logout</a>
              
          </Menu>

          <div className="header">
              <div className="title">
                  <h3>コツコツ日記</h3>
              </div>           
          </div>
        </HeaderSection>

    )
}

export default MyPageHeader