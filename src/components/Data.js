import React from "react"

export default function Data() {
    const base_url = "https://api-sandbox.starlingbank.com/"
    const account_url = "api/v2/accounts"
    const token = "eyJhbGciOiJQUzI1NiIsInppcCI6IkdaSVAifQ.H4sIAAAAAAAA_31Uy5KbMBD8lRTn1RZYYB633PID-YBhNNgqC4mSxG62Uvn3CCSMcVw5dvc8ekYDvzPpXNZlMEkmaDTvzoNVUl960Ld3NGP2lrm5DxGnoe9PRXtiBULByqog1hTYsLxoywbO0EODIZh-TVlXnMv2nFenir9lEnwkqqJpFgIQzaz9D6ME2Z9ShNpNw8_DAMioaUtWlgMwOPOa8fqEzcBJ5NCE2t7cSMeMmho8V5CzPO85K9uaM6jzExNQ86Ju8xyhChlhrO-I5FzMIqypyuuBnTg_szInzlrOW8Z5MVSlQNGXS5ZDM9GylOiUoTKORGcJxLeNu672mYaRXgr-a3oSpCDt5SDJHnklnT8wCQhhg_GOhPR3EBXvAa8j3SN3_Gmlp28w-6ux0oVnZFIL-SHFDCoG96BAY7KGYAVDo701KjZamKQZPUg7gpdGMzOwYdbC3SV3776B2Bpn5824jUgjyFRYUTCiLx1Mk_q6ozVqBC3AUydIUSixwaTZG_llkMnSQJaCd_c_KdqI2qQAKWzA08Wuczwm_iumVLJ4hW26kTwEN9BhgKua8DrUBF9EmxRBGiKCPYjJES5ppkSEzlZvzxLjH2RvQTvA3XWgWT-rW7e9Lu3U7iDi3UTEW4HlRsK9jdLvNZXBYOKhwkowsxzJM5uyrBmk2kaKMx6oNcoSkpz8AbijFBfu4CM8omMXs_s4cGmaA7fWeWTiwsIZvCqxiy9q7WIsilcSsyLB0sISTd6HAecpwQm2jyj8MddjZsaKh_ZHdut7ZF_kM_Op77yn9cXQfTxTkxgSNfcObdjmcihbl0dujXq8pvXBns8r-_MXjHHOKgoGAAA.alRGurCqugPccgcd8lVFZOWQUng3tBhrcXvKG3fp4XtfB0YnJ3vA3eoqSSBKyghW5mx0uc6cbFx81h5Bqf8vKqwHeQ3uYyeW4Tm0doB1ADSm4oHw0x0ylQsNrPTf7u1L_8_P3-z7LM0GfyKPaOGIS_Ztus5gDlJZZInw4ukG7fqv_BdiHsY_UHiDRvh6RqCiQWv7-m8wbf4-4hu9PvW0qTid1FYo46QB-WJAXm_aHln2PItjI7sdZZugTE7FgoJihuaW9x5mpbsusohm5c44uM7u03ikTuiZJyS-NVdg77tYWWjD0yiRZNFbxgd3UxX3TPxwgbulBBeBi-mwx5LqLZ2fvJOVoNgBBTo_WxNEqLHAcYqq9h6rFjgx4CmsMcgmM3OqDcMTuDZllf-r6tq7aUGq_vi5twmjlCpKNvTUE1Hdz4tSTPcZgOxFWNH9XhfpLWKUPFJOp4IeVrpWKmIhjue0NkLu5uOLDYSDi1vQ3HfZ4WrejiVPcG6gT_VGEbmkrjLXPaeKir6cRSuSLDydNKE7sf2-HC9KwdHH_RgwsO9jAi7mNQRA1gdQVWH3rss-z2Tme1OPYGv2NMOPKFelWzFS25JpaKUl6nVULuWycCdySGqhhCH2KU8eztaeUzvcABpw_mkMuzd51bIjqdAKcbi_4BA74CXnxlxyWd9obiQ" 
    const url = base_url + account_url
    
    const [account, setAccount] = React.useState({})

    fetch(url,{
        headers:{
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}` 
        }
    })
    .then(response => response.json())
    .then(data => setAccount(data.accounts[0]))

    return(
        <div>
            <h1> my accouny is {account.accountUid}  </h1>
        </div>
    )
}