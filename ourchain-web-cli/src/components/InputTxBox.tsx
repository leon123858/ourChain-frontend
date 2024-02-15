import {Button, Input, message, Modal, Select, Spin, Typography} from "antd";
import React from "react";
import InputContractExtend from "./InputContractExtend.tsx";
import {callContract, deployContract, sendMoney} from "../utils/txApiWrapper.ts";

enum TxMode {
    Normal = "非合約",
    ContractDeploy = "發布合約",
    ContractExecute = "執行合約",
}

function InputTxBox({privateKey, ownerAddress}:
                        {
                            ownerAddress: string,
                            privateKey: string
                        }) {
    const [mode, setMode] = React.useState('非合約')
    const [srcCode, setSrcCode] = React.useState("")
    const [address, setAddress] = React.useState("")
    const [contractArguments, setContractArguments] = React.useState([""])
    const [loading, setLoading] = React.useState(false)
    return <>
        <div>
            <Typography.Title level={5}>Transaction</Typography.Title>
            <Select
                defaultValue={TxMode.Normal}
                style={{width: 120}}
                value={mode}
                onChange={(value) => {
                    setMode(value)
                }}
                options={[
                    {value: TxMode.Normal, label: TxMode.Normal},
                    {value: TxMode.ContractDeploy, label: TxMode.ContractDeploy},
                    {value: TxMode.ContractExecute, label: TxMode.ContractExecute},
                ]}
            />
            {mode == TxMode.ContractDeploy ? <Input.TextArea rows={4} value={srcCode}
                                                             onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                                                                 setSrcCode(e.target.value)
                                                             }}/> : null}
            {mode == TxMode.ContractDeploy ? null : <Input
                value={address}
                placeholder={mode == TxMode.Normal ? "目標地址" : "合約地址"}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setAddress(e.target.value)
                }}
            />}

            {mode !== TxMode.Normal ? <InputContractExtend contractArguments={contractArguments}
                                                           setContractArguments={setContractArguments}/> : null}
            <Button onClick={async () => {
                setLoading(true)
                try {
                    switch (mode) {
                        case TxMode.Normal:
                            alert(await sendMoney(0.001, address, privateKey, ownerAddress))
                            break
                        case TxMode.ContractDeploy: {
                            const result = await deployContract(0.001, "", privateKey, ownerAddress, srcCode, contractArguments)
                            alert(result.txid)
                            alert("address: " + result.contractAddress)
                            break
                        }
                        case TxMode.ContractExecute:
                            alert(await callContract(0.001, address, privateKey, ownerAddress, "", contractArguments))
                            break
                    }
                } catch (e) {
                    console.error(e)
                    message.error("區塊鏈交易失敗, 請多嘗試幾次")
                } finally {
                    setLoading(false)
                }

            }}>送出</Button>
        </div>
        <Modal title="transaction" footer={null} open={loading}>
            <Spin spinning={loading}/>
        </Modal>
    </>
}

export default InputTxBox