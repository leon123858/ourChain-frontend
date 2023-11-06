import React from 'react';
import {Layout, Menu, theme} from 'antd';
import InputPanel from "./components/InputPanel.tsx";
import ScannerPanel from "./components/ScannerPanel.tsx";

const {Header, Content, Sider} = Layout;

const App: React.FC = () => {
    const {
        token: {colorBgContainer},
    } = theme.useToken();
    const [page, setPage] = React.useState("wallet")

    let pageContent = <div>404</div>
    switch(page) {
        case "wallet":
            pageContent = <InputPanel/>
            break
        case "scanner":
            pageContent = <ScannerPanel/>
            break
    }

    return (
        <Layout style={{}}>
            <Header style={{display: 'flex', alignItems: 'center'}}>
                <Menu theme="dark" mode="horizontal" selectedKeys={[page]} items={[
                    {
                        key: "wallet",
                        label: "wallet",
                        onClick: () => {
                            setPage("wallet")
                        }
                    },{
                        key: "scanner",
                        label: "scanner",
                        onClick: () => {
                            setPage("scanner")
                        }
                    }
                ]}/>
            </Header>
            <Layout>
                <Sider width={200} style={{background: colorBgContainer}}>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={[]}
                        defaultOpenKeys={[]}
                        style={{height: '100%', borderRight: 0}}
                        items={[]}
                    />
                </Sider>
                <Layout style={{padding: '0 24px 24px'}}>
                    <Content
                        style={{
                            padding: 100,
                            margin: 0,
                            minHeight: "80vh",
                            background: colorBgContainer,
                            textAlign: "center"
                        }}
                    >
                        {pageContent}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default App;
