import {Button, Input, Modal, Spin, Typography} from "antd";
import React from "react";
import InputContractExtend from "./InputContractExtend.tsx";
import {getContractMessage} from "../utils/txApiWrapper.ts";

function InputPureContract({}: {}) {
    const [address, setAddress] = React.useState("")
    const [contractArguments, setContractArguments] = React.useState([""])
    const [loading, setLoading] = React.useState(false)
    return <>
        <div>
            <Typography.Title level={5}>Pure Contract</Typography.Title>
            <Input
                value={address}
                placeholder={"合約地址"}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setAddress(e.target.value)
                }}
            />
            <InputContractExtend contractArguments={contractArguments}
                                 setContractArguments={setContractArguments}/>
            <Button onClick={async () => {
                setLoading(true)
                try {
                    alert(await getContractMessage(address, contractArguments))
                } catch (e) {
                    alert(e)
                } finally {
                    setLoading(false)
                }
            }}>送出</Button>
        </div>
        <Modal title="fetch contract message" footer={null} open={loading}>
            <Spin spinning={loading}/>
        </Modal>
    </>
}

export default InputPureContract