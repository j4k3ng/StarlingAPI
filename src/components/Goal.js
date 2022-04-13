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
  
export default function Goal(props) {
    const classes = useStyles()

    function printing(uid) {
        console.log(uid.currentTarget.name)
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
                    onClick={printing}
                    uid={props.goal.savingsGoalUid}
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
