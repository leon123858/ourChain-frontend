import {Button, Input, Typography} from "antd";
import React from "react";
import InputContractExtend from "./InputContractExtend.tsx";
import {getContractMessage} from "../utils/txApiWrapper.ts";

function InputPureContract({}: {}) {
    const [address, setAddress] = React.useState("")
    const [contractArguments, setContractArguments] = React.useState([""])
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
                alert(await getContractMessage(address, contractArguments))
            }}>送出</Button>
        </div>
    </>
}

export default InputPureContract