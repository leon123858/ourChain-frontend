import {Input, Switch, Typography} from "antd";
import React from "react";

function InputPrivateKey({address, setAddress,privateKey, setPrivateKey, fixedKey, setFixedKey,}:
                             {
                                    address: string,
                                    setAddress: React.Dispatch<React.SetStateAction<string>>,
                                 privateKey: string,
                                 setPrivateKey: React.Dispatch<React.SetStateAction<string>>,
                                 fixedKey: boolean
                                 setFixedKey: React.Dispatch<React.SetStateAction<boolean>>
                             }) {
    return <>
        <div>
            <Typography.Title level={5}>Private Key (WIF)</Typography.Title>
            <Switch checkedChildren="鎖定" unCheckedChildren="開啟" checked={fixedKey} onClick={() => {
                setFixedKey(!fixedKey)
            }}/>
            <Input
                value={address}
                disabled={fixedKey}
                placeholder={"address"}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setAddress(e.target.value)
                }}
            />
            <Input
                value={privateKey}
                disabled={fixedKey}
                placeholder={"private key"}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setPrivateKey(e.target.value)
                }}
            />
        </div>
    </>
}

export default InputPrivateKey