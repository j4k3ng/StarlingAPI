import React from "react"
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { makeStyles } from "@material-ui/core";
import Tooltip from '@material-ui/core/Tooltip';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

// customizing material-ui style
const useStyles = makeStyles({
    root: {
        '&:hover': {
            backgroundColor: 'a3e9d9',
            textDecoration: 'none',
        },
        'backgroundColor': "#50e3c2"
    },
});

export default function Saving(props) {
    /**
     * Allows transfering money to a saving account..
     *
     * @param {array} props.item inclued the name, target and currency of the saving account.
     * @param {object} (props.saving, props.accountUid, props.average) are needed to 
     * transfer money into the saving account 
     * @param {function} callbackHandle is the callback to force rerendering form child to parent 
     * @return {component} the Saving component.
     */
    const classes = useStyles()
    const [sent, setSent] = React.useState(false) // check if sent
    const [noFounds, setNoFounds] = React.useState(false) // check founds availability

    function sendMoney(event) {
        /**
         * Send money into a saving acount by clicking it.
         *
         * @param {object} event is the caputer user click of the selected
         * saving account.
         */
        const transferUid = generateUUID()
        const savingsGoalUid = event.currentTarget.id;
        const url = `https://api-sandbox.starlingbank.com/api/v2/account/${props.accountUid}/savings-goals/${savingsGoalUid}/add-money/${transferUid}`
        let send = fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': `Bearer ${props.token}`
            },
            body: JSON.stringify({
                amount: {
                    currency: "GBP",
                    minorUnits: props.average * 100
                }
            })
        })
            .then(response => {
                if (response.status == 400) {
                    setNoFounds(true)
                    return
                }
                return response.json()
            })
            .then(data => {
                if (data) {
                    props.callbackHandle()
                    setSent(true)
                    return data
                }
            })
        return send
    }

    function generateUUID() { // Public Domain/MIT
        /**
         * Generate a random UUID
         *
         * @param {string} UUID 
         */
        var d = new Date().getTime();//Timestamp
        var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16;//random number between 0 and 16
            if (d > 0) {//Use timestamp until depleted
                r = (d + r) % 16 | 0;
                d = Math.floor(d / 16);
            } else {//Use microseconds since page-load if supported
                r = (d2 + r) % 16 | 0;
                d2 = Math.floor(d2 / 16);
            }
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }

    return (
        <div className="saving">
            <Tooltip title="">
                <Button
                    className={classes.root}
                    style={{ maxWidth: '550px', minWidth: '250px' }}
                    size="large"
                    color="default"
                    variant="contained"
                    onClick={sendMoney}
                    id={props.saving.savingsGoalUid}
                    name={props.saving.name}
                >
                    <p>
                        <b> {props.saving.name}</b> <br />
                        <small> target: £ {props.saving.target.minorUnits / 100} </small> <br />
                        <small> saved: £ {props.saving.totalSaved.minorUnits / 100}</small>
                    </p>
                </Button>
            </Tooltip>
            {
                props.saving.savingsGoalUid == 0 &&
                <div>
                    <TextField
                        placeholder="saving-goal name"
                    >
                    </TextField>
                    <Button>
                        Send
                    </Button>
                </div>
            }
            <div>
                {
                    noFounds &&
                    <Alert severity="error">
                        <AlertTitle>Error</AlertTitle>
                        <strong>not enough balance</strong>
                    </Alert>
                }
            </div>
            <div>
                {
                    sent &&
                    <Alert severity="success">
                    </Alert>
                }
            </div>
        </div>

    )
}
