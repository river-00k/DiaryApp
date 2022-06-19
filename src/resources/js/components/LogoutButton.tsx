import { Button } from '@material-ui/core'
import axios from 'axios'
import React from 'react'
import { useAuth } from '../auth/AuthContext'


const LogoutButton = () => {

    const auth = useAuth()

    const btnFunc = auth?.logout
    
    return (
        <Button variant='contained' color='primary' onClick={btnFunc}>ログアウト</Button>
    )
}

export default LogoutButton