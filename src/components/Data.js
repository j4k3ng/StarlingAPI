import React from "react"
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

export default function Data(props) {
    const base_url = "https://api-sandbox.starlingbank.com/api/v2/"
    const account_url = "accounts"
    const accountHolderName_url = "account-holder/name"
    //let token = "eyJhbGciOiJQUzI1NiIsInppcCI6IkdaSVAifQ.H4sIAAAAAAAA_31Uy5KbMBD8lRTn1RZYYB633PID-YBhNNgqC4mSxG62Uvn3CCSMcVw5dvc8ekYDvzPpXNZlMEkmaDTvzoNVUl960Ld3NGP2lrm5DxGnoe9PRXtiBULByqog1hTYsLxoywbO0EODIZh-TVlXnMv2nFenir9lEnwkqqJpFgIQzaz9D6ME2Z9ShNpNw8_DAMioaUtWlgMwOPOa8fqEzcBJ5NCE2t7cSMeMmho8V5CzPO85K9uaM6jzExNQ86Ju8xyhChlhrO-I5FzMIqypyuuBnTg_szInzlrOW8Z5MVSlQNGXS5ZDM9GylOiUoTKORGcJxLeNu672mYaRXgr-a3oSpCDt5SDJHnklnT8wCQhhg_GOhPR3EBXvAa8j3SN3_Gmlp28w-6ux0oVnZFIL-SHFDCoG96BAY7KGYAVDo701KjZamKQZPUg7gpdGMzOwYdbC3SV3776B2Bpn5824jUgjyFRYUTCiLx1Mk_q6ozVqBC3AUydIUSixwaTZG_llkMnSQJaCd_c_KdqI2qQAKWzA08Wuczwm_iumVLJ4hW26kTwEN9BhgKua8DrUBF9EmxRBGiKCPYjJES5ppkSEzlZvzxLjH2RvQTvA3XWgWT-rW7e9Lu3U7iDi3UTEW4HlRsK9jdLvNZXBYOKhwkowsxzJM5uyrBmk2kaKMx6oNcoSkpz8AbijFBfu4CM8omMXs_s4cGmaA7fWeWTiwsIZvCqxiy9q7WIsilcSsyLB0sISTd6HAecpwQm2jyj8MddjZsaKh_ZHdut7ZF_kM_Op77yn9cXQfTxTkxgSNfcObdjmcihbl0dujXq8pvXBns8r-_MXjHHOKgoGAAA.alRGurCqugPccgcd8lVFZOWQUng3tBhrcXvKG3fp4XtfB0YnJ3vA3eoqSSBKyghW5mx0uc6cbFx81h5Bqf8vKqwHeQ3uYyeW4Tm0doB1ADSm4oHw0x0ylQsNrPTf7u1L_8_P3-z7LM0GfyKPaOGIS_Ztus5gDlJZZInw4ukG7fqv_BdiHsY_UHiDRvh6RqCiQWv7-m8wbf4-4hu9PvW0qTid1FYo46QB-WJAXm_aHln2PItjI7sdZZugTE7FgoJihuaW9x5mpbsusohm5c44uM7u03ikTuiZJyS-NVdg77tYWWjD0yiRZNFbxgd3UxX3TPxwgbulBBeBi-mwx5LqLZ2fvJOVoNgBBTo_WxNEqLHAcYqq9h6rFjgx4CmsMcgmM3OqDcMTuDZllf-r6tq7aUGq_vi5twmjlCpKNvTUE1Hdz4tSTPcZgOxFWNH9XhfpLWKUPFJOp4IeVrpWKmIhjue0NkLu5uOLDYSDi1vQ3HfZ4WrejiVPcG6gT_VGEbmkrjLXPaeKir6cRSuSLDydNKE7sf2-HC9KwdHH_RgwsO9jAi7mNQRA1gdQVWH3rss-z2Tme1OPYGv2NMOPKFelWzFS25JpaKUl6nVULuWycCdySGqhhCH2KU8eztaeUzvcABpw_mkMuzd51bIjqdAKcbi_4BA74CXnxlxyWd9obiQ"
    const url = base_url + accountHolderName_url

    const [account, setAccount] = React.useState({})
    const [input, setInput] = React.useState({
        token:"",
        date:""
    })

    function handleChange(event) {
        const { name, value } = event.target
        setInput(prevInput => ({
            ...prevInput,
            [name]: value
        }))
    }

    function fetchData(){
        console.log(input)
        fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${input.token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                props.parentCallback(data.accountHolderName)
                console.log(props.parentCallback)
                return setAccount(data);
            })

    }

    return (
        <div>
            <h2>Enter your account Token and the starting date</h2>
            <TextField 
                placeholder="Enter your token"
                name="token"
                value = {input.token}
                onChange={handleChange}
            />
            <TextField 
                variant="outlined" 
                color="secondary" 
                type="date"
                name="date" 
                value = {input.date}
                onChange={handleChange}
            />
            <Button 
                color="primary" 
                size="large" 
                variant="contained"
                onClick={fetchData}
                >   
                login
            </Button>
            <div>
                {/* {
                    account.accountHolderName &&
                    <h1> Hi {account.accountHolderName}  </h1>
                } */}
            </div>
        </div>
    )
}