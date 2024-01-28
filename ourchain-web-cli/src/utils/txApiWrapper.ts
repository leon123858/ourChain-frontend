import {config} from './config.ts';
const BASE_URL = config.BASE_URL;

async function getUtxo(fee = 0.0001, targetAddress = '', ownerAddress = '') {
    // GET http://localhost:8080/get/utxo
    const utxoResult = await fetch(
        `${BASE_URL}get/utxo?address=${ownerAddress}`,
        {method: 'GET'}
    );
    const utxoJson = await utxoResult.json();
    if (utxoJson.result !== 'success') {
        console.error('Error: ', utxoJson);
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
        console.error('Error: no utxo available');
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
        },
    };
}

async function createTx(
    fee = 0.0001,
    targetAddress = '',
    ownerAddress = '',
    contract: {
        action: number;
        code: string;
        address: string;
        args: string[];
    }
) {
    const utxo = await getUtxo(fee, targetAddress, ownerAddress);
    if (!utxo) {
        console.error('Error: no utxo available');
        return;
    }
    console.log('utxo: ', utxo.input.txid);
    const result = await fetch(`${BASE_URL}rawtransaction/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            inputs: [utxo.input],
            outputs: [utxo.output],
            contract: {
                action: contract.action,
                code: contract.code,
                address: contract.address,
                args: contract.args,
            },
        }),
    });
    const json = await result.json();
    if (json.result !== 'success') {
        console.error('Error: ', json);
        return;
    }
    return {
        hex: json.data.hex as string,
        contractAddress: json.data.contractAddress as string,
    };
}

async function signContract(rawTx = '', privateKey = '') {
    // POST http://localhost:8080/rawtransaction/sign
    const result = await fetch(`${BASE_URL}rawtransaction/sign`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            rawTransaction: rawTx,
            privateKey: privateKey,
        }),
    });
    const json = await result.json();
    if (json.result !== 'success') {
        console.error('Error: ', json);
        return;
    }
    if (!json.data.complete) {
        console.error('Error: ', json);
        return;
    }
    return json.data.hex as string;
}

async function sendTx(signedTx = '') {
    // POST http://localhost:8080/rawtransaction/send
    const result = await fetch(`${BASE_URL}rawtransaction/send`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            rawTransaction: signedTx,
        }),
    });
    const json = await result.json();
    if (json.result !== 'success') {
        console.error('Error: ', json);
        return;
    }
    return json.data as string;
}

// sendMoney
export async function sendMoney(
    fee = 0.0001,
    targetAddress = '',
    privateKey = '',
    ownerAddress = ''
) {
    const rawTx = await createTx(fee, targetAddress, ownerAddress, {
        action: 0,
        code: '',
        address: '',
        args: [],
    });
    if (!rawTx) {
        throw new Error('Error: no rawTx available');
    }
    const signedTx = await signContract(rawTx.hex, privateKey);
    if (!signedTx) {
        throw new Error('Error: no signedTx available');
    }
    const txid = await sendTx(signedTx);
    if (!txid) {
        throw new Error('Error: no txid available');
    }
    return txid;
}

// deployContract
export async function deployContract(
    fee = 0.0001,
    targetAddress = '',
    privateKey = '',
    ownerAddress: string,
    code = '',
    args = ['']
) {
    const rawTx = await createTx(fee, '', ownerAddress, {
        action: 1,
        code: code,
        address: targetAddress,
        args: args,
    });
    if (!rawTx) {
        throw new Error('Error: no rawTx available');
    }
    const signedTx = await signContract(rawTx.hex, privateKey);
    if (!signedTx) {
        throw new Error('Error: no signedTx available');
    }
    const txid = await sendTx(signedTx);
    if (!txid) {
        throw new Error('Error: no txid available');
    }
    return {
        txid: txid,
        contractAddress: rawTx.contractAddress,
    };
}

// callContract
export async function callContract(
    fee = 0.0001,
    targetAddress = '',
    privateKey = '',
    ownerAddress: string,
    code = '',
    args = ['']
) {
    const rawTx = await createTx(fee, '', ownerAddress, {
        action: 2,
        code: code,
        address: targetAddress,
        args: args,
    });
    if (!rawTx) {
        throw new Error('Error: no rawTx available');
    }
    const signedTx = await signContract(rawTx.hex, privateKey);
    if (!signedTx) {
        throw new Error('Error: no signedTx available');
    }
    const txid = await sendTx(signedTx);
    if (!txid) {
        throw new Error('Error: no txid available');
    }
    return txid;
}

// getContract(pure)
export async function getContractMessage(targetAddress = '', args = ['']) {
    // POST http://localhost:8080/get/contractmessage
    const result = await fetch(`${BASE_URL}get/contractmessage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            address: targetAddress,
            arguments: args,
        }),
    });
    const json = await result.json();
    if (json.result !== 'success') {
        console.error('Error: ', json);
        return;
    }
    return json.data as string;
}
