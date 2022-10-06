import React from 'react';
import styled from 'styled-components';

const Main = styled.main`
  background-color: ${props => props.theme.contentBg};
  box-shadow: ${props => props.theme.boxShadow.default};
  padding: ${props => props.theme.spacing['5']};
  margin-top: 50px;
  margin-bottom: 30px;
  transition: background-color 200ms ease;
  

  .heading {
    text-align: center;
    margin: ${props => props.theme.spacing['3']} 0;
  }

  .sub-heading {
    text-align: center;
    margin: ${props => props.theme.spacing['3']} 0;
    color: ${props => props.theme.text.secondary};
  }
`;

const Header = styled.header`
  margin-bottom: ${props => props.theme.spacing['8']};
`;

const Content = props => {
  const { children } = props;

  return (
    <Main>
      <Header>
        <h1 className="heading">
          日記ページ
        </h1>
        <p className="sub-heading">日々の記録</p>
      </Header>

      {children}
    </Main>
  );
};

export default Content;