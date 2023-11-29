import './App.module.css'
import AppHeader from "./components/Header.tsx";
import {UserContextProvider} from "./utils/context/user.tsx";

function App() {
    return (
        <UserContextProvider>
            <AppHeader/>
        </UserContextProvider>

    )
}

export default App
