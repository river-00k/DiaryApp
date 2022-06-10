import { Card, createStyles, makeStyles, Theme } from '@material-ui/core'
import React, { ReactElement, useState } from 'react'

const useStyles = makeStyles((theme:Theme) => createStyles({
    card:{
        color: "red",
        padding: "30px",
        margin: "20px",
        width: "10%",
        position: "absolute",
        fontWeight: "bold"
    }
}));

const CountDownTimer = ():ReactElement => {

    const classes = useStyles();

    //残り日付を計算

    var end = new Date('2022/11/01');
    var today = new Date();

    var diffTime = end.getTime() - today.getTime();
    var dayLeft = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;

    return (
        <Card className={classes.card}>
            {dayLeft}日後に完成する日記アプリ
        </Card>   
    )
}

export default CountDownTimer