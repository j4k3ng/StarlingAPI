import React from "react"
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

export default function Data(props) {
    const base_url = "https://api-sandbox.starlingbank.com/api/v2/"
    const account_url = "accounts"
    const accountHolderName_url = "account-holder/name"
    const url = base_url + accountHolderName_url

 
    const [input, setInput] = React.useState({
        startDate: new Date(),
        endDate: new Date()
    })

    function handleChange(event) {
        const { name, value } = event.target
        setInput(prevInput => ({
            ...prevInput,
            [name]: value
        }))
    }

    // function fetchData(){
    //     console.log(input)
    //     fetch(url, {
    //         headers: {
    //             'Accept': 'application/json',
    //             'Authorization': `Bearer ${input.token}`
    //         }
    //     })
    //         .then(response => response.json())
    //         .then(data => {
    //             console.log(data)
    //             props.parentCallback(data.accountHolderName)
    //             console.log(props.parentCallback)
    //             return setAccount(data);
    //         })

    // }
    function trigger(){
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
    return (
        <div>
            <h2>Enter the starting date</h2>
            <TextField 
                label="Start date"
                variant="outlined" 
                color="secondary" 
                type="date"
                name="startDate" 
                value = {input.startDate}
                onChange={handleChange}
            />
            <TextField 
                label="End Date"
                variant="outlined" 
                color="secondary" 
                type="date"
                name="endDate" 
                InputProps={{ readOnly: true }}
                value = {input.endDate}
                onChange={handleChange}
            />
            <Button 
                color="primary" 
                size="large" 
                variant="contained"
                onClick={trigger}
                >   
                Select
            </Button>
        </div>
    )
}