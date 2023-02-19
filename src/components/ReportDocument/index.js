import { Document, Page, Image, Text, StyleSheet,Link } from '@react-pdf/renderer';


const MyDoc = ({questionNames, answers, calculatorState}) =>{
    let today = new Date().toISOString().slice(0, 10);
    let notes = "Some notes about this survey... "
  
    const styles = StyleSheet.create({
      title:{
        top:"30px",
        fontSize: 25,
        fontFamily: 'Times-Bold',
        position: "absolute",
        left: '0px',
        right: '0px',
        textAlign:'center',
        justifyContent: 'center',
        marginHorizontal: 'auto',
      },
      date:{
        top:"60px",
        fontSize: 12,
        fontFamily: 'Times-Italic',
        position: "absolute",
        left: '0px',
        right: '0px',
        textAlign:'center',
        justifyContent: 'center',
        marginHorizontal: 'auto',
      },
      notes:{
        top:"100px",
        fontSize: 12,
        position: "absolute",
        left: '10%',
        right: '10%',
      },
      pageBackground: {
        position: 'absolute',
        minWidth: '100%',
        minHeight: '100%',
        display: 'block',
        height: '100%',
        width: '100%',
      },
      text: {
        position: "absolute",
        left: '0px',
        right: '0px',
        marginHorizontal: 'auto',
        textAlign: "center",
        justifyContent: 'center',
      },
      pageNumber: {
        position: 'absolute',
        fontSize: 12,
        bottom: 25,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: 'grey',
      },
      linkLeft: {
        position: 'absolute',
        fontSize: 10,
        bottom: 50,
        right: '60%',
        textAlign: 'right',
        color: 'grey',
      },
      linkRight: {
        position: 'absolute',
        fontSize: 10,
        bottom: 50,
        left: '60%',
        textAlign: 'left',
        color: 'grey',
      },
    });
  

    return (
    <Document>
    <Page>
        <Image src={require("../../assets/homepage-bg.png")} />
        <Text style={styles.title}>
            Survey Tool Report
        </Text>
        <Text style={styles.date}>
          –––––––––––––––––––{today}––––––––––––––––––––
        </Text>
  
        <Text style={styles.notes}> 
          {notes}{notes}{notes}{notes}{notes}{notes}
         </Text>
  
        {questionNames.map((name,i) => (
          <Text style={{ fontSize: 14, margin : 10, marginLeft:"10%" }} key={i}>
            {name}{"\n"}
        
            {answers[i]? 
              "–– " + answers[i] 
              :
              Object.keys(calculatorState).map((stateKey, i) => (
                <Text style={{ marginLeft:"10%" }} key={i}> 
                  –– {stateKey} :  {calculatorState[stateKey]} {"\n"}
                </Text>
              ))
            }
          </Text>
        ))}
  
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