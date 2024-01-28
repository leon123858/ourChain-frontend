import {List, Typography} from "antd";
import React, {useEffect} from "react";
import {config} from "../utils/config.ts";
const BASE_URL = config.BASE_URL;

function ScannerPanel() {
    const [utxoList, setUtxoList] = React.useState([])

    useEffect(() => {
        // GET http://localhost:8080/get/utxo
        fetch(`${BASE_URL}get/utxo`).then(res => res.json()).then(json => {
            console.log(json)
            if (json.result !== "success") {
                alert("error")
                return
            }
            setUtxoList(json.data)
        })
    }, [])

    return (
        <div>
            <h1>Scanner Panel</h1>
            <List
                header={<div>UTXO</div>}
                footer={<div>end</div>}
                bordered
                dataSource={utxoList}
                renderItem={(item: {
                    address: string,
                    amount: number,
                    txid: string,
                }) => (
                    <List.Item>
                        <Typography.Text mark>[{`${item.txid}`}]</Typography.Text> {`${item.address} : ${item.amount}`}
                    </List.Item>
                )}
            />
        </div>
    )
}

export default ScannerPanel;