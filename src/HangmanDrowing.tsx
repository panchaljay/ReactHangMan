import './HangmanDrowing.css'

const HEAD = (
  <div style={{
      height:'2.2vw',
      width:'2vw',
      border:'0.5vw solid black',
      borderRadius:'50%',
      position:'absolute',
      top:'2.8vw',
      right:'8.8vw',
      }}
    />
)
const BODY = (
  <div style={{
    height:'5vw',
    width:'0.5vw',
    background:'black',
    position:'absolute',
    top:'5.5vw',
    right:'10vw'
    }}
    />
)
const LEFT_ARM = (
  <div style={{
    width:'4vw',
    height:'0.5vw',
    background:'black',
    position:'absolute',
    top:'8.5vw',
    right:'7vw',
    rotate:'30deg',
    transformOrigin:'right bottom'
    }}
    />
)
const RIGHT_ARM = (
  <div style={{
    width:'4vw',
    height:'0.5vw',
    background:'black',
    position:'absolute',
    top:'8.5vw',
    right:'9.5vw',
    rotate:'-30deg',
    transformOrigin:'left bottom'
    }}
    />
)
const RIGHT_LEG = (
  <div style={{
    width:'5vw',
    height:'0.5vw',
    background:'black',
    position:'absolute',
    top:'10vw',
    right:'5.5vw',
    rotate:'60deg',
    transformOrigin:'left bottom' 
    }}
    />
)
const LEFT_LEG = (
  <div style={{
    width:'5vw',
    height:'0.5vw',
    background:'black',
    position:'absolute',
    top:'10vw',
    right:'10vw',
    rotate:'-60deg',
    transformOrigin:'right bottom'
    }}
    />
)
const BODY_PARTS = [ HEAD, BODY, RIGHT_ARM, LEFT_ARM, RIGHT_LEG, LEFT_LEG]

type HangmanDrowingProps = {
  numberofGuesses : number
}
function HangmanDrowing({ numberofGuesses } :
  HangmanDrowingProps) {
  return (<>
    <div style={{ position: 'relative', width: '30vw', height: '100%' }}>
      <div id="hangman-container"> <div id="hangman"> {BODY_PARTS.slice(0, numberofGuesses)} </div> </div>
      <div style={{ height:'3vw', width:'0.5vw', background:'black', position:'absolute', top:0, right:'10vw' }} />
      <div style={{ height:'0.5vw', width:'15vw', background:'black', marginLeft:'5vw' }} />
      <div style={{ height:'15vw', width:'0.5vw', background:'black', marginLeft:'5vw' }} />
      <div style={{ height:'0.5vw', width:'10vw', background:'black', left:0 }}/>
    </div>
    </>)
}

export default HangmanDrowing