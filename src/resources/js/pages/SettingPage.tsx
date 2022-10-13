import React from 'react';
import GlobalStyle from '../styles/GlobalStyle'
import Container from '../styles/Container'
import Content from '../components/Content'
import Settings from '../components/Settings'


const SettingPage: React.FC = () => {

    const title: string = "個人設定"
    const subtitle: string = ""

    return (
        <>
            <GlobalStyle/>
            <Container>
                <Content title={title} subtitle={subtitle}>
                    <Settings/>
                </Content>
            </Container>

        </>
    )
}
export default SettingPage