import './App.module.css'
import AppHeader from "./components/Header.tsx";
import {UserContextProvider} from "./utils/context/user.tsx";
import AppMenu from "./components/Menu.tsx";
import {getCurrentUser} from "./utils/userApiWrapper/firebaseAuth.ts";

function App() {
    return (
        <UserContextProvider>
            <AppHeader menu={<AppMenu getUserInfo={getCurrentUser}/>}/>
        </UserContextProvider>
    )
}

export default App
