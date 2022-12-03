import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Form, Input, Modal } from 'antd';
import { linkStyle } from '../style.js';
import MidCol from '../utils/MidCol';

const Create = () => {
	const [form] = Form.useForm();
	return (
		<div>
			<Row>
				<Col span={24} style={{ minHeight: '5vh' }}></Col>
				{/* <MidCol
					data={
						<Form
							style={{ backgroundColor: 'white', padding: '10px' }}
							name='basic'
							labelCol={{ span: 8 }}
							wrapperCol={{ span: 16 }}
							initialValues={{ remember: true }}
							onFinish={() => {}}
							onFinishFailed={() => {}}
							autoComplete='off'
						>
							<Form.Item label='設定'>
								<span className='ant-form-text'>創建 NFT 帳號</span>
							</Form.Item>

							<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
								<Button type='primary' htmlType='submit'>
									創建
								</Button>
							</Form.Item>
						</Form>
					}
				></MidCol>
				<Col span={24} style={{ minHeight: '5vh' }}></Col> */}
				<MidCol
					data={
						<Form
							form={form}
							style={{ backgroundColor: 'white', padding: '10px' }}
							name='basic'
							labelCol={{ span: 8 }}
							wrapperCol={{ span: 16 }}
							initialValues={{ remember: true }}
							onFinish={async (data) => {
								try {
									await window.electronRequest('create', {
										txid: data.id,
										title: data.title,
										url: data.url,
									});
									Modal.success({
										title: '上傳成功',
										content: '請耐心等待上鍊',
									});
									form.resetFields();
								} catch (err) {
									console.log(err);
									Modal.error({ title: err.error?.message || err.error });
								}
							}}
							autoComplete='on'
						>
							<Form.Item label='設定'>
								<span className='ant-form-text'>上傳新 NFT</span>
							</Form.Item>
							<Form.Item
								label='NFT 帳號'
								name='id'
								rules={[
									{
										required: true,
										message: 'Please input your NFT txid!',
									},
								]}
							>
								<Input placeholder='上傳目標的 NFT 帳號' />
							</Form.Item>
							<Form.Item
								label='NFT 連結'
								name='url'
								rules={[
									{
										required: true,
										message: 'Please input your NFT image link!',
									},
								]}
							>
								<Input />
							</Form.Item>
							<Form.Item
								label='NFT 標題'
								name='title'
								rules={[
									{
										required: true,
										message: 'Please input your NFT image title!',
									},
								]}
							>
								<Input />
							</Form.Item>
							<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
								<Button type='primary' htmlType='submit'>
									上傳
								</Button>
							</Form.Item>
						</Form>
					}
				></MidCol>
				<Col span={24} style={{ minHeight: '5vh' }}></Col>
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

export default Create;
