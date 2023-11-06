import React from 'react';
import {Button, Layout, Menu, theme} from 'antd';
import InputPanel from "./components/InputPanel.tsx";
import ScannerPanel from "./components/ScannerPanel.tsx";

const {Header, Content, Sider} = Layout;

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
                    }, {
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
                    <Button style={{width: "100%", marginTop: "10%"}} onClick={async () => {
                        // POST http://localhost:8080/block/generate
                        const res = await fetch("http://localhost:8080/block/generate", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({})
                        })
                        const json = await res.json()
                        console.log(json)
                        alert(json.result)
                    }}>加速挖礦</Button>
                    <Button style={{width: "100%", marginTop: "10%"}} onClick={async () => {
                        const address = prompt("請輸入地址")
                        if (address === null) return
                        // GET http://localhost:8080/get/privatekey?address=myoCGvSYrn1jQQadv99ZZ2hhoREdAYPGHP
                        const res = await fetch(`http://localhost:8080/get/privatekey?address=${address}`)
                        const json = await res.json()
                        console.log(json)
                        alert(json.result === "success" ? json.data : json.result)
                    }}>生成私鑰</Button>
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
