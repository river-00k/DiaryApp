import { Theme } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/styles';
import React from 'react';
import CountDownTimer from '../components/CountDownTimer';
import LogoutButton from '../components/LogoutButton';

const useStyles = makeStyles((theme: Theme) => createStyles({
    container: {
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        width:"100%",
        height:"100vh",
    }


}))

const Example = () => {

    const classes = useStyles()

    return(
        <div className={classes.container}>
            <div className="card">
                <div className="card-header">Example</div>

                <div className="card-body">Hello World!</div>
                <LogoutButton/>
            </div>
        </div>

    )

}
export default Example;