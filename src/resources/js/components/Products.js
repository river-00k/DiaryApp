import React, { useState } from 'react';
import styled from 'styled-components';
import { convertFromRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import useCustomEditorStyles from '../hooks/useCustomEditorStyles';
import Button from './Button';
import {useDiary} from '../contexts/DiaryContext'
import { FormControl, InputLabel, MenuItem, Select, IconButton } from '@mui/material'
import {BsPencil, BsTrash} from "react-icons/bs"
import {IoAddCircle} from "react-icons/io5"
import { useNavigate } from 'react-router-dom';





const parseRichText = (content, inlineStyles) => {
  
  const contentState = content.blocks ? convertFromRaw(content) : content;

  const options = {
    inlineStyles,
  };
  return stateToHTML(contentState, options);
};

const ProductsSection = styled.section`
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .controls {
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
  }

  small {
    display: block;
  }

  .heading,
  .message {
    text-align: center;
  }


  .addButton1 {
    @media (max-width: 400px) {
      display: none;
    }
  }

  .addButton2 {
    position: fixed;
    bottom: 10%;
    right: 10%;

    @media (min-width: 401px) {
      display: none;
    }
  }
`;

const List = styled.ul`
  padding: 0;
  list-style-type: none;
  max-width: 100%;
`;

const Item = styled.li`
  display: grid;
  grid-template-columns: 150px minmax(20px, 100%);
  grid-template-areas:
    'date title'
    'image description'
    'image description';
  grid-gap: ${props => props.theme.spacing['4']};
  box-shadow: ${props => props.theme.boxShadow.default};
  padding: ${props => props.theme.spacing['4']};
  margin: ${props => props.theme.spacing['8']} 0;
  border: 1px solid ${props => props.theme.border.light};
  max-width: 100%;
  margin-top: 0;

  @media (min-width: 700px) {
    grid-row-gap: 0;
    grid-column-gap: ${props => props.theme.spacing['8']};

    grid-template-areas:
      'date title'
      'image description'
      'image description';
  }

  h3 {
    margin: 0 0 ${props => props.theme.spacing['2']};
    overflow: hidden;
    max-width: 100%;
  }

  p {
    max-width: 100%;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .image-container {
    grid-area: image;
    justify-self: start;
  }

  .image {
    margin:0;
    background-color: ${props => props.theme.muted};
    height: 100px;
    width: 100%;
  }

  .title {
    grid-area: title;
    display: block;
    max-widh: 100%;
    font-size: ${props => props.theme.fontSize['2xl']};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    @media (min-width: 700px) {
      display: block;
    }
  }

  .description {
    grid-area: description;
    max-width: 100%;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    
  }

  .controls {
    grid-area: controls;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    max-width: 100%;

    @media (min-width: 700px) {
      justify-content: flex-end;
    }
  }
`;

const Icon = styled.section`
  .icon-container { 
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px; 
  }
  
  .icons {
    padding: 5px;
    margin-right: 10px;
  }
`;

const Products = () => {
  
  const { product, products, removeProduct } = useDiary()
  const { textColorStyles, getCustomSyleMapInstructions } = useCustomEditorStyles();
  const navigate = useNavigate()
  const inlineStyles = getCustomSyleMapInstructions(cssProps => ({ style: cssProps }))(
    textColorStyles
  );


  const evaluationImageList = ["/img/terrible.png", "/img/bad.png", "/img/fine.png", "/img/good.png", "/img/excelent.png"]

  //日付の取得
  const today = product? new Date(product.date):new Date()
  
  const [year, setYear] = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth() + 1)
  const yearList = [
    {
      "id":2021,
      "value":"2021年"}, 
    {
      "id":2022,
      "value":"2022年"}
  ]
  const monthList = ['1月', '2月','3月', '4月', '5月', '6月','7月', '8月', '9月', '10月', '11月','12月']

  const monthChange = (event) => {
    setMonth(event.target.value);
  };

  const yearChange = (event) => {
    setYear(event.target.value);
  };



  const selectMonthly = (products, month, year) =>{
    return(
      products.filter(obj => {
        let objDate = new Date(obj.date)
        return objDate.getMonth() + 1 == month && objDate.getFullYear() == year
      })
    )
  }

  const monthlyProducts = selectMonthly(products, month, year)

  //const hasProducts = products && products.length > 0;
  const hasProducts = monthlyProducts && monthlyProducts.length > 0;

  

  return (
   <div> 
    <ProductsSection>
      <header className="section-header">
        <div>
          <FormControl variant="standard" size='100' sx={{m: 1, minWidth: 80}}>
            <InputLabel id="demo-simple-select-standard-label" sx={{fontSize:15}}>Year</InputLabel>
            <Select
              value={year}
              onChange={yearChange}
              sx={{fontSize:20}}
            >

              {yearList.map((item) => {
                return <MenuItem key={item.value} value={item.id}>{item.value}</MenuItem>
              })}

            </Select>
          </FormControl>
          <FormControl variant="standard" size='100' sx={{m: 1, minWidth: 80}}>
            <InputLabel id="demo-simple-select-standard-label" sx={{fontSize:15}}>Month</InputLabel>
            <Select
              value={month}
              onChange={monthChange}
              sx={{fontSize:20}}
            >

              {monthList.map((value, index) => {
                return <MenuItem key={index} value={index+1}>{value}</MenuItem>
              })}
            </Select>
          </FormControl>
        </div>
        <div className="addButton1">
          <Button to="/mypage/diary/product/new">
            <b>+</b> 今日の日記
          </Button>
        </div>

        <div className='addButton2'>
          <IconButton
            onClick={() => navigate('/mypage/diary/product/new')}
          >
            <IoAddCircle color="#14919B" size="80px"/>
          </IconButton>
        </div>
      </header>

      {hasProducts ? (
        <List>
          {monthlyProducts.map((product,index) => {
            const { id, title, date, evaluation } = product;
            let  { description }  = product;
      
            description = JSON.parse(description)
            return (
              <div key={index}>
              <Icon>
                <div className="icon-container">
                  <IconButton 
                    className="icons" 
                    onClick={() => navigate(`/mypage/diary/product/edit/${id}`)} 
                    size="large"
                  >
                    <BsPencil/>
                  </IconButton>
                  <IconButton
                    className="icons"
                    onClick={()=>removeProduct(product)}
                    size="large"
                  >
                    <BsTrash/>
                  </IconButton>  
                </div>
              </Icon>
              <Item key={id}>
                <div>
                  <h3>{date}</h3>
                </div>
                 <div className="image-container">
                  <img
                    className="image"
                    src = {evaluationImageList[evaluation - 1]}
                    alt=""
                  />
                </div> 
                <h3 className="title">{title}</h3>
                {typeof description === 'string' ? (
                  <p className="description">{description}</p>
                ) : (
                  <div
                    className="description"
                    dangerouslySetInnerHTML={{
                      __html: parseRichText(description, inlineStyles),
                    }}
                  />
                )}
              </Item>
              </div>
            );
          })}
        </List>
      ) : (
        <div className="message">
          <p>
            No Product, Yet! <small>Add new a new product!</small>
          </p>
        </div>
      )}
    </ProductsSection>
  </div>);
};

export default Products;
