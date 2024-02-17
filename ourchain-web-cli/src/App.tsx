import React from 'react';
import {Layout, Menu, theme} from 'antd';
import InputPanel from "./components/InputPanel.tsx";
import ScannerPanel from "./components/ScannerPanel.tsx";
import {ContractScanner} from "./components/ContractScanner.tsx";
import {CustomSider} from "./components/CustomSider.tsx";


const {Header, Content} = Layout;

const App: React.FC = () => {
    const {
        token: {colorBgContainer},
    } = theme.useToken();
    const [page, setPage] = React.useState("wallet")
    let pageContent = <div>404</div>
    switch (page) {
        case "wallet":
            pageContent = <InputPanel/>
            break
        case "scanner":
            pageContent = <ScannerPanel/>
            break
        case "contract":
            pageContent = <ContractScanner/>
            break
    }

    return (
        <Layout style={{}}>
            <Header>
                <Menu theme="dark" mode="horizontal" selectedKeys={[page]} items={[
                    {
                        key: "wallet",
                        label: "wallet",
                        onClick: () => {
                            setPage("wallet")
                        }
                    }, {
                        key: "scanner",
                        label: "scanner",
                        onClick: () => {
                            setPage("scanner")
                        }
                    }, {
                        key: "contract",
                        label: "contract",
                        onClick: () => {
                            setPage("contract")
                        }
                    }
                ]}/>
            </Header>
            <Layout>
                <CustomSider/>
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
