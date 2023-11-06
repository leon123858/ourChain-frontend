import {List, Typography} from "antd";


function ScannerPanel() {
    return (
        <div>
        <h1>Scanner Panel</h1>
            <List
                header={<div>Header</div>}
                footer={<div>Footer</div>}
                bordered
                dataSource={[]}
                renderItem={(item) => (
                    <List.Item>
                        <Typography.Text mark>[ITEM]</Typography.Text> {item}
                    </List.Item>
                )}
            />
        </div>
    )
}

export default ScannerPanel;