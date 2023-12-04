import {Button, Card, Flex, Space} from 'antd';
import {
    AiOutlineEdit,
    AiOutlineEllipsis,
    AiOutlinePlus,
    AiOutlineQrcode,
    AiOutlineSetting
} from "react-icons/ai";
import {ReactNode} from "react";

const Dashboard = ({avatarSrc, name, description, dollars, onButtonClick}: {
    avatarSrc: ReactNode,
    name: string,
    description: string,
    dollars: ReactNode,
    onButtonClick: () => void
}) => {
    return (
        <Card style={{width: "100%"}}
              actions={[
                  <AiOutlineSetting key="setting"/>,
                  <AiOutlineEdit key="edit"/>,
                  <AiOutlineEllipsis key="ellipsis"/>,
              ]}>
            <Card.Meta
                avatar={avatarSrc}
                title={name}
            />
            <Flex justify={"space-between"}>
                <p>{description}</p>
                {dollars}
                <Space size={"large"} >
                    <Button type="primary" onClick={onButtonClick}>
                        <AiOutlineQrcode/>
                    </Button>
                    <Button type="primary" onClick={onButtonClick}>
                        <AiOutlinePlus/>
                    </Button>
                </Space>
            </Flex>
        </Card>
    );
};

export default Dashboard;