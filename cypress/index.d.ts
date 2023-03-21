declare namespace Cypress {
    interface Chainable<Subject = any> {
        inputSubgroupData(subSizes:number[]): Chainable<any>;
        checkResult(sampleSizes:number[]): Chainable<any>;
        inputCommunities(subSizes:number[]): Chainable<any>;
    }
  }