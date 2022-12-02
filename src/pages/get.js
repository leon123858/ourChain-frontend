import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Avatar, List, Space, Button, Input } from 'antd';
// import { SendOutlined } from '@ant-design/icons';
import { linkStyle } from '../style.js';
import MidCol from '../utils/MidCol';

const data = Array.from({
	length: 23,
}).map((_, i) => ({
	href: 'https://ant.design',
	title: `ant design part ${i}`,
	avatar: 'https://joeschmoe.io/api/v1/random',
	description:
		'Ant Design, a design language for background applications, is refined by Ant UED Team.',
	content:
		'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
}));

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
							<Button onClick={() => {}}>刷新</Button>
						</Space>
					}
				></MidCol>
				<List
					style={{ padding: '50px' }}
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
							extra={
								<img
									width={272}
									alt='logo'
									src='https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png'
								/>
							}
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
