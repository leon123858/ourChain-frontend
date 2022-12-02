import React from 'react';
import { Col } from 'antd';

const MidCol = ({ data, style }) => {
	return (
		<>
			<Col span={8}></Col>
			<Col span={8} style={style}>
				{data}
			</Col>
			<Col span={8}></Col>
		</>
	);
};

export default MidCol;
