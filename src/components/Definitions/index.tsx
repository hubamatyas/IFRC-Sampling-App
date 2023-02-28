import React from "react";

type Definition = {
    [term: string]: JSX.Element;
  };
  
  export const definitions: Definition = {
    "list frame": (
      <div>
        <p>
          A list of target population individuals or households with contact
          information (address, phone, email, etc.) whereby they can be reached
          and invited to participate in the survey.
        </p>
      </div>
    ),
  
    "simple random": (
      <div>
        <p>
          The simplest form of probability sampling where everyone in the target
          population has an equal chance of being selected. This can be implemented
          using a random number generator.
        </p>
      </div>
    ),
  
    "systematic random": (
      <div>
        <p>
          A probability sampling method where random starting points with a fixed
          interval are used to select members from a larger population. This
          interval, called the sampling interval, is calculated by dividing the
          population size by the desired sample size.
        </p>
      </div>
    ),
  
    "margin of error": (
      <div>
        <p>
          The margin of error is a statistic expressing the amount of random
          sampling error in the results of a survey. The larger the margin of
          error, the less confidence one should have that a poll result would
          reflect the result of a census of the entire population. The margin of
          error will be positive whenever a population is incompletely sampled
          and the outcome measure has positive variance, which is to say, the
          measure varies.
        </p>
      </div>
    ),
  
    "confidence level": (
      <div>
        <p>
          In frequentist statistics, a confidence interval (CI) is a range of
          estimates for an unknown parameter. A confidence interval is computed
          at a designated confidence level; the 95% confidence level is most
          common, but other levels, such as 90% or 99%, are sometimes used. The
          confidence level represents the long-run proportion of CIs (at the given
          confidence level) that theoretically contain the true value of the
          parameter. For example, out of all intervals computed at the 95% level,
          95% of them should contain the parameter's true value.[3]
          Factors affecting the width of the CI include the sample size, the
          variability in the sample, and the confidence level.[4] All else being
          the same, a larger sample produces a narrower confidence interval,
          greater variability in the sample produces a wider confidence interval,
          and a higher confidence level produces a wider confidence interval.
        </p>
      </div>
    ),
  
    "sub-population groups": (
      <div>
        <p>
          Sub-population groups are sub-groups of the target population that are
          of interest to the survey. For example, if the target population is all
          residents of a city, sub-population groups could be all residents of a
          particular neighborhood, all residents of a particular age group, all
          residents of a particular income group, etc.
        </p>
      </div>
    ),
    "time-location": (
      <div>
        <p>
          A probability sampling method where a random starting point is selected
          and then every nth member is selected from the target population. This
          method is useful when the target population is not easily accessible
          and the surveyor must travel to each member of the target population.
        </p>
      </div>
    ),
  };
  