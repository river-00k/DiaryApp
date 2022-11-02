import { useAuth } from '../contexts/AuthContext';
import { EditorState, ContentState, convertFromRaw, convertToRaw } from 'draft-js';
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { stateToHTML } from 'draft-js-export-html';
import useCustomEditorStyles from '../hooks/useCustomEditorStyles';
import Button from './Button';
import {useDiary} from '../contexts/DiaryContext'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { Line,getElementAtEvent } from "react-chartjs-2";
import { Chart, registerables } from "chart.js"
import { useNavigate } from 'react-router-dom';

Chart.register(...registerables)

const Graph =() => {
  const { product, products, removeProduct } = useDiary()
  const { textColorStyles, getCustomSyleMapInstructions } = useCustomEditorStyles();
  const inlineStyles = getCustomSyleMapInstructions(cssProps => ({ style: cssProps }))(
    textColorStyles
  );


  const labels = [];
  const evals = [];
  for (const elem of products) {
    labels.unshift(elem.date);
    evals.unshift(elem.evaluation);
  }

  const graphData = {
    labels: labels,
    datasets: [
      {
        label: "evaluation",
        data: evals,
        borderColor: "rgb(75, 192, 192)",
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    interaction: {
      // Overrides the global setting
      mode: 'index'}
  };

  const divStyle = {
    marginLeft: "auto",
    marginRight: "auto",
    margin: "10px",
    width: "100%",
  };
  const chartRef = useRef();
  const navigate = useNavigate();
  const onClick = (event) => {
    console.log(getElementAtEvent(chartRef.current, event)[0].index);
    const { id, title, date, evaluation } = products[products.length-getElementAtEvent(chartRef.current, event)[0].index-1];
    let  { description }  = products[products.length-getElementAtEvent(chartRef.current, event)[0].index-1];
    console.log(description)
    console.log(id, title, date, evaluation)
    navigate(`/mypage/diary/product/edit/${id}`);
  }

return(
  <div className="App" style={divStyle}>
    <Line
      height={400}
      width={400}
      data={graphData}
      options={options}
      id="chart-key"
      ref={chartRef}
      onClick={onClick}
    />
  </div>


)




}
export default Graph;