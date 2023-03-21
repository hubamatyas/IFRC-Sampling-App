import React from "react";
import logo from "../../assets/logo.svg";
import { useTranslation } from "react-i18next";


type Definition = {
  [term: string]: JSX.Element;
};


function Definitions (): Definition {
    const { t } = useTranslation();
    const definitions: Definition = {
        "list frame": (
            <div>
                <p>{t("definitionsListframe1")}</p>
                <p>{t("definitionsListframe2")}</p>
            </div>
        ),
        "simple random": (
            <div>
                <p>{t("definitionsSimple1")}</p>
            </div>
        ),
        "simple random sample size": (
            <div>
                <p>{t("definitionsSimpleResult1")}</p>
                <p>{t("definitionsSimpleResult2")}</p>
            </div>
        ),
        "systematic random": (
            <div>
                <p>{t("definitionsSystematic1")}</p>
                <p>{t("definitionsSystematic2")}</p>
            </div>
        ),
        "systematic random sample interval": (
            <div>
                <p>{t("definitionsSystematicResult1")}</p>
                <p>{t("definitionsSystematicResult2")}</p>
            </div>
        ),
        "time-location": (
            <div>
                <p>{t("definitionsTimeLocation1")}</p>
                <p><b>{t("definitionsTimeLocation2")}</b></p>
                <p><b>{t("definitionsTimeLocation3")}</b></p>
                <p><b>{t("definitionsTimeLocation4")}</b></p>
            </div>
        ),
        "time-location schedule": (
            <div>
                <p>{t("definitionsTimeLocationResult1")}</p>
                <p>{t("definitionsTimeLocationResult2")}</p>
            </div>
        ),
        "cluster": (
            <div>
                <p>{t("definitionsCluster1")}</p>
            </div>
        ),
        "cluster units": (
            <div>
                <p>{t("definitionsClusterResult1")}</p>
            </div>
        ),
        "margin of error": (
            <div>
                <p>{t("definitionsMargin1")}</p>
                <p>{t("definitionsMargin2")}</p>
            </div>
        ),

        "confidence level": (
            <div>
                <p>{t("definitionsConfidence1")}</p>
                <p>{t("definitionsConfidence2")}</p>
            </div>
        ),

        "sub-population groups": (
            <div>
                <p>{t("definitionsSubgroups1")}</p>
                <p>{t("definitionsSubgroups2")}</p>
            </div>
        ),
        "non-response rate": (
            <div>
                <p>{t("definitionsNonresponse1")}</p>
                <p>{t("definitionsNonresponse2")}</p>
                <p>{t("definitionsNonresponse3")}</p>
            </div>
        ),
        "population": (
            <div>
                <p>{t("definitionsPopulation1")}</p>
                <p>{t("definitionsPopulation2")}</p>
            </div>
        ),
        "easily identify": (
            <div>
                <p>{t("definitionsEasily1")}</p>
                <p>{t("definitionsEasily2")}</p>
            </div>
        ),
    };
    return definitions;
}

export default Definitions
