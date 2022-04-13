import React from "react"
import Goal from "./Goal"
import NewGoal from "./NewGoal"
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

export default function Saving(props) {
    const accountUid = props.accountUid
    const url = `https://api-sandbox.starlingbank.com/api/v2/account/${accountUid}/savings-goals`
    const [goal, setGoal] = React.useState([]);

    React.useEffect(() => {
        //Runs only when accountUid update or logindata in general
        async function getData() {
            const fetchedSavingArray = await fetchSaving()
            console.log(fetchedSavingArray)
            fetchedSavingArray.unshift({ name: "new saving", savingsGoalUid: 0 })
            const cards = fetchedSavingArray.map(item => {
                console.log(item)
                return (
                    <Goal
                        goal={item}
                        // uid={item.savingsGoalUid}
                    />
                )
            })
            setGoal(prevValue => [...prevValue, cards])
        }
        getData()
    }, [accountUid]);

    function fetchSaving() {
        console.log(url)
        let fetched = fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${props.token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                // console.log(data.savingsGoalList[0].name)
                return data.savingsGoalList
            })
        return fetched
    }

    return (
        <div className="saving">
            <div>
                <h2> Send this amount into an existing saving or create a new one </h2>
            </div>
            <div className="card--list">
                {goal}
            </div>
            <NewGoal goal={goal}/>
        </div>
    )
}