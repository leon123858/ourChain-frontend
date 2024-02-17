import {Button, Layout, Modal, Spin, theme} from "antd";
import {config} from "../utils/config.ts";
import React from "react";

const BASE_URL = config.BASE_URL;
const {Sider} = Layout;

export const CustomSider = () => {
    const [loading, setLoading] = React.useState(false)
    const {
        token: {colorBgContainer},
    } = theme.useToken();

    return (
        <>
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
                    } catch (e) {
                        alert(e)
                    } finally {
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
            <Modal
                title="loading"
                open={loading}
                footer={null}
            >
                <Spin spinning={loading}>
                </Spin>
            </Modal>
        </>
    );
};