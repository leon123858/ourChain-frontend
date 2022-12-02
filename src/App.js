import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Image } from 'antd';
import { header, linkStyle } from './style';
import icon from './resource/logo512.png';
import MidCol from './utils/MidCol';

function App() {
	return (
		<div className='App'>
			<Row>
				<Col span={24} style={{ minHeight: '5vh' }}></Col>
				<Col span={24} style={header}>
					OurNFT<small>OurChain NFT platform</small>
				</Col>
				<MidCol
					data={<Image width={'100%'} preview={false} src={icon} />}
				></MidCol>
				<Col span={24} style={{ minHeight: '5vh' }}></Col>
				<MidCol
					data={
						<Link to='/get' style={linkStyle}>
							查看 NFT
						</Link>
					}
				></MidCol>
				<Col span={24} style={{ minHeight: '5vh' }}></Col>
				<MidCol
					data={
						<Link to='/create' style={linkStyle}>
							創建 NFT
						</Link>
					}
				></MidCol>
			</Row>
		</div>
	);
}

export default App;
