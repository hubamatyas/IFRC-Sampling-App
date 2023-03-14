import { Document, Page, Image, Text, StyleSheet, Link, View } from '@react-pdf/renderer';
import {styles} from './styleSheet';
import React from 'react';
import {calculatorInputs, calculatorOutputs} from "../../types/calculatorResponse";


export interface DocProps {
  questionNames:string[],
  answers:string[],
  calculatorInputs:calculatorInputs | null,
  calculatorOutputs:calculatorOutputs | null,
  subgroupSizes:any[] | null,
}

const MyDoc: React.FC<DocProps> = ({
  questionNames,
  answers,
  calculatorInputs,
  calculatorOutputs,
  subgroupSizes,
}

) => {
    let today = new Date().toISOString().slice(0, 10);
    let notes = "Some notes about this survey... "
    let copyRight = "© 2023 International Federation of Red Cross and Red Crescent Societies. All rights reserved."

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
  
        <Text style={styles.notes}> 
          {notes}{notes}{notes}{notes}{notes}{notes}
         </Text>
  
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
        {/* @ts-ignore  */}
        { (() => {
          //simple random sampling
          if (calculatorOutputs?.sampleSize) {return(
            subgroupSizes? (
              <Text style={{textAlign:"center", marginTop:"20px"}}>
                  {Object.keys(calculatorOutputs?.sampleSize!).map((key: string) => (
                    <Text>
                      Sample size for {key} is {calculatorOutputs?.sampleSize![key]}{"\n"}
                    </Text>
                  ))}
              </Text>
            ) : (
                <Text style={{textAlign:"center", marginTop:"20px"}}>
                  Sample size: {Object.values(calculatorOutputs?.sampleSize!)[0]}
                </Text>
              ))

          //systematic random sampling
          }else if (calculatorOutputs?.intervals) {return(
            subgroupSizes? (
              <Text style={{textAlign:"center", marginTop:"20px"}}>
                  {Object.keys(calculatorOutputs?.intervals!).map((key: string) => (
                    <Text>
                      Sampling interval for {key} is {calculatorOutputs?.intervals![key]}{"\n"}
                    </Text>
                  ))}
              </Text>
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

        
      



        <View style={styles.table}> 
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
        <Text style={styles.copyRight} fixed>
          {copyRight}
        </Text>
        
    </Page>
   </Document> 
   );
  }

export default MyDoc;