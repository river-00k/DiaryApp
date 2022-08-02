import React, { useState } from 'react';
import styled from 'styled-components';
import { convertFromRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import useCustomEditorStyles from '../hooks/useCustomEditorStyles';
import Button from './Button';
import {useDiary} from '../contexts/DiaryContext'
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'


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
`;

const List = styled.ul`
  padding: 0;
  list-style-type: none;
`;

const Item = styled.li`
  display: grid;
  grid-template-columns: 150px 1fr;
  grid-template-areas:
    'image title'
    'image controls'
    'description description';
  grid-gap: ${props => props.theme.spacing['4']};
  box-shadow: ${props => props.theme.boxShadow.default};
  padding: ${props => props.theme.spacing['4']};
  margin: ${props => props.theme.spacing['8']} 0;
  border: 1px solid ${props => props.theme.border.light};

  @media (min-width: 700px) {
    grid-row-gap: 0;
    grid-column-gap: ${props => props.theme.spacing['8']};

    grid-template-areas:
      'image title'
      'image description'
      'image controls';
  }

  h3 {
    margin: 0 0 ${props => props.theme.spacing['2']};
  }

  p {
    margin: 0;
  }
  .image-container {
    grid-area: image;
    justify-self: end;
  }

  .image {
    display: block;
    background-color: ${props => props.theme.muted};
    width: 150px;
    height: 150px;
  }

  .title {
    grid-area: title;
    display: flex;
    align-items: flex-end;
    font-size: ${props => props.theme.fontSize['2xl']};

    @media (min-width: 700px) {
      display: block;
    }
  }

  .description {
    grid-area: description;
  }

  .controls {
    grid-area: controls;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;

    @media (min-width: 700px) {
      justify-content: flex-end;
    }
  }

  .control {
    border-radius: ${props => props.theme.radius.full};
    font-size: ${props => props.theme.fontSize.sm};
    margin: 0 ${props => props.theme.spacing['1']};
  }
`;

const Products = () => {
  const { products, removeProduct } = useDiary();
  const [age, setAge] = useState("")
  const { textColorStyles, getCustomSyleMapInstructions } = useCustomEditorStyles();
  const inlineStyles = getCustomSyleMapInstructions(cssProps => ({ style: cssProps }))(
    textColorStyles
  );

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const selectMonthly = (products, month, year) =>{
    return(
      products.filter(obj => {
        let objDate = new Date(obj.date)
        return objDate.getMonth() + 1 == month && objDate.getFullYear() == year
      })
    )
  }

  const monthlyProducts = selectMonthly(products, 7, 2022)

  //const hasProducts = products && products.length > 0;
  const hasProducts = monthlyProducts && monthlyProducts.length > 0;

  return (
    
    <ProductsSection>
      <header className="section-header">
        <FormControl variant="standard" sx={{ m: 10, minWidth: 1200 }}>
          <InputLabel id="demo-simple-select-standard-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={age}
            onChange={handleChange}
            label="Age"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <div className="controls">
          <Button to="/mypage/diary/product/new">
            <b>+</b> 新しい日記
          </Button>
        </div>
      </header>

      {hasProducts ? (
        <List>
          {monthlyProducts.map(product => {
            const { id, title, date, image_url } = product;
            let  { description }  = product;
      
            description = JSON.parse(description)
            
            return (
              <Item key={id}>
                <div>
                  <h3>{date}</h3>
                </div>
                {/* <div className="image-container">
                  <img
                    className="image"
                    src={image_url || 'https://source.unsplash.com/gJylsVMSf-k/150x150'}
                    alt=""
                  />
                </div> */}
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
                <div className="controls">
                  <Button className="control" to={`/mypage/diary/product/edit/${id}`} buttonStyle="muted" >
                    Edit
                  </Button>
                  <Button
                    className="control"
                    buttonStyle="danger"
                    onClick={()=>removeProduct(product)}
                  >
                    Delete
                  </Button>
                </div>
              </Item>
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
  );
};

export default Products;
