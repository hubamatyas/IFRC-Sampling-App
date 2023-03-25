export type calculatorOutputs = null|{
    sampleSize?: { [key: string]: number } | null;
    intervals?: intervalsType;  
    timeLocationResponse?: [TimeLocationResponse] | null; 
    clusterResponse?: ClusterResponse | null; 

    aboutGoal: string | null;
}

export type calculatorInputs = Record<string, number|null> | null;
export type sampleSizeType = Record<string, number> | null;
export type intervalsType = Record<string, number> | null;
export type subgroupsType = {
    name: string;
    size: number;
}[] | null;
export type communityInfoType = {
    name: string;
    size: number;
}[] | null;

export interface TimeLocationResponse {
    locations: { [key: string]: {
        days: { [key: string]: [string]} };
    } };

export interface ClusterResponse {
    [key: string]: number[];
}