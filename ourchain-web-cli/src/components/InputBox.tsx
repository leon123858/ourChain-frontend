import {Button, Input, Typography} from "antd";
import React from "react";

function InputBox({title, value, setValueFunc, clickTarget, clickFunc}:
                      {
                          clickTarget?: string, clickFunc?: () => void,
                          title: string, value: string,
                          setValueFunc: React.Dispatch<React.SetStateAction<string>>
                      }) {
    return <>
        <div>
            <Typography.Title level={5}>{title}</Typography.Title>
            <Input
                value={value}
                onChange={(e) => {
                    setValueFunc(e.target.value)
                }}
            />
            {clickTarget ? <Button onClick={clickFunc}>{clickTarget}</Button> : null}
        </div>
    </>
}

export default InputBox