import React from "react"
import Saving from "./Saving"
import NewSaving from "./NewSaving"

export default function ShowSaving(props) {
    /**
     * Returns the savingsand the new saving component.
     *
     * @param {object} props includes the accountUid, token,
     * and the average amount from App.js
     *  
     * @return {component} all the savings account and the new button.
     */
    const url = `https://api-sandbox.starlingbank.com/api/v2/account/${props.accountUid}/savings-goals`
    const [saving, setSaving] = React.useState([]);
    // this is used to force the rerender of the parent component ShowSaving.js from both
    // the childs (Saving.js, NewSaving.js)
    const [renderFromChild, setRenderFromChild] = React.useState(false) 


    React.useEffect(() => {
        /**
         * Rerender the savings account when the accountUid change or 
         * when a saving target updates or either when a new saving account
         * is created.
         */
        async function getData() {
            const fetchedSavingArray = await fetchSaving()
            const cards = fetchedSavingArray.map(item => {
                return (
                    <Saving
                        saving={item}
                        accountUid={props.accountUid}
                        average={props.average}
                        token={props.token}
                        callbackHandle={() => {
                            setRenderFromChild(prevValue => !prevValue)
                        }}
                    />
                )
            })
            setSaving(cards)
        }
        getData()
    }, [props.accountUid, renderFromChild]);

    function fetchSaving() {
        /**
         * Get all the existing saving goal by fetching the API
         */
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
                callbackHandle={() => {
                    setRenderFromChild(prevValue => !prevValue)
                }} />
        </div>
    )
}