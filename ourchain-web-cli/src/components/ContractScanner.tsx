import React from "react";
import {config} from "../utils/config.ts";
import {Button, Card, Input, List, Modal, Spin} from "antd";

const BASE_URL = config.BASE_URL;

export const ContractScanner = () => {
    const [loading, setLoading] = React.useState(false)
    const [contractList, setContractList] = React.useState([])
    const [protocol, setProtocol] = React.useState("")

    return (
        <><h1>Contract Scanner Panel</h1>
            <Input placeholder="input contract protocol" style={{width: "50%"}} onChange={(e) => {
                setProtocol(e.target.value)
            }}/>
            <br/>
            <Button style={{marginTop: "10px"}} onClick={async () => {
                setLoading(true)
                try {
                    // POST http://localhost:8080/get/contract
                    const res = await fetch(`${BASE_URL}get/contract?protocol=${protocol}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json"
                        },
                    })
                    const json = await res.json()
                    if (json.result !== "success") {
                        alert("error")
                        return
                    }
                    if (!json.data) {
                        alert("no contract found")
                        return
                    }
                    setContractList(json.data)
                } catch (e) {
                    alert(e)
                } finally {
                    setLoading(false)
                }
            }}>search</Button>
            <List
                header={<div>Contract</div>}
                footer={<div>end</div>}
                bordered
                dataSource={contractList}
                renderItem={(item: {
                    TxID: string,
                    ContractAddress: string,
                    ContractAction: number,
                    ContractProtocol: string,
                    ContractVersion: string,
                }) => (
                    <List.Item>
                        <Card title={item.ContractProtocol} style={{width: "100%"}}>
                            <p>ContractAddress: {item.ContractAddress}</p>
                            <p>ContractVersion: {item.ContractVersion}</p>
                        </Card>
                    </List.Item>
                )}
            />
            <Modal title="fetch utxo" footer={null} open={loading}>
                <Spin spinning={loading}/>
            </Modal></>
    );
};