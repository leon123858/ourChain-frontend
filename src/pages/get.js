import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Avatar, List, Space, Button, Input, Modal } from 'antd';
// import { SendOutlined } from '@ant-design/icons';
import { linkStyle } from '../style.js';
import MidCol from '../utils/MidCol';

// const SendNFT = ({ icon, text }) => {
// 	const [address, onUpdate] = useState('');
// 	return (
// 		<Space>
// 			{React.createElement(icon)}
// 			<Input
// 				placeholder='請輸入目標地址'
// 				value={address}
// 				onChange={(e) => onUpdate(e.target.value)}
// 			/>
// 			<Button
// 				onClick={() => {
// 					console.log(address);
// 				}}
// 			>
// 				{text}
// 			</Button>
// 		</Space>
// 	);
// };

const Get = () => {
	const [address, onUpdate] = useState('');
	const [data, setData] = useState([]);
	return (
		<div>
			<Row>
				<Col span={24} style={{ minHeight: '5vh' }}></Col>
				<MidCol
					data={
						<Space>
							<Input
								placeholder='當前綁定 NFT 帳號'
								value={address}
								onChange={(e) => onUpdate(e.target.value)}
							/>
							<Button
								onClick={async () => {
									try {
										const result = await window.electronRequest('get', {
											txid: address,
										});
										console.log(result);
										setData(
											result.map((value) => {
												const { title, url } = value;
												return {
													href: url,
													title: title,
													avatar: 'https://joeschmoe.io/api/v1/random',
													description: 'this is our NFT default message',
													content: 'this is ourNFT default message',
												};
											})
										);
									} catch (err) {
										console.log(err);
										Modal.error({ title: err.error?.message || err.error });
									}
								}}
							>
								刷新
							</Button>
						</Space>
					}
				></MidCol>
				<List
					style={{ padding: '50px', width: '100%' }}
					itemLayout='vertical'
					size='large'
					pagination={{
						style: { backgroundColor: 'white' },
						pageSize: 3,
					}}
					dataSource={data}
					renderItem={(item) => (
						<List.Item
							style={{ backgroundColor: 'white' }}
							key={item.title}
							actions={
								[
									// <SendNFT
									// 	icon={SendOutlined}
									// 	text='send to other address'
									// 	key='list-vertical-star-o'
									// />,
								]
							}
							extra={<img width={272} alt='logo' src={item.href} />}
						>
							<List.Item.Meta
								avatar={<Avatar src={item.avatar} />}
								title={<a href={item.href}>{item.title}</a>}
								description={item.description}
							/>
							{item.content}
						</List.Item>
					)}
				/>
				<MidCol
					data={
						<Link to='/' style={linkStyle}>
							返回
						</Link>
					}
				></MidCol>
			</Row>
		</div>
	);
};

export default Get;
