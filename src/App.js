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
        console.log(childData)
        setLoginData(childData)

        //console.log(loginData) non so perche ma mi esce vuoto
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
            {/* <Data parentCallback={handleCallback} /> */}
        </div>
    )
}
