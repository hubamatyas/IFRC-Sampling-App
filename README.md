# IFRC Community Sampling Tool

The aim of this tool is to intuitively guide the users through the sampling process. The users answer the questions in a decision tree and finally led to one of the four most popular sampling methods(simple random sampling, systematic random sampling, cluster sampling, time-location sampling) that suits their needs the best. The result can be storable and portable by exported into PDF.\

The tool is designed to be educational and easy to use so that it caters to users of all levels of statistical background.

## System Architecture
![System Architecture Diagram](./public/SystemArchitecture.png)

## Deployment Manual

### Prerequisites
- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)

### Installation
'''
$ git clone https://github.com/hubamatyas/ifrc-sampling.git
$ npm install
'''

### Run the app
'''
npm start
'''

## Testing

Cypress framework is used for both component and end-to-end testings.\
The base URL for end-to-end testing is configured in file cypress.config.ts\
See the [documentation](https://docs.cypress.io/) for more about testing using Cypress.

### `npx cypress open`

Launches the Cypress test runner in the interactive watch mode.

### `npx cypress run`

Runs the Cypress tests and displays the results in terminal.\
Automatic video recording and screenshots has been turned off. See [here](https://docs.cypress.io/guides/guides/screenshots-and-videos) for more information.

### Create a New Production Build
'''
npm run build
'''

## Showcase

### Tool Interface

![Simple Random Sampling](./public/SimpleRandom.png)
![Symtematic Random Sampling](./public/SystematicRandom.png)
![Time-location Sampling](./public/TimeLocation.png)
![Cluster Sampling](./public/Cluster.png)

### Cypress Testing Interface

![Component Testing](./public/ComponentTesting.png)
![E2E Testing](./public/E2ETesting.png)
