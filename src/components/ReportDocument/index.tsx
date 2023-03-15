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
        <Text style={{ fontSize: 14, margin : 10, marginLeft:"10%", marginBottom:"25px"}}> 
          <Text style={{fontFamily: 'Helvetica-Bold', marginBottom:"10px"}}>Notes:</Text>
          <Text>{"\n"+notes}</Text>
        </Text>
        :
        <View></View>
        } 
  
        {answers.map((answer,i) => (
          <Text style={{ fontSize: 14, margin : 10, marginLeft:"10%" }} key={i}>
            {questionNames[i]}{"\n"}
            {"–– " + answer }      
          </Text>
        ))}



      {/* render subgroup names and sizes */}

        <Text style={{ fontSize: 14, margin : 10, marginLeft:"10%" }}>
          Subgroups:{"\n"}

          {subgroupSizes ?

          subgroupSizes.map((subgroup, i) => (
            <Text style={{ fontSize: 14, margin : 6, marginLeft:"10%" }} key={i}>
              {"–– Subgroup name: "}{subgroup.name}{"\n"}
              {"–– Size: "}{subgroup.size}{"\n\n"}
            </Text>
          ))
          :
          <Text style={{ fontSize: 14, marginLeft:"10%" }}>
              None{"\n"}
          </Text>
          } 
        </Text>


        {/* render calculator input fields */}

        <Text style={{ fontSize: 14, margin : 10, marginLeft:"10%" }}>
          Sample size calculator inputs:{"\n"}
          
          {Object.keys(calculatorInputs!).map((stateKey: string, i: number) =>(
            calculatorInputs![stateKey] ? 
              <Text style={{ fontSize: 14, marginLeft:"10%" }} key={i}> 
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
                  <Text style={styles.tableHeader}>Sample Size</Text> 
                </View> 
              </View> 

              {Object.keys(calculatorOutputs?.sampleSize!).map((key: string) => (
              <View style={styles.tableRow}> 
                <View style={styles.tableCol}> 
                  <Text style={styles.tableHeader}>{key}</Text> 
                </View> 
                <View style={styles.tableCol}> 
                  <Text style={styles.tableHeader}>{calculatorOutputs?.sampleSize![key]}</Text> 
                </View> 
              </View> 
              ))}
            </View>

            ) : (
                <Text style={{textAlign:"center", marginTop:"20px"}}>
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
                      <Text style={styles.tableHeader}>Sampling Interval</Text> 
                    </View> 
                  </View> 

                  {Object.keys(calculatorOutputs?.intervals!).map((key: string) => (
                  <View style={styles.tableRow}> 
                    <View style={styles.tableCol}> 
                      <Text style={styles.tableHeader}>{key}</Text> 
                    </View> 
                    <View style={styles.tableCol}> 
                      <Text style={styles.tableHeader}>{calculatorOutputs?.intervals![key]}</Text> 
                    </View> 
                  </View> 
                  ))}
                </View>

            ) : (
              <>
                <Text style={{textAlign:"center", marginTop:"20px"}}>
                  Sampling interval: {Object.values(calculatorOutputs?.intervals!)[0]}
                </Text>
              </>)
          )
          }
        })()}
        </View>

          <Text style={styles.goalText}>
            {calculatorOutputs?.aboutGoal}
          </Text>


        {/* <View style={styles.table}> 
          <View style={styles.tableRow}> 
            <View style={styles.tableCol}> 
              <Text style={styles.tableHeader}>Geographical unit</Text> 
            </View> 
            <View style={styles.tableCol}> 
              <Text style={styles.tableHeader}>Population size</Text> 
            </View> 
            <View style={styles.tableCol}> 
              <Text style={styles.tableHeader}>Cluster</Text> 
            </View> 
          </View>

          <View style={styles.tableRow}> 
            <View style={styles.tableCol}> 
              <Text style={styles.tableCell}>Location 1</Text> 
            </View> 
            <View style={styles.tableCol}> 
              <Text style={styles.tableCell}>10000 </Text> 
            </View> 
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>1,2,3,RC,4</Text> 
            </View>
          </View> 

          <View style={styles.tableRow}> 
            <View style={styles.tableCol}> 
              <Text style={styles.tableCell}>Location 2</Text> 
            </View> 
            <View style={styles.tableCol}> 
              <Text style={styles.tableCell}>7000 </Text> 
            </View> 
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>5,RC,7,8</Text> 
            </View>
          </View> 
        </View> */}


        <View style={{marginBottom:"auto",marginTop:"auto"}} break>
        <Image src={require("../../assets/Damaged-Affected.png")} style={{alignSelf:"center", width:"25", height:"25", margin : 6}}/>
          <Text style={{ fontSize: 14, margin : 6, marginLeft:"10%", marginRight:"10%" }}>
            This tool was developed by IFRC staff and UCL INX students 
            with the intent of being shared and used by National Societies 
            of the Red Cross Red Crescent Movement, but also by the wider 
            humanitarian network. Other agencies and organisations are most 
            welcome and highly encouraged to make use of this tool for their 
            sampling work.
          </Text>
          <Text style={{ fontSize: 14, margin : 6, marginLeft:"10%", marginRight:"10%" }}>
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

        {/* <Text style={styles.copyRight} fixed>
          {copyRight}
        </Text> */}
        
    </Page>
   </Document> 
   );
  }

export default MyDoc;