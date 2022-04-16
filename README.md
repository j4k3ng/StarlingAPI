# STARLING API SAVING
> Add money into a saving account on Starling Bank.
> Live demo [_here_](https://98ubuo.csb.app/). <!-- If you have the project hosted somewhere, include the link here. -->
## Table of Contents
* [General Info](#general-information)
* [Technologies Used](#technologies-used)
* [Features](#features)
* [Screenshots](#screenshots)
* [Setup](#setup)
* [Usage](#usage)
* [Contact](#contact)
<!-- * [License](#license) -->


## General Information
- This project intend to fulfill a challenge given by Starling Bank to candidates for a SE role.
- The challenge constists on creating a web app capable to average the money spent by a customer in a given week and put send this amount in a saving account using the Starling Bank public [_API_](https://developer.starlingbank.com/docs).

<!-- - Provide general information about your project here.
- What problem does it (intend to) solve?
- What is the purpose of your project?
- Why did you undertake it? -->
<!-- You don't have to answer all the questions - just the ones relevant to your project. -->


## Technologies Used
- HTML 
- CSS
- Material-UI - version 4.12.4
- React.js - version 18.0.0


## Features
- Login: 
client can login using the account token. After inserting a valid token the name associated with the token is displayed in the upper right corner.

- Average spent: 
a custom billing week period can be selected in the calendar. After selecting the starting date the end date (7 days later) is automatically shown.
After selecting the billing period the weekly average spent is displayed.    

- Saving account:
If spending transaction are present in the selected billing period all the saving account are shown. By clicking a saving account the average amount is sent in to the saving account.

- New saving account: 
A new saving account can be created if a valid billing period is selected. A name and a money target are the needed input for the new saving account.


## React components hierarchy
![Example screenshot](./hierarchy.png)
<!-- If you have screenshots you'd like to share, include them here. -->


## Setup
The project has two main dependencies, React and Material-UI. The dependencies are listed in the package.json file so the project can be initialized in a local environment using the [_npm_](https://docs.npmjs.com/getting-started) package with the following commands

`npx create-react-app` to initialize react.js.

`npm install` to install the dipendencies from the package.json file.

`npm start` to run a React server in the localhost.

<!-- What are the project requirements/dependencies? Where are they listed? A requirements.txt or a Pipfile.lock file perhaps? Where is it located?

Proceed to describe how to install / setup one's local environment / get started with the project. -->


<!-- ## Usage
How does one go about using it?
Provide various use cases and code examples here.

`write-your-code-here` -->


<!-- ## Project Status
Project is: _in progress_ / _complete_ / _no longer being worked on_. If you are no longer working on it, provide reasons why. -->


<!-- ## Room for Improvement
Include areas you believe need improvement / could be improved. Also add TODOs for future development.

Room for improvement:
- Improvement to be done 1
- Improvement to be done 2

To do:
- Feature to be added 1
- Feature to be added 2 -->


<!-- ## Acknowledgements
Give credit here.
- This project was inspired by...
- This project was based on [this tutorial](https://www.example.com).
- Many thanks to... -->


## Contact
Created by [Jacopo Montefusco](montefuscojacopo@gmail.com) - feel free to contact me!


<!-- Optional -->
<!-- ## License -->
<!-- This project is open source and available under the [... License](). -->

<!-- You don't have to include all sections - just the one's relevant to your project -->