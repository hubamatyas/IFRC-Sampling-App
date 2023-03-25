declare namespace Cypress {
    interface Chainable<Subject = any> {
        inputSubgroupData(subSizes:number[]): Chainable<any>;
        checkResult(sampleSizes:number[]): Chainable<any>;
        inputCommunities(subSizes:number[]): Chainable<any>;
        checkLowerBound(
            inputSelector:string, 
            lower:number|null, 
            submitSeletor:string
        ): Chainable<any>;
        checkUpperBound(
            inputSelector:string,
            upper:number|null,
            submitSeletor:string
        ): Chainable<any>;
    }
  }