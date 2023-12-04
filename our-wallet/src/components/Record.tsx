import { List } from 'antd';

const data = [
    'callcontract 12345567899 apple bunny crazy',
    'sendmoney 12345567899 223456789',
    'callcontract 12345567899 apple bunny crazy',
    'callcontract 12345567899 apple bunny crazy',
    'sendmoney 12345567899 223456789',
    'sendmoney 12345567899 223456789',
    'callcontract 12345567899 apple bunny crazy',
    'callcontract 12345567899 apple bunny crazy',
    'callcontract 12345567899 apple bunny crazy',
];

const Record = () => (
    <>
        <List
            size="large"
            style={{ width: "100%", backgroundColor: "gray", padding: "20px", borderRadius: "10px" }}
            header={<div>原始鏈上交易</div>}
            bordered
            dataSource={data}
            renderItem={(item) => <List.Item>{item}</List.Item>}
        />
    </>
);

export default Record;