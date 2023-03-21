import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
    logo:{
      top:"10px",
      left:"10px",
      width: 150,
      height: 30,
      position: "absolute",
    },
    titleBackground:{
      position: "absolute",
      top:"0px",
      left: '0px',
      right: '0px',
      width: '100%',
    },
    title:{
      fontSize: 25,
      fontFamily: 'Helvetica-Bold',
      textAlign:'center',
      margin : 10,
    },
    date:{
      fontSize: 12,
      fontFamily: 'Helvetica-Oblique',
      textAlign:'center',
    },
    notesSection:{
      fontSize: 14, 
      margin : 10, 
      marginLeft:"10%", 
      marginBottom:"25px"
    },
    notesTitle:{
      fontFamily: 'Helvetica-Bold',
      marginBottom:"10px"
    },
    decisions:{
      fontSize: 14,
      margin : 10,
      marginLeft:"10%",
    },
    subgroupData:{ 
      fontSize: 14, 
      margin : 6, 
      marginLeft:"10%" 
    },
    sampleSize:{
      textAlign:"center", 
      marginTop:"20px"
    },
    disclaimerImg:{
      alignSelf:"center", 
      width:"25", 
      height:"25", 
      margin : 6
    },
    disclaimerText:{ 
      fontSize: 14, 
      margin : 6, 
      marginLeft:"10%", 
      marginRight:"10%" 
    },
    pageBackground: {
      position: 'absolute',
      minWidth: '100%',
      minHeight: '100%',
      height: '100%',
      width: '100%',
    },
    body: {
      paddingTop: 45,
      paddingBottom: 65,
      paddingHorizontal: 0,
    },
    // text: {
    //   position: "absolute",
    //   left: '0px',
    //   right: '0px',
    //   marginHorizontal: 'auto',
    //   textAlign: "center",
    //   justifyContent: 'center',
    // },
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
    copyRight: {
      position: 'absolute',
      fontSize: 10,
      bottom: 5,
      left: '0%',
      color: 'grey',
    },

    table: { 
      // @ts-ignore 
      display: "table",
      width: "70%",
      marginHorizontal: "auto",
      marginVertical: 10,
      borderStyle: "solid", 
      borderWidth: 1, 
      borderRightWidth: 0, 
      borderBottomWidth: 0 
    }, 
    tableRow: { 
      margin: "auto", 
      flexDirection: "row" 
    }, 
    tableCol: { 
      width: "50%", 
      borderStyle: "solid", 
      borderWidth: 1, 
      borderLeftWidth: 0, 
      borderTopWidth: 0 
    }, 

    tableHeader: { 
      margin: "auto", 
      paddingVertical: 5,
      paddingHorizontal: 10,
      fontSize: 12,
      fontFamily: 'Helvetica-Bold',
    },

    tableCell: { 
      margin: "auto", 
      paddingVertical: 5,
      paddingHorizontal: 10,
      fontSize: 12,
    },

    timeUnitContainer: {
      marginLeft:"25%", 
      paddingVertical: 5,
    },

    timeUnit: { 
      margin: 0,
      fontSize: 12,
      paddingVertical: 1,
    },

    goalText:{
      fontSize: 14,
      marginLeft: '10%',
      marginRight : '10%',
      marginTop : 10,
      marginBottom: 10,
    },
  });
