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
        setNewGoal(prevValue => ({
            ...prevValue,
            [name]: value
        }))
    }

    function printing(event) {
        setShow(prevState => !prevState)
    }

    
    // React.useEffect(() => {
    //     async function newSaveandRerender(){
    //         const newSave = await newSaving()
    //         props.callbackHandle()
    //     }
    // })

    function newSaving() {
        console.log(url)
        let newsave = fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': `Bearer ${props.token}`
            },
            body: JSON.stringify({
                "name": newGoal.name,
                "currency": "GBP",
                "target": {
                  "currency": "GBP",
                  "minorUnits": newGoal.target
                },
                "base64EncodedPhoto": "string"
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
                <div className="card--form">
                    <TextField
                        placeholder="Saving-goal name"
                        name="name"
                        onChange={handleChange}
                        >
                    </TextField> 
                    <TextField
                        placeholder="Saving-goal target "
                        name="target"
                        onChange={handleChange}
                        >
                    </TextField> 
                    <Button
                    onClick={newSaving}>
                        Save
                    </Button>
                </div>
            }
        </div>
    )
}
