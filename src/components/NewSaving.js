import React from "react"
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { makeStyles } from "@material-ui/core";
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles ({
    root: {
      '&:hover': {
         backgroundColor: "#51e76f",
         textDecoration: 'none', 
      },
    },
  });
  
export default function NewSaving(props) {
    const [show, setShow] = React.useState(false)
    const accountUid = props.uid
    const url = `https://api-sandbox.starlingbank.com/api/v2/account/${accountUid}/savings-goals`
    const [newSaving, setNewSaving] = React.useState({
        name: "",
        target: ""  
    })

    function sendNewSaving() {
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
                  minorUnits: newSaving.target*100,    
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
        setShow(prevState => !prevState)
    }

    function handleChange(event) {
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
                    style={{ maxWidth: '550px', minWidth: '150px', minHeight:'50px'}}
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
                            if(newSaving.target!=0){
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
