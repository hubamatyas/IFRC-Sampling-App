import SampleErrorImg from './images/SamplingError.png';
import SampleMethodsImg from './images/SamplingMethods.png';
const Explainations ={
    "f": 
        <div>
            <p>Something about a list frame</p>
        </div>,

    "f0": 
        <div>
            <p>Something about individual and households list frames</p>
        </div>,

    "f000": 
        <div>
            <p>Something about sub population group</p>
        </div>,

    "f01": 
        <div>
            <p>Something about sub population groups to target</p>
        </div>,

    "f010": 
        <div>
            <p>Something about list of these sub population group</p>
        </div>,

    "f1": 
        <div>
            <p>Something about identifing houses/ people ahead of time</p>
        </div>,

    "f10": 
        <div>
            <p>Something about sub population groups to target</p>
        </div>,

    "f100": 
        <div>
            <p>Something about estimates for % population for these sub-pop groups</p>
        </div>,


    "probability sample": 
        <div>
            <p> Each individual or household in the sampling frame has a known but not necessarily equal probability of selected to participate in the survey, therefore the sampling errors and bias can be quantified.</p>
            <a href="https://www.scribbr.co.uk/research-methods/probability-sampling-methods/" target="_blank">Find more here.</a>
            <br></br>
            <img src={SampleMethodsImg} alt="Sampling methods image" width={350}/>
        </div>,

    "sampling error": 
        <div>
            <p>The difference between the true value in population and a sample statistic used to estimate it.</p>
            <a href="https://en.wikipedia.org/wiki/Sampling_error" target="_blank">Find more here.</a>
            <br></br>
            <img src={SampleErrorImg} alt="Sampling error image" width={350}/>
        </div>,

    "list frame": 
        <div>
            <p>A list of target population individuals or households with contact information (address, phone, email, etc.) whereby they can be reached and invited to participate in the survey.</p>
        </div>,

    "simple random sampling": 
        <div>
            <p>The simplest form of probability sampling where everyone in the target population has an equal chance of being selected. This can be implemented using a random number generator.</p>
        </div>,

    "systematic sampling": 
        <div>
            <p>A probability sampling method where random starting points with a fixed interval are used to select members from a larger population.  This interval, called the sampling interval, is calculated by dividing the population size by the desired sample size. </p>
        </div>,    

    "Margin of Error":    
    <div>
        <p>The margin of error is a statistic expressing the amount of random sampling error in the results of a survey. The larger the margin of error, the less confidence one should have that a poll result would reflect the result of a census of the entire population. The margin of error will be positive whenever a population is incompletely sampled and the outcome measure has positive variance, which is to say, the measure varies. </p>
    </div>,

    "Confidence Level":
    <div>
        In frequentist statistics, a confidence interval (CI) is a range of estimates for an unknown parameter. A confidence interval is computed at a designated confidence level; the 95% confidence level is most common, but other levels, such as 90% or 99%, are sometimes used. The confidence level represents the long-run proportion of CIs (at the given confidence level) that theoretically contain the true value of the parameter. For example, out of all intervals computed at the 95% level, 95% of them should contain the parameter's true value.[3]
        Factors affecting the width of the CI include the sample size, the variability in the sample, and the confidence level.[4] All else being the same, a larger sample produces a narrower confidence interval, greater variability in the sample produces a wider confidence interval, and a higher confidence level produces a wider confidence interval.
    </div>,


}

export default Explainations;