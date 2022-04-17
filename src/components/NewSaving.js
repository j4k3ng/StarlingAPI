import React from "react"
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'

export default function NewSaving(props) {
    /**
     * Allows the creating of a new saving account
     *
     * @param {object} saving send the new saving to ShowSaving.js
     * @param {object} (props.accountUid, props.token) needed to create
     * a new saving account
     * @param {function} callbackHandle is the callback to force rerendering form child to parent
     * @return {component} all the savings account and the new button.
     */
    const [show, setShow] = React.useState(false)
    const accountUid = props.uid
    const url = `https://api-sandbox.starlingbank.com/api/v2/account/${accountUid}/savings-goals`
    const [newSaving, setNewSaving] = React.useState({
        name: "",
        target: ""
    })

    function sendNewSaving() {
        /**
         * Generate a new savign by fetching the API 
         */
        let newsave = fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': `Bearer ${props.token}`
            },
            body: JSON.stringify({
                name: newSaving.name,
                currency: "GBP",
                target: {
                    currency: "GBP",
                    minorUnits: newSaving.target * 100,
                },
                base64EncodedPhoto: "string"
            })
        })
            .then(response => response.json())
            .then(data => {
                props.callbackHandle()
                return data
            })
        return newsave
    }

    function showForm() {
        /**
          * Shows or hide the new saving input form
          */
        setShow(prevState => !prevState)
    }

    function handleChange(event) {
        /**
         * Rerender the new saving input date while user type
         */
        const { name, value } = event.target
        setNewSaving(prevValue => {
            let obj = {
                ...prevValue,
                [name]: value
            }
            return obj
        })
    }

    return (
        <div className="newsaving">
            <Tooltip title="">
                <Button
                    style={{ maxWidth: '550px', minWidth: '150px', minHeight: '50px' }}
                    size="large"
                    color="primary"
                    variant="contained"
                    onClick={showForm}
                >
                    New
                </Button>

            </Tooltip>
            {
                show &&
                <div className="newsaving--form">
                    <TextField
                        placeholder="name"
                        name="name"
                        onChange={handleChange}
                    >
                    </TextField>
                    <TextField
                        placeholder="target"
                        name="target"
                        error={newSaving.target == "0"}
                        helperText={newSaving.target == "0" ? 'Zero field!' : ' '}
                        value={newSaving.target}
                        InputProps={{ inputProps: { type: "number", min: 1 } }}
                        onChange={handleChange}
                    >
                    </TextField>
                    <Button
                        onClick={() => {
                            if (newSaving.target != 0) {
                                sendNewSaving()
                            }
                        }}>
                        Save
                    </Button>
                </div>
            }
        </div>
    )
}
