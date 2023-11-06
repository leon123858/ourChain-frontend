import {Button, Input} from "antd";
import React from "react";

function InputContractExtend({contractArguments, setContractArguments}:
                                 {
                                     contractArguments: string[],
                                     setContractArguments: React.Dispatch<React.SetStateAction<string[]>>
                                 }) {
    if (Array.isArray(contractArguments) === false) throw new Error("arguments is not array")
    return <>
        <div>
            {contractArguments.map((argument, index) => {
                return <Input
                    key={index}
                    addonAfter={<Button onClick={() => {
                        const newArguments = [...contractArguments]
                        newArguments.splice(index, 1)
                        setContractArguments(newArguments)
                    }}>x</Button>}
                    value={argument}
                    placeholder={`argument ${index}`}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const newArguments = [...contractArguments]
                        newArguments[index] = e.target.value
                        setContractArguments(newArguments)
                    }}
                />
            })}
            <Button onClick={() => {
                const newArguments = [...contractArguments]
                newArguments.push("")
                setContractArguments(newArguments)
            }}>+</Button>
        </div>
    </>
}

export default InputContractExtend