import React from "react"
import Saving from "./Saving"
import NewSaving from "./NewSaving"

export default function ShowSaving(props) {
    const url = `https://api-sandbox.starlingbank.com/api/v2/account/${props.accountUid}/savings-goals`
    const [saving, setSaving] = React.useState([]);
    const [renderFromChild, setRenderFromChild] = React.useState(false)
    
    React.useEffect(() => {
        //Runs only when accountUid update or logindata in general
        async function getData() {
            const fetchedSavingArray = await fetchSaving()
            const cards = fetchedSavingArray.map(item => {
                return (
                    <Saving
                        saving={item}
                        accountUid={props.accountUid}
                        average={props.average}
                        token={props.token}
                        callbackHandle={()=>{
                            setRenderFromChild(prevValue => !prevValue)
                        }}
                    />
                )
            })
            setSaving(cards)
        }
        getData()
    }, [props.accountUid,renderFromChild]);

    function fetchSaving() {
        let fetched = fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${props.token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                return data.savingsGoalList
            })
        return fetched
    }

    return (
        <div className="showsaving">
            <h1 className="showsaving--title"> Send this amount into an existing saving account or create a new one </h1>
            <div className="saving--list">
                {saving}
            </div>
            <NewSaving 
                saving={saving} 
                uid={props.accountUid} 
                token={props.token}
                callbackHandle={()=>{
                    setRenderFromChild(prevValue => !prevValue)
                }}/>
        </div>
    )
}