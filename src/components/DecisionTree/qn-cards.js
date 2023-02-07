// elements in array <cards> are in the order of a tree being traversed
const cards = [
  ["Do you have a list frame",["Yes", "No"]],
  ["Is the list frame of : ",["Households", "Individuals", "both"]], 
  ["Do you have any sub population groups to target? ",["Yes", "No"]],
  ["Do you know #s on list of these sub population group? ",["Yes", "No"]],
  undefined, //simple random sampling
  undefined, //simple random sampling
  undefined, //simple random sampling

  ["Do you have any sub population groups to target? ",["Yes", "No"]],
  ["Do you know #s on list of these sub population group? ",["Yes", "No"]],
  undefined, //simple random sampling
  undefined, //simple random sampling
  undefined, //simple random sampling

  undefined,

  ["able to easily identify houses/ people ahead of time? ",["Yes", "No"]],
  ["Do you have any sub population groups to target? ", ["Yes", "No"]],
  ["Do you have estimates for % population for these sub-pop groups?", ["Yes", "No"]],
  undefined, //systematic random sampling
  undefined, //systematic random sampling
  undefined, //systematic random sampling
  undefined, //time-location or cluster sampling
]

let state = "f"
const QuestionsCards = {}

cards.forEach((card) => {
    if (card){
        console.log(state,card)
        QuestionsCards[state] = card
        state = state + 0
    } else {
        state = state.slice(0, -1) + (parseInt(state.slice(-1)) + 1)
        if (state.slice(-1) == QuestionsCards[state.slice(0, -1)][1].length){
            state = state.slice(0, -1)
            state = state.slice(0, -1) + (parseInt(state.slice(-1)) + 1)
        }
    }

  }
  )
  
export default QuestionsCards


// UserAnswer that is not a dictionary key:

// f11: time-location and cluster sampling
// f101, f1000,f1001: systemetic random sampling
// f02, f011, f0000, f0100, f0001, f0101: simple random sampling



// the following dictionary is built:

// f [ 
//   'Do you have a list frame', 
//   [ 'Yes', 'No' ]
//  ]
// f0 [ 
//   'Is the list frame of : ', 
//   [ 'Households', 'Individuals', 'both' ] 
// ]
// f00 [
//   'Do you have any sub population groups to target? ',
//   [ 'Yes', 'No' ]
// ]
// f000 [
//   'Do you know #s on list of these sub population group? ',
//   [ 'Yes', 'No' ]
// ]
// f01 [
//   'Do you have any sub population groups to target? ',
//   [ 'Yes', 'No' ]
// ]
// f010 [
//   'Do you know #s on list of these sub population group? ',
//   [ 'Yes', 'No' ]
// ]
// f1 [
//   'able to easily identify houses/ people ahead of time? ',
//   [ 'Yes', 'No' ]
// ]
// f10 [
//   'Do you have any sub population groups to target? ',
//   [ 'Yes', 'No' ]
// ]
// f100 [
//   'Do you have estimates for % population for these sub-pop groups?',
//   [ 'Yes', 'No' ]
// ]
