import { AndroidOutlined, AppleOutlined } from '@ant-design/icons';
import {Avatar, List, Tabs} from 'antd';

const Coins = () => (
    <Tabs
        size={'large'}
        style={{ width: "100%", backgroundColor: "white", padding: "20px", borderRadius: "10px" }}
        defaultActiveKey="1"
        items={[
            {
                key: '1',
                label: <AppleOutlined />,
                children: <List
                    pagination={{pageSize: 5, position: "bottom"}}
                    dataSource={[
                        {
                            title: "金蘋果交易"
                        },
                        {
                            title: "銀蘋果交易"
                        },
                        {
                            title: "銅蘋果交易"
                        }
                    ]}
                    renderItem={(item, index) => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={
                                    <Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}/>
                                }
                                title={<a href="https://ant.design">{item.title}</a>}
                                description="交易細節,.... 留言, ............."
                            />
                        </List.Item>
                    )}
                />
            },
            {
                key: '2',
                label: <AndroidOutlined />,
                children: <List
                    pagination={{pageSize: 5, position: "bottom"}}
                    dataSource={[
                        {
                            title: "黑鮪魚一尾"
                        },
                        {
                            title: "秋刀魚一籮筐"
                        },
                        {
                            title: "鯖魚一箱"
                        }
                    ]}
                    renderItem={(item, index) => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={
                                    <Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}/>
                                }
                                title={<a href="https://ant.design">{item.title}</a>}
                                description="交易細節,.... 留言, ............."
                            />
                        </List.Item>
                    )}
                />
            },
        ]}
    />
);

export default Coins;
