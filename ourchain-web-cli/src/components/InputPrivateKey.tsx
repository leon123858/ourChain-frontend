import {Input, Switch, Typography} from "antd";
import React from "react";

function InputPrivateKey({privateKey, setPrivateKey, fixedKey, setFixedKey,}:
                             {
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