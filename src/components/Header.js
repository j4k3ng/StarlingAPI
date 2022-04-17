import React from "react"

export default function Header(props) {
    /**
     * Renders the header of the page.
     *
     * @param {object} props is the user name taken from Login.js.
     * @return {component} the header.
     */
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