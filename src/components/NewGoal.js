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
  
export default function NewGoal(props) {
    const [show, setShow] = React.useState(false)
    const accountUid = props.uid
    const url = `https://api-sandbox.starlingbank.com/api/v2/account/${accountUid}/savings-goals`
    const [newGoal, setNewGoal] = React.useState({
        name: "",
        target: ""  
    })
    const classes = useStyles()

    function handleChange(event) {
        console.log(event)
        const { name, value } = event.target
        setNewGoal(prevValue => {
            let obj = { 
            ...prevValue,
            [name]: value
            }
            return obj
        })
    }

    function printing(event) {
        setShow(prevState => !prevState)
    }

    function newSaving() {
        let newsave = fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': `Bearer ${props.token}`
            },
            body: JSON.stringify({
                name: newGoal.name,
                currency: "GBP",
                target: {
                  currency: "GBP",
                  minorUnits: newGoal.target*100,    
                },
                base64EncodedPhoto: "string"
              })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                props.callbackHandle()
                return data
            })
        return newsave
    }

    return (
        <div className="newgoal">
            <Tooltip title="">
                <Button 
                    //className={classes.root}
                    style={{ maxWidth: '550px', minWidth: '150px', minHeight:'50px'}}
                    size="large"
                    color="primary"
                    variant="contained"
                    onClick={printing}
                >
                    New
                </Button>
                
            </Tooltip>
            {
                show &&
                <div className="goal--form">
                    <TextField
                        placeholder="name"
                        name="name"
                        onChange={handleChange}
                        >
                    </TextField> 
                    <TextField
                        placeholder="target "
                        name="target"
                        error={newGoal.target == "0"}
                        helperText={newGoal.target == "0" ? 'Zero field!' : ' '}
                        value={newGoal.target}
                        InputProps={{ inputProps: { type: "number", min: 1 } }}
                        onChange={handleChange}
                        >
                    </TextField> 
                    <Button
                        onClick={() => {
                            if(newGoal.target!=0){
                                newSaving()
                            }
                        }}>
                        Save
                    </Button>
                </div>
            }
        </div>
    )
}
