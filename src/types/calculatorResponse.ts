
export type calculatorOutputs = null|{
    sampleSize?: { [key: string]: number } | null;
    intervals?: intervalsType;  
    timeLocationSampleSize?: null; // to be implemented
    clusterSampleSize?: null; // to be implemented

    aboutGoal: string | null;
}

export type calculatorInputs = Record<string, number|null> | null;
export type sampleSizeType = Record<string, number> | null;
export type intervalsType = Record<string, number> | null;
export type subgroupsType = any[] | null;