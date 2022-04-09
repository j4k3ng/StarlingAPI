import React from "react"

export default function Header() {
    return (
        <header className="header">
            <img 
                src="./images/starling-logo.png" 
                className="header--image"
            />
            <h2 className="header--title"></h2>
            <h4 className="header--project"></h4>
        </header>
    )
}