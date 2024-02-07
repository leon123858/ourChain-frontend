import React from 'react';
import {Button, Layout, Menu, Modal, Spin, theme} from 'antd';
import InputPanel from "./components/InputPanel.tsx";
import ScannerPanel from "./components/ScannerPanel.tsx";
import {config} from "./utils/config.ts";
const BASE_URL = config.BASE_URL;

const {Header, Content, Sider} = Layout;

const App: React.FC = () => {
    const {
        token: {colorBgContainer},
    } = theme.useToken();
    const [page, setPage] = React.useState("wallet")
    const [loading, setLoading] = React.useState(false)

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
                    }
                ]}/>
            </Header>
            <Layout>
                <Sider width={200} style={{background: colorBgContainer}}>
                    <Button style={{width: "100%", marginTop: "10%"}} onClick={async () => {
                        setLoading(true)
                        try {
                            // POST http://localhost:8080/block/generate
                            const res = await fetch(`${BASE_URL}block/generate`, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({})
                            })
                            const json = await res.json()
                            console.log(json)
                            Modal.info({title: "挖礦結果", content: json.result === "success" ? "成功" : "失敗"})
                        }catch (e) {
                            alert(e)
                        }finally {
                            setLoading(false)
                        }
                    }}>加速挖礦</Button>
                    <Button style={{width: "100%", marginTop: "10%"}} onClick={async () => {
                        const address = prompt("請輸入地址")
                        if (address === null) return
                        // GET http://localhost:8080/get/privatekey?address=myoCGvSYrn1jQQadv99ZZ2hhoREdAYPGHP
                        const res = await fetch(`${BASE_URL}get/privatekey?address=${address}`)
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
            <Modal
                title="loading"
                open={loading}
                footer={null}
            >
                <Spin spinning={loading}>
                </Spin>
            </Modal>
        </Layout>
    );
};

export default App;
