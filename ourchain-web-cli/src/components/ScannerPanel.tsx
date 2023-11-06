import {List, Typography} from "antd";
import React, {useEffect} from "react";


function ScannerPanel() {
    const [utxoList, setUtxoList] = React.useState([])

    useEffect(() => {
        // GET http://localhost:8080/get/utxo
        fetch("http://localhost:8080/get/utxo").then(res => res.json()).then(json => {
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
                renderItem={(item: any) => (
                    <List.Item>
                        <Typography.Text mark>[{`${item.txid}`}]</Typography.Text> {`${item.address} : ${item.amount}`}
                    </List.Item>
                )}
            />
        </div>
    )
}

export default ScannerPanel;