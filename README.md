# IFRC Community Sampling Tool

The aim of this tool is to intuitively guide the users through the sampling process. The users answer the questions in a decision tree and finally led to one of the four most popular sampling methods(simple random sampling, systematic random sampling, cluster sampling, time-location sampling) that suits their needs the best. The result can be storable and portable by exported into PDF.

The tool is designed to be educational and easy to use so that it caters to users of all levels of statistical background.

## System Architecture
![System Architecture Diagram](./public/SystemArchitecture.png)

## Project Tree
Tree structure of src folder:
```
.
├── App.js
├── App.scss
├── App.test.js
├── calculators
│   ├── ClusterCalculator
│   ├── SimpleRandomCalculator
│   ├── SystematicRandomCalculator
│   └── TimeLocationCalculator
├── components
│   ├── Alert
│   ├── Button
│   ├── Card
│   ├── DecisionTree
│   ├── Definitions
│   ├── ExportButton
│   ├── Footer
│   ├── Input
│   ├── LanguageDropdown
│   ├── Loader
│   ├── MobileNavbar
│   ├── Navbar
│   ├── OffCanvas
│   ├── QuestionCard
│   ├── ReportDocument
│   ├── ShowMore
│   ├── SimpleRandom
│   ├── SubgroupInput
│   └── Terminology
├── index.css
├── index.js
├── reportWebVitals.js
├── setupTests.js
├── styles
│   └── variables.scss
├── types
│   └── calculatorResponse.ts
└── views
    ├── Home
    ├── Resources
    └── Sampling
```

## Deployment Manual

### Prerequisites
- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)

### Installation
```bash
git clone https://github.com/hubamatyas/ifrc-sampling.git
npm install
```

### Run the app
```bash
npm start
```

### Create a New Production Build
```bash
npm run build
```

## Testing

Cypress framework is used for both component and end-to-end testings.\
The base URL for end-to-end testing is configured in file cypress.config.ts.\
See the [documentation](https://docs.cypress.io/) for more about testing using Cypress.
<br>

- Launch the Cypress test runner in the interactive watch mode:
```bash
npx cypress open
```
<br>

- Run the Cypress tests and displays the results in terminal:
```bash
npx cypress run
```
Automatic video recording and screenshots has been turned off. See [here](https://docs.cypress.io/guides/guides/screenshots-and-videos) for more information.


## Showcase

### [Sample Report](./public/sample-report.pdf)

### Tool Interface

- Simple Random Sampling
![Simple Random Sampling](./public/SimpleRandom.png)
<br><br>
- Systematic Random Sampling
![Symtematic Random Sampling](./public/SystematicRandom.png)
<br><br>
- Time-Location Sampling
![Time-location Sampling](./public/TimeLocation.png)
<br><br>
- Cluster Sampling
![Cluster Sampling](./public/Cluster.png)

### Cypress Testing Interface

- Component Testing
![Component Testing](./public/ComponentTesting.png)
<br><br>
- End-to-end Testing
![E2E Testing](./public/E2ETesting.png)

## Bug

### Testing - e2e/cluster.cy.tsx
Whatever is the first test in e2e/cluster.cy.tsx would fail. It can be reproduced by running 'npx cypress run' or 'npx cypress open' -> choose e2e testing -> click cluster.cy.tsx file. 

Under interactive mode by running 'npx cypress open', the test will fail for the first time but pass when it is rerun.

This bug with Cypress testing does not affect the performance of the tool.

![Cluster Testing Bug](./public/Bug.png)
