import { Document, Page, Image, Text, StyleSheet, Link, View } from '@react-pdf/renderer';
import {styles} from './styleSheet';
import React from 'react';
import {calculatorInputs, calculatorOutputs} from "../../types/calculatorResponse";
import {ImNotification} from 'react-icons/im';


export interface DocProps {
  notes?:string|null,
  questionNames:string[],
  answers:string[],
  calculatorInputs:calculatorInputs | null,
  calculatorOutputs:calculatorOutputs | null,
  subgroupSizes:any[] | null,
}

const MyDoc: React.FC<DocProps> = ({
  notes,
  questionNames,
  answers,
  calculatorInputs,
  calculatorOutputs,
  subgroupSizes,
}

) => {
    let today = new Date().toISOString().slice(0, 10);
    //let notes = "Some notes about this survey... "
    // let copyRight = "© 2023 International Federation of Red Cross and Red Crescent Societies. All rights reserved."

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
            <Text style={styles.subgroupData} key={i}>
              {"–– Subgroup name: "}{subgroup.name}{"\n"}
              {"–– Size: "}{subgroup.size}{"\n\n"}
            </Text>
          ))
          :
          <Text> None{"\n"} </Text>
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
                  <Text style={styles.tableHeader}>Population</Text> 
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
                      <Text style={styles.tableHeader}>Population</Text> 
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
                      <Text style={styles.TLtableHeader}>
                        {Object.keys(locations)[0]}
                      </Text> 
                    </View> 

                    <View style={styles.tableCol}> 
                      {Object.values(locations)[0].sort(
                        // @ts-ignore
                        (a, b)=>( 
                          Number(Object.keys(a)[0].slice(3)) - Number(Object.keys(b)[0].slice(3))
                        )
                        // @ts-ignore
                        ).map((days,index) => (
                        <View style={styles.tableRow}>
                          <Text style={styles.tableCell}>
                            {Object.keys(days)[0]+ ": " +
                            // @ts-ignore
                            Object.values(days)[0].join()}
                          </Text>
                        </View>
                      ))}
                      
                    </View> 
                  </View> 
                  ))}
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
  
        <Link src="https://www.ifrc.org/en/" style={styles.linkLeft} fixed >
          IFRC Community Sampling Tool
        </Link>
        <Link src="https://www.ifrc.org/en/" style={styles.linkRight} fixed >
          IFRC Community
        </Link>

        
    </Page>
   </Document> 
   );
  }

export default MyDoc;