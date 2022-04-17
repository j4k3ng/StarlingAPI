import React from "react"
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

export default function Calendar(props) {
    /**
     * Renders a selectable calendar and fetch the transactions
     * in the selected period.
     *
     * @param {object} props inlcudes the accountUid and token from App.js 
     * @param {function} props is the callback function to update 
     * the average in App.js.
     * @return {component} the Calendar page.
     */
    const accountUid = props.accountUid;
    const [average, setAverage] = React.useState()
    const [noDataAvailable, SetNoDataAvailable] = React.useState(false) // alert if no data available
    const [showEndDate, setShowEndDate] = React.useState(false)
    const [input, setInput] = React.useState({
        startDate: new Date(),
        endDate: new Date()
    })
    const feed_url = `https://api-sandbox.starlingbank.com/api/v2/feed/account/${accountUid}/settled-transactions-between?`
    const time = "T00%3A00%3A00.000Z" //hardcode to midnight
    const start = "minTransactionTimestamp=" + input.startDate + time
    const end = "maxTransactionTimestamp=" + input.endDate + time
    const url = feed_url + start + "&&" + end

    function fetchAverage() {
        /**
         * Get all the transactions by fetching the API and
         * calculate the average spent in the selected week.f
         */
        fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${props.token}`
            }
        })
            .then(response => {
                if (response.status != 200) {
                    SetNoDataAvailable(true)
                    return
                }
                return response.json()
            })
            .then(data => {
                if (data == undefined ||
                    data.feedItems.length < 1) {
                    SetNoDataAvailable(true)
                    setAverage("")
                    return
                }
                SetNoDataAvailable(false)
                calculateAverage(data.feedItems)
            })
    }

    function calculateAverage(transactions) {
        /**
         * Calculate the average spent in a week.
         *
         * @param {array} transaction includes all the transacitons in 
         * the selected billing period
         */
        let sum = 0
        let count = 0
        for (let i = 0; i < transactions.length; i++) {
            if (transactions[i].direction == "OUT") {
                count += 1
                let value = parseInt(transactions[i].amount.minorUnits)
                sum += value
            }
        }
        sum = sum / 100
        let avg = sum / count
        avg = Math.round(avg * 100) / 100
        setAverage(avg)
    }


    function calculateEndDate() {
        /**
         * Calculate the end date from the start date input.
         */
        let result = new Date(input.startDate)
        result.setDate(result.getDate() + 7) //add 7 days
        let Month = result.getMonth()

        if (Month < 11) {
            Month = Month + 1
        } else {
            Month = 1
        }
        if (Month < 10) {
            Month = String("0" + Month)
        }

        let Year = result.getFullYear()
        let Day = result.getDate()

        if (Day < 10) {
            Day = String("0" + Day)
        }
        // set the end date with the correct format
        setInput(prevInput => ({
            ...prevInput,
            endDate: Year + "-" + Month + "-" + Day
        }))
    }

    React.useEffect(() => {
        /**
         * Updates the average into th parent component App.js
         * when average changes.
         */
        props.average(average)
    }, [average]);

    React.useEffect(() => {
        /**
         * Updates the end date when start date change
         */
        calculateEndDate()
    }, [input.startDate]);

    function handleChange(event) {
        /**
         * Rerender the input date while user type
         */
        const { name, value } = event.target
        setInput(prevInput => ({
            ...prevInput,
            [name]: value
        }))
        setShowEndDate(true)
    }

    return (
        <div>
            <div className="calendar">
                <h2>Select a billing week</h2>
                <div className="calendar--dates">
                    <TextField
                        label="Start Date"
                        InputLabelProps={{ shrink: true, required: true }}
                        variant="outlined"
                        color="primary"
                        type="date"
                        name="startDate"
                        value={input.startDate}
                        onChange={handleChange}
                    />
                    <div>
                        {
                            showEndDate &&
                            <TextField
                                label="End Date"
                                variant="outlined"
                                color="primary"
                                type="date"
                                name="endDate"
                                InputProps={{ readOnly: true }}
                                value={input.endDate}
                                onChange={handleChange}
                            />
                        }
                    </div>
                </div>
                <Button
                    color="primary"
                    size="large"
                    variant="contained"
                    onClick={fetchAverage}
                >
                    Select
                </Button>
                <div>
                    {
                        average && noDataAvailable == false &&
                        <div>
                            <h2>your weekly average expense is </h2>
                            <h1 className="calendar--average"> £ {average} </h1>
                        </div>
                    }
                    {
                        noDataAvailable &&
                        <h1>No transactions found</h1>
                    }
                </div>

            </div>
        </div>
    )
}