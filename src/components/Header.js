import React from "react"

export default function Header(props) {
    return (
        <header className="header">
            <img 
                src="./images/starling-logo.png" 
                className="header--image"
            />
            <div> 
                {
                    props.name &&
                    <h2 className="header--name">Hi {props.name}</h2>
                }
            </div>
        </header>
    )
}