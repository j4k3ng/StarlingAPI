import React from "react"
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

export default function Data(props) {

    const [showEndDate, setShowEndDate] = React.useState(false)
    const [input, setInput] = React.useState({
        startDate: new Date(),
        endDate: new Date()
    })
    const [average, setAverage] = React.useState()
    const [noDataAvailable, SetNoDataAvailable] = React.useState(false)
    
    function showAverage(){
        const accountUid = props.accountUid;
        const feed_url = `https://api-sandbox.starlingbank.com/api/v2/feed/account/${accountUid}/settled-transactions-between?`
        const time = "T00%3A00%3A00.000Z"
        const start = "minTransactionTimestamp="+input.startDate+time
        const end = "maxTransactionTimestamp="+input.endDate+time
        const url = feed_url+start+"&&"+end
        console.log(url)
        fetchData(url)
    }

    function handleChange(event) {
        const { name, value } = event.target
        setInput(prevInput => ({
            ...prevInput,
            [name]: value
        }))
        setShowEndDate(true)
        // trigger()
    }

    React.useEffect(() => {
        //Runs only when loginInput.uid change
        calculateEndDate()
    }, [input.startDate]);

    function calculateEndDate(){
        //console.log(new Date(input.startDate).getMonth())
        console.log(new Date(input.startDate))
        let result = new Date(input.startDate);
        result.setDate(result.getDate() + 7);


        let Month = result.getMonth()
        if(Month<11){
            Month = Month + 1
        }else{
            Month = 1
        }
        if(Month<10){
            Month =String("0"+Month )
        }
        let Year = result.getFullYear()
        let Day = result.getDate()
        if(Day<10){
            Day = String("0"+Day)
        }

        console.log(result)
        console.log(Month)
        console.log(Year)
        console.log(Day)

        setInput(prevInput => ({
            ...prevInput,
            endDate: Year+"-"+Month+"-"+Day
        }))

        //console.log(input)
        console.log(input.endDate)
        // console.log(input.date)
        // let day = new Date(1993,2,3)
        // day.setDate(3)
        // console.log(day.getDate())
        // let numberOfDaysToAdd = 6;
        // // let result = input.date.setDate(input.date.getDate() + numberOfDaysToAdd);
        // let result = day.getDate()
        // console.log(new Date(result))
    }

    function fetchData(url){
        fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${props.token}`
            }
        })
            .then(response => {
                console.log(response)
                if(response.status!=200){
                    SetNoDataAvailable(true)
                    return
                }
                return response.json()
            })
            .then(data => {
                console.log(data== undefined )
                if(data==undefined ||
                    data.feedItems.length<1){
                    console.log("si")
                    SetNoDataAvailable(true) 
                    setAverage("")
                    return
                }
                SetNoDataAvailable(false)
                getAverage(data.feedItems)
            })

        function getAverage(array){
            let sum = 0;
            let count = 0;
            for(let i = 0; i < array.length; i++){
                if (array[i].direction == "OUT"){
                    count += 1
                    let value = parseInt(array[i].amount.minorUnits)
                    console.log(value)
                    sum += value  
                    console.log("the sum is now "+sum)
                }
            }
            sum = sum/100;
            let avg = sum/count
            avg = Math.round(avg*100)/100
            console.log("the average is "+avg)
            setAverage(avg)
        }
    }

    React.useEffect(() => {
        //Runs only when average updates
        props.average(average)
    }, [average]);

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
                        value = {input.startDate}
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
                                value = {input.endDate}
                                onChange={handleChange}
                            />
                        }
                    </div>
                </div>
                <Button
                    color="primary" 
                    size="large" 
                    variant="contained"
                    onClick={showAverage}
                    >   
                    Select
                </Button>
                <div>
                    {
                        average && noDataAvailable==false &&
                        <div>
                            <h1>Your average out transaction is</h1>
                            <h1>£ {average} </h1>
                        </div>
                    }
                </div>
                <div>
                    {
                        noDataAvailable &&
                        <h1>No transactions found</h1>
                    }
                </div>

            </div>
        </div>
    )
}