import React from "react"
import Header from "./components/Header"
import Calendar from "./components/Calendar"
import Login from "./components/Login"
import ShowSaving from "./components/ShowSaving"

export default function App() {

    const [loginData, setLoginData] = React.useState({
        token: "",
        uid: "",
        name: "",
    })
    const [average, setAverage] = React.useState()

    function loginCallback(childData) {
        setLoginData(childData)
    }

    function averageCallback(childData) {
        setAverage(childData)
    }

    return (
        <div>
            <Header name={loginData.name} />
            <div>
                {
                    !loginData.token &&
                    <Login login={loginCallback} />
                }
            </div>
            <div>
                {
                    loginData.token &&
                    <Calendar
                        accountUid={loginData.uid}
                        token={loginData.token}
                        average={averageCallback} />
                }
            </div>
            <div>
                {
                    average &&
                    <ShowSaving
                        accountUid={loginData.uid}
                        token={loginData.token}
                        average={average} />
                }
            </div>
        </div>
    )
}
