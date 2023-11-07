async function getUtxo(fee = 0.0001, targetAddress = "") {
    // GET http://localhost:8080/get/utxo
    const utxoResult = await fetch("http://localhost:8080/get/utxo", {method: "GET"});
    const utxoJson = await utxoResult.json();
    if (utxoJson.result !== "success") {
        console.error("Error: ", utxoJson);
        return;
    }
    const utxoList = utxoJson.data;
    // random 排序 utxoList
    utxoList.sort(() => Math.random() - 0.5);
    let targetUtxo;
    for (let i = 0; i < utxoList.length; i++) {
        if (utxoList[i].amount > fee) {
            targetUtxo = utxoList[i];
            break;
        }
    }
    if (!targetUtxo) {
        console.error("Error: no utxo available");
        return;
    }
    return {
        input: {
            txid: targetUtxo.txid,
            vout: targetUtxo.vout,
        },
        output: {
            address: targetAddress || targetUtxo.address,
            amount: targetUtxo.amount - fee,
        }
    }
}

async function createTx(fee = 0.0001, targetAddress = "", contract: {
    action: number,
    code: string,
    address: string,
    args: string[]
}) {
    const utxo = await getUtxo(fee, targetAddress);
    if (!utxo) {
        console.error("Error: no utxo available");
        return;
    }
    const result = await fetch("http://localhost:8080/rawtransaction/create", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            inputs: [utxo.input],
            outputs: [utxo.output],
            contract: {
                "action": contract.action,
                "code": contract.code,
                "address": contract.address,
                "arguments": contract.args,
            }
        }),
    })
    const json = await result.json();
    if (json.result !== "success") {
        console.error("Error: ", json);
        return;
    }
    return {
        hex: json.data.hex as string,
        contractAddress: json.data.contractAddress as string,
    };
}

async function signContract(rawTx = "", privateKey = "") {
    // POST http://localhost:8080/rawtransaction/sign
    const result = await fetch("http://localhost:8080/rawtransaction/sign", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            rawTransaction: rawTx,
            privateKey: privateKey,
        }),
    })
    const json = await result.json();
    if (json.result !== "success") {
        console.error("Error: ", json);
        return;
    }
    if (!json.data.complete) {
        console.error("Error: ", json);
        return;
    }
    return json.data.hex as string;
}

async function sendTx(signedTx = "") {
    // POST http://localhost:8080/rawtransaction/send
    const result = await fetch("http://localhost:8080/rawtransaction/send", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            rawTransaction: signedTx,
        }),
    })
    const json = await result.json();
    if (json.result !== "success") {
        console.error("Error: ", json);
        return;
    }
    return json.data as string;
}

// sendMoney
export async function sendMoney(fee = 0.0001, targetAddress = "", privateKey = "") {
    const rawTx = await createTx(fee, targetAddress, {action: 0, code: "", address: "", args: []});
    if (!rawTx) {
        throw new Error("Error: no rawTx available");
    }
    const signedTx = await signContract(rawTx.hex, privateKey);
    if (!signedTx) {
        throw new Error("Error: no signedTx available");
    }
    const txid = await sendTx(signedTx);
    if (!txid) {
        throw new Error("Error: no txid available");
    }
    return txid;
}

// deployContract
export async function deployContract(fee = 0.0001, targetAddress = "", privateKey = "", code = "", args = [""]) {
    const rawTx = await createTx(fee, "", {
        action: 1,
        code: code,
        address: targetAddress,
        args: args,
    });
    if (!rawTx) {
        throw new Error("Error: no rawTx available");
    }
    const signedTx = await signContract(rawTx.hex, privateKey);
    if (!signedTx) {
        throw new Error("Error: no signedTx available");
    }
    const txid = await sendTx(signedTx);
    if (!txid) {
        throw new Error("Error: no txid available");
    }
    return {
        txid: txid,
        contractAddress: rawTx.contractAddress,
    };
}

// callContract
export async function callContract(fee = 0.0001, targetAddress = "", privateKey = "", code = "", args = [""]) {
    const rawTx = await createTx(fee, "", {
        action: 2,
        code: code,
        address: targetAddress,
        args: args,
    });
    if (!rawTx) {
        throw new Error("Error: no rawTx available");
    }
    const signedTx = await signContract(rawTx.hex, privateKey);
    if (!signedTx) {
        throw new Error("Error: no signedTx available");
    }
    const txid = await sendTx(signedTx);
    if (!txid) {
        throw new Error("Error: no txid available");
    }
    return txid;
}

// getContract(pure)
export async function getContractMessage(targetAddress = "", args = [""]) {
    // POST http://localhost:8080/get/contractmessage
    const result = await fetch("http://localhost:8080/get/contractmessage", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            address: targetAddress,
            args: args,
        }),
    })
    const json = await result.json();
    if (json.result !== "success") {
        console.error("Error: ", json);
        return;
    }
    return json.data as string;
}