import { Document, Page, Image, Text, StyleSheet, Link, View } from '@react-pdf/renderer';
import {styles} from './styleSheet';
import React from 'react';
import {calculatorInputs, calculatorOutputs, communityInfoType, subgroupsType} from "../../types/calculatorResponse";
import {toolLink, IFRCLink} from '../../util/config.js';

/**
@fileoverview this module provides a React functional component that renders the
PDF report. It is called by the ExportNowButton component. It uses the react-pdf
library to render the PDF. The component renders the logo, the title, the date,
the notes section, the decisions section, the subgroups section(optional), the 
community info section(optional), the calculator inputs section, and the calculator
results section. In the last page, it renders a piece of disclaimer text.The 
component also renders the tool link and the IFCR link at thebottom of the page.
@module ReportDocument
*/

export interface DocProps {
  notes?:string|null,
  questionNames:string[],
  answers:string[],
  calculatorInputs:calculatorInputs,
  calculatorOutputs:calculatorOutputs,
  subgroupSizes?:subgroupsType,
  communityInfo?:communityInfoType,
}

const MyDoc: React.FC<DocProps> = ({
  notes,
  questionNames,
  answers,
  calculatorInputs,
  calculatorOutputs,
  subgroupSizes,
  communityInfo,
}

) => {
    let today = new Date().toISOString().slice(0, 10);

    return (
    <Document>
    <Page style={styles.body}>
        {/* <Image src={require("../../assets/homepage-bg.png")} style={styles.titleBackground}/> */}
        <Image src={require("../../assets/logo.png")} style={styles.logo} fixed/>
        <Text style={styles.title}>
            Survey Tool Report
        </Text>
        <Text style={styles.date}>
          {today}
        </Text>

        {notes?
        <Text style={styles.notesSection}> 
          <Text style={styles.notesTitle}>Notes:</Text>
          <Text>{"\n"+notes}</Text>
        </Text>
        :
        <View></View>
        } 
  
        {answers.map((answer,i) => (
          <Text style={styles.decisions} key={i}>
            {questionNames[i]}{"\n"}
            {"–– " + answer }      
          </Text>
        ))}



      {/* render subgroup names and sizes */}

        <Text style={styles.decisions}>
          Subgroups:{"\n"}

          {subgroupSizes ?
            subgroupSizes.map((subgroup, i) => (
              "–– Subgroup name: " + subgroup?.name 
              + "\n–– Size: " + subgroup?.size
            )).join("\n\n")
            :
            "None\n" 
          } 
        </Text>


        {/* render community info */}
        <Text style={styles.decisions}>
          {communityInfo ?
            <>
              <Text>Geographical units:{"\n"}</Text>
              {communityInfo.map((community, i) => (
                <Text style={styles.subgroupData} key={i}>
                  {"–– Community name: "}{community.name}{"\n"}
                  {"–– Size: "}{community.size}{"\n\n"}
                </Text>
              ))}
            </>
          :
          <></>
          } 
        </Text>


        {/* render calculator input fields */}

        <Text style={styles.decisions}>
          Sample size calculator inputs:{"\n"}
          
          {Object.keys(calculatorInputs!).map((stateKey: string, i: number) =>(
            calculatorInputs![stateKey] ? 
              <Text key={i}> 
                –– {stateKey} :  {calculatorInputs![stateKey]} {"\n"}
              </Text>
            :
            <View></View>
          ))}
        </Text>

        {/* render calculator result in a new page */}

        <View break>

        <Text style={styles.title}>
            Results
        </Text>

        {/* @ts-ignore  */}
        { (() => {
          //simple random sampling
          if (calculatorOutputs?.sampleSize) {return(
            subgroupSizes? (

              <View style={styles.table}> 
              <View style={styles.tableRow}> 
                <View style={styles.tableCol}> 
                  <Text style={styles.tableHeader}>Subgroup Name</Text> 
                </View> 
                <View style={styles.tableCol}> 
                  <Text style={styles.tableHeader}>Sample size</Text> 
                </View> 
              </View> 

              {Object.keys(calculatorOutputs?.sampleSize!).map((key: string) => (
              <View style={styles.tableRow}> 
                <View style={styles.tableCol}> 
                  <Text style={styles.tableCell}>{key}</Text> 
                </View> 
                <View style={styles.tableCol}> 
                  <Text style={styles.tableCell}>{calculatorOutputs?.sampleSize![key]}</Text> 
                </View> 
              </View> 
              ))}
            </View>

            ) : (
                <Text style={styles.sampleSize}>
                  Sample size: {Object.values(calculatorOutputs?.sampleSize!)[0]}
                </Text>
              ))

          //systematic random sampling
          }else if (calculatorOutputs?.intervals) {return(
            subgroupSizes? (

                <View style={styles.table}> 
                  <View style={styles.tableRow}> 
                    <View style={styles.tableCol}> 
                      <Text style={styles.tableHeader}>Subgroup Name</Text> 
                    </View> 
                    <View style={styles.tableCol}> 
                      <Text style={styles.tableHeader}>Sampling interval</Text> 
                    </View> 
                  </View> 

                  {Object.keys(calculatorOutputs?.intervals!).map((key: string) => (
                  <View style={styles.tableRow}> 
                    <View style={styles.tableCol}> 
                      <Text style={styles.tableCell}>{key}</Text> 
                    </View> 
                    <View style={styles.tableCol}> 
                      <Text style={styles.tableCell}>{calculatorOutputs?.intervals![key]}</Text> 
                    </View> 
                  </View> 
                  ))}
                </View>

            ) : (
              <>
                <Text style={styles.sampleSize}>
                  Sampling interval: {Object.values(calculatorOutputs?.intervals!)[0]}
                </Text>
              </>)
          )

          // time-location sampling table
          }else if (calculatorOutputs?.timeLocationResponse) {return(
            <View style={styles.table}> 
              {calculatorOutputs?.timeLocationResponse!.sort(
                (a, b)=>( 
                  Number(Object.keys(a)[0].slice(8)) - Number(Object.keys(b)[0].slice(8))
                )
              ).map((locations,index) => (

                  <View style={styles.tableRow}> 
                    <View style={styles.tableCol}> 
                      <Text style={styles.tableHeader}>
                        {Object.keys(locations)[0]}
                      </Text> 
                    </View> 

                    <View style={styles.tableCol}> 
                      <View style={styles.timeUnitContainer}>
                        {Object.values(locations)[0].sort(
                          // @ts-ignore
                          (a, b)=>( 
                            Number(Object.keys(a)[0].slice(3)) - Number(Object.keys(b)[0].slice(3))
                          )
                          // @ts-ignore
                          ).map((days,index) => (
                            <Text style={styles.timeUnit}>
                              {Object.keys(days)[0]+ ": " +
                              // @ts-ignore
                              Object.values(days)[0].join()}
                            </Text>
                          
                        ))}
                      </View>
                    </View> 
                  </View> 
                  ))}
            </View>
          )

          }else if(calculatorOutputs?.clusterResponse){return(
            <View style={styles.table}> 
                    <View style={styles.tableRow}> 
                      <View style={styles.tableCol}> 
                        <Text style={styles.tableHeader}>Geographical unit</Text> 
                      </View> 
                      <View style={styles.tableCol}> 
                        <Text style={styles.tableHeader}>Cluster</Text> 
                      </View> 
                    </View> 

                    {Object.keys(calculatorOutputs?.clusterResponse).map(
                      (community, index) => {
                        return (
                          <View style={styles.tableRow}> 
                            <View style={styles.tableCol}> 
                              <Text style={styles.tableCell}>{community}</Text> 
                            </View> 
                            <View style={styles.tableCol}> 
                              <Text style={styles.tableCell}>{calculatorOutputs?.clusterResponse![community].join(", ")}</Text> 
                            </View> 
                          </View> 
                        )
                      }
                    )}
            </View> 
          )
          }

        })()}
        </View>

          <Text style={styles.goalText}>
            {calculatorOutputs?.aboutGoal}
          </Text>



        <View style={{marginBottom:"auto",marginTop:"auto"}} break>
        <Image src={require("../../assets/Damaged-Affected.png")} style={styles.disclaimerImg}/>
          <Text style={styles.disclaimerText}>
            This tool was developed by IFRC staff and UCL INX students 
            with the intent of being shared and used by National Societies 
            of the Red Cross Red Crescent Movement, but also by the wider 
            humanitarian network. Other agencies and organisations are most 
            welcome and highly encouraged to make use of this tool for their 
            sampling work.
          </Text>
          <Text style={styles.disclaimerText}>
            IFRC and UCL INX have made all reasonable efforts to ensure that 
            the information contained within this Sampling Tool is of a quality 
            and reliability consistent with its purpose. However, there is no 
            guarantee that the results will be accurate or the best placed for 
            their context or environment. Responsibility rests with the user to 
            undertake appropriate validation before following the recommended 
            sampling plan.
          </Text>
        </View>


  
        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
            `${pageNumber} / ${totalPages}`
        )} fixed />
  
        <Link src={toolLink} style={styles.linkLeft} fixed >
          IFRC GO Sampling Tool
        </Link>
        <Link src={IFRCLink} style={styles.linkRight} fixed >
          IFRC GO Platform
        </Link>

        
    </Page>
   </Document> 
   );
  }

export default MyDoc;