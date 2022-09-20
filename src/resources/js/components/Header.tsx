import { createStyles, makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import styled from 'styled-components'

const HeaderSection = styled.section`
    
    .header {
        background-color: #3F51B5;
        display: flex;
        justify-content: space-around;
        position: fixed;
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
         }
    }

`
const Header = () => {

    return (
        <HeaderSection>
            <div className="header">
                <div className="title">
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
        </HeaderSection>
    )
}

export default Header