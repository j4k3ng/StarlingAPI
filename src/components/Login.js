import React from "react"
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

export default function Login(props) {
    const base_url = "https://api-sandbox.starlingbank.com/api/v2/"
    const account_url = "accounts"
    const accountHolderName_url = "account-holder/name"
    const uid_url = base_url + account_url
    const name_url = base_url + accountHolderName_url

    const [loginInput, setLoginInput] = React.useState({
        token: "",
        uid: "",
        name: ""
    })

    function handleChange(event) {
        setLoginInput(prevInput => ({
            ...prevInput,
            token: event.target.value
        }))
    }

    function fetchLogin(event) {
        const header = {
            'Accept': 'application/json',
            'Authorization': `Bearer ${loginInput.token}`,
        }

        Promise.all([
            fetch(name_url, { headers: header }),
            fetch(uid_url, { headers: header })
        ]).
            then(response => {
                response[0].json().then(data => {
                    setLoginInput(prevInput => ({
                        ...prevInput,
                        name: data.accountHolderName
                    }))
                })
                response[1].json().then(data => {
                    setLoginInput(prevInput => ({
                        ...prevInput,
                        uid: data.accounts[0].accountUid
                    }))
                })
            })
    }

    React.useEffect(() => {
        //Runs only when loginInput.uid change
        props.login({
            token: loginInput.token,
            uid: loginInput.uid,
            name: loginInput.name
        })
    }, [loginInput.uid]);

    return (
        <div className="login">
            <h2 className="login-text">Log in to Starling Bank</h2>
            <TextField className="login--token"
                placeholder="Enter your token"
                margin="normal"
                variant="outlined"
                color="primary"
                InputProps={{ style: { fontSize: 20, color: 'black' } }}
                InputLabelProps={{ style: { fontSize: 20 } }}
                name="token"
                value={loginInput.token}
                onChange={handleChange}
                multiline
            />
            <Button
                color="secondary"
                size="large"
                variant="contained"
                name="button"
                onClick={fetchLogin}
            >
                login
            </Button>
        </div>
    )
}