import './App.module.css'
import AppHeader from "./components/Header.tsx";
import {UserContextProvider} from "./utils/context/user.tsx";
import AppMenu from "./components/Menu.tsx";
import {getCurrentUser} from "./utils/userApiWrapper/firebaseAuth.ts";
import Dashboard from "./components/Dashboard.tsx";
import {Avatar, Col, message, Row} from "antd";
import Coins from "./components/Coins.tsx";
import Record from "./components/Record.tsx";
import { registerSW } from 'virtual:pwa-register';


function App() {
    const updateSW = registerSW({
        onNeedRefresh() {
            const confirmed = window.confirm(
                "A new version is available! Reload to update?"
            );
            if (confirmed) {
                updateSW(true).then(r => console.log(r));
            }
        },
        onOfflineReady() {},
    });
    return (
        <UserContextProvider>
            <AppHeader menu={<AppMenu getUserInfo={getCurrentUser}/>}/>
            <br/>
            <Row justify="center">
                <Col span={20}>
                    <Dashboard
                        avatarSrc={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />}
                        name="OurCoin"
                        description="local cryptocurrency"
                        dollars={<h2>1000(coins)</h2>}
                        onButtonClick={async () => {
                            message.info('Followed');
                        }}
                    />
                </Col>
            </Row>
            <br/>
            <Row justify="center">
                <Col span={20}>
                    <Coins />
                </Col>
            </Row>
            <br/>
            <Row justify="center">
                <Col span={20}>
                   <Record />
                </Col>
            </Row>
        </UserContextProvider>
    )
}

export default App
