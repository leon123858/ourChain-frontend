import {FaBeer} from "react-icons/fa";
import {AiOutlineBars} from "react-icons/ai";
import {Flex} from 'antd';
import {Context, useContext} from "react";
import {UserContext} from "../utils/context/user.tsx";
import {signIn} from "../utils/userApiWrapper/firebaseAuth.ts";


const AppHeader = ({handleSignIn = signIn, context = UserContext}: {
    handleSignIn?: () => Promise<void>,
    context?: Context<{ isLogin: boolean, email: string, handleLogout: () => Promise<void> }>
}) => {
    const {isLogin, handleLogout, email} = useContext(context);

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
                    <button className={"logoutBtn"}
                            style={{color: "whitesmoke", maxWidth: "30vw", overflow: "hidden", whiteSpace: "nowrap"}}
                            onClick={async () => {
                                await handleLogout();
                            }}>
                        Logout {email}
                    </button> : <button className={"loginBtn"} style={{color: "white"}} onClick={async () => {
                        await handleSignIn();
                    }}>
                        Login
                    </button>}
                <button>
                    <AiOutlineBars/>
                </button>
            </Flex>
        </div>
    );
};

export default AppHeader;