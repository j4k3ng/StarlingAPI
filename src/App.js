import React from "react"
import Header from "./components/Header"
import Data from "./components/Data"
import Login from "./components/Login"
import Saving from "./components/Saving"

export default function App() {
    
    const [loginData, setLoginData] = React.useState({
        token: "",
        uid: "",
        name: "",
    })
    const [average, setAverage] = React.useState()

    function loginCallback(childData) {
        //the only problem is that useEffect run the first time when is empty

        // const handleSomething = (values) => {
        //     values.map((value) => {
        //       setMyState((oldValue) => [...oldValue, { key: value.dataWhatYouWant }]);
        //     }
        // }}

        // let keys = Object.keys(childData);
        // console.log(childData)
        console.log(childData)
        setLoginData(childData)
    }

    function averageCallback(childData){
        console.log(childData)
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
                    <Data accountUid={loginData.uid} token={loginData.token} average={averageCallback}/>
                }
            </div>
            <div> 
                {
                    average &&
                    <Saving accountUid={loginData.uid} token={loginData.token} average={average}/>
                }
            </div>
        </div>
    )
}
