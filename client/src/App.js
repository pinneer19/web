import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import {observer} from "mobx-react-lite";
import {useContext, useEffect, useState} from "react";
import {Context} from "./index";
import {check, getUser} from "./http/userAuth";
import Loader from "./components/Loader"
const App = observer(() => {
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        check()
            .then(async (data) =>  {
                const response = await getUser()
                user.setUser(response.data.message)
                user.setIsAuth(true)
            })
            .catch(_ => {})
            .finally(() => setLoading(false))
    }, []);

    if(loading) {
        return <Loader/>
    }
    return (
        <BrowserRouter>
            <NavBar/>
            <AppRouter/>
        </BrowserRouter>
    );
});

export default App;
