import { Menu } from "antd";
import {AiOutlineLogout, AiOutlineSetting} from "react-icons/ai";
import {Context, useContext, useEffect, useState} from "react";
import {UserContext} from "../utils/context/user.tsx";

const renderProfilePanel = ({name,id,email}:{
    name:string,
    id:string,
    email:string
}) => {
    return (
        <div style={{color:"black"}}>
            <h2>個人資訊</h2>
            <p>姓名： {name}</p>
            <p className={"uid"}>ID：{id}</p>
            <p>郵箱：{email}</p>
        </div>
    );
};

const AppMenu = ({getUserInfo, userContext = UserContext}: {getUserInfo: ()=> any, userContext?: Context<any>}) => {
    const {isLogin, handleLogout} = useContext(userContext);
    const [userInfo, setUserInfo] = useState({
        name: "",
        id: "",
        email: ""
    })

    useEffect(()=>{
        if(isLogin) {
            const user = getUserInfo();
            if(user) {
                setUserInfo({
                    name: user.displayName || "",
                    id: user.uid,
                    email: user.email || ""
                })
            }
        }
    },[isLogin])

    return (
        <div>
            {isLogin && renderProfilePanel(userInfo)}
            <Menu defaultSelectedKeys={['1']} mode="inline" items={
                [
                    {
                        key: "1",
                        icon: <AiOutlineSetting />,
                        label: "設置"
                    },
                    {
                        key: "2",
                        icon: <AiOutlineLogout />,
                        label: "登出",
                        className: "logoutBtn",
                        onClick: handleLogout
                    }
                ]
            }>
            </Menu>
        </div>
    );
}

export default AppMenu;