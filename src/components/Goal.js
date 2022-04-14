import React from "react"
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { makeStyles } from "@material-ui/core";
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles ({
    root: {
      '&:hover': {
        //  backgroundColor: "#51e76f",
         textDecoration: 'none', 
      },
    },
  });
  
export default function Goal(props) {
    const classes = useStyles()

    function generateUUID() { // Public Domain/MIT
        var d = new Date().getTime();//Timestamp
        var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16;//random number between 0 and 16
            if(d > 0){//Use timestamp until depleted
                r = (d + r)%16 | 0;
                d = Math.floor(d/16);
            } else {//Use microseconds since page-load if supported
                r = (d2 + r)%16 | 0;
                d2 = Math.floor(d2/16);
            }
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }
    function sendMoney(event) {
        const transferUid = generateUUID()
        const savingsGoalUid = event.currentTarget.id;
        const url = `https://api-sandbox.starlingbank.com/api/v2/account/${props.accountUid}/savings-goals/${savingsGoalUid}/add-money/${transferUid}`
        console.log(url)
        let send     = fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': `Bearer ${props.token}`
            },
            body: JSON.stringify({
                amount: {
                  currency: "GBP",
                  minorUnits: props.average*100
                }
              })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                props.callbackHandle()
                return data
            })
        return send
    }

    function printing(event) {
        console.log(event.currentTarget.id)
    }

    return (
        <div className="card">
            <Tooltip title="send">
                <Button 
                    className={classes.root}
                    style={{maxWidth: '150px', minWidth: '100px'}}
                    size="large"
                    color="secondary"
                    variant="contained"
                    onClick={sendMoney}
                    id={props.goal.savingsGoalUid}
                    name={props.goal.name}
                >
                    {props.goal.name} <br />
                    target: {props.goal.target.minorUnits} <br />
                    saved: {props.goal.totalSaved.minorUnits}
                </Button>
            </Tooltip>
            {
                props.goal.savingsGoalUid==0 &&
                <div className="card--form">
                    <TextField
                        placeholder="Saving-goal name"
                        >
                    </TextField> 
                    <Button>
                        Send
                    </Button>
                </div>
            }
        </div>
    )
}
