import { Flex } from 'antd';
import React, { useEffect } from 'react';
import InputPrivateKey from './InputPrivateKey.tsx';
import InputTxBox from './InputTxBox.tsx';
import InputPureContract from './InputPureContract.tsx';

function InputPanel() {
	const [address, setAddress] = React.useState('');
	const [privateKey, setPrivateKey] = React.useState('');
	const [fixedKey, setFixedKey] = React.useState(false);

	useEffect(() => {
		const savedPrivateKey = localStorage.getItem('privatekey');
		const savedAddress = localStorage.getItem('address');
		if (savedPrivateKey && savedAddress) {
			setPrivateKey(savedPrivateKey);
			setAddress(savedAddress);
		}
	}, []);

	return (
		<Flex vertical gap={16}>
			<InputPrivateKey
				address={address}
				setAddress={setAddress}
				privateKey={privateKey}
				setPrivateKey={setPrivateKey}
				fixedKey={fixedKey}
				setFixedKey={setFixedKey}
			/>
			<InputPureContract />
			{fixedKey && privateKey.length > 0 ? (
				<InputTxBox ownerAddress={address} privateKey={privateKey} />
			) : (
				<h3>請輸入私鑰</h3>
			)}
		</Flex>
	);
}

export default InputPanel;
