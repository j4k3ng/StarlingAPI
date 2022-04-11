import React from "react"
import Header from "./components/Header"
import Data from "./components/Data"
import Login from "./components/Login"

export default function App() {
    
    const [loginData, setLoginData] = React.useState({
        token: "",
        uid: "",
        name: ""
    })

    function handleCallback(childData) {
        //the only problem is that useEffect run the first time when is empty
        console.log(childData)
        setLoginData(childData)
    }

    return (
        <div>
            <Header name={loginData.name} />
            <div>
                {
                    !loginData.token &&
                    <Login login={handleCallback} />
                }
            </div>
            <div>
                {
                    loginData.token &&
                    <Data parentCallback={handleCallback} />
                }
            </div>
        </div>
    )
}
