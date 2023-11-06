import {Flex} from "antd"
import InputBox from "./InputBox.tsx";
import React from "react";

function InputPanel() {
    const [privateKey, setPrivateKey] = React.useState("")

    return <Flex vertical gap={16}>
        <InputBox title={"private key"} value={privateKey} setValueFunc={setPrivateKey} clickTarget={"生成私鑰"}
                  clickFunc={async () => {
                      console.warn("clickFunc")
                  }}/>
        <InputBox title={"private key"} value={privateKey} setValueFunc={setPrivateKey} clickTarget={"生成私鑰"}
                  clickFunc={async () => {
                      console.warn("clickFunc")
                  }}/>
    </Flex>
}

export default InputPanel