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
    notes:{
      fontSize: 12,
      marginLeft: '10%',
      marginRight : '10%',
      marginTop : 10,
      marginBottom: 20,
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
      width: "auto",
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
      width: "25%", 
      borderStyle: "solid", 
      borderWidth: 1, 
      borderLeftWidth: 0, 
      borderTopWidth: 0 
    }, 
    tableHeader: { 
      margin: "auto", 
      // marginTop: 4, 
      // marginBottom: 4,
      fontSize: 10,
      fontFamily: 'Helvetica-Bold',
    },
    tableCell: { 
      margin: "auto", 
      marginTop: 4, 
      marginBottom: 4,
      fontSize: 10 
    },

    goalText:{
      fontSize: 14,
      marginLeft: '10%',
      marginRight : '10%',
      marginTop : 10,
      marginBottom: 10,
    },
  });
