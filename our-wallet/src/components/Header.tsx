import {FaBeer} from "react-icons/fa";
import {AiOutlineBars} from "react-icons/ai";
import {Drawer, Flex, Menu} from 'antd';
import {Context, JSX, useContext, useState} from "react";
import {UserContext} from "../utils/context/user.tsx";
import {signIn} from "../utils/userApiWrapper/firebaseAuth.ts";


const AppHeader = ({handleSignIn = signIn, context = UserContext, menu = <Menu/>}: {
    handleSignIn?: () => Promise<void>,
    context?: Context<{ isLogin: boolean, email: string, handleLogout: () => Promise<void> }>,
    menu?: JSX.Element
}) => {
    const {isLogin, email} = useContext(context);
    const [visible, setVisible] = useState(false);

    return (
        <div style={{width: "100vw", backgroundColor: "black", height: "8vh"}}>
            <Flex justify={"space-between"} style={{
                width: "100%",
                height: "100%",
                alignItems: "center",
                padding: "0 10px",
                fontSize: "25px",
            }}>
                <FaBeer/>
                {isLogin ?
                    <span className={"logoutBtn"}
                          style={{color: "whitesmoke", maxWidth: "30vw", overflow: "hidden", whiteSpace: "nowrap"}}
                    >
                        {email}
                    </span> : <button className={"loginBtn"} style={{color: "white"}} onClick={async () => {
                        await handleSignIn();
                    }}>
                        Login
                    </button>}
                <button onClick={() => {
                    setVisible(true)
                }}>
                    <AiOutlineBars/>
                </button>
            </Flex>
            <Drawer
                title="Menu"
                placement="right"
                open={visible}
                onClose={() => {
                    setVisible(false)
                }}
            >
                {menu}
            </Drawer>
        </div>
    );
};

export default AppHeader;