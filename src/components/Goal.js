import React from "react"
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card';

export default function Goal(props) {
    
    function printing(uid) {
        console.log(uid.currentTarget.name)
    }

    return (
        <div className="card">
            <Button 
                size="large"
                color="secondary"
                variant="contained"
                onClick={printing}
                uid={props.goal.savingsGoalUid}
                name={props.goal.savingsGoalUid}
            >
                {props.goal.name}
            </Button>
        </div>
    )
}