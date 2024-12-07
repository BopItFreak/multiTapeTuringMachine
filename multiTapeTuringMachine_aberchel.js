const fs = require('fs');
const path = require('path');

//parse Turing machine into JSON
function parseTuringMachineCSV(filePath) {
    const data = fs.readFileSync(filePath, 'utf8').split('\n').map(line => line.trim()).filter(line => line);

    //parse header data
    const [bruh, states, inputAlphabet, tapeAlphabet, startState, acceptState, rejectState] = data.slice(0, 7);
    const nameAndTapes = data.slice(0,7)[0]
    let [name, tapeCount] = nameAndTapes.split(',');
    tapeCount = parseInt(tapeCount);
    const Q = states.split(',').map(s => s.trim());
    const Σ = inputAlphabet.split(',').map(s => s.trim());
    const Γ = tapeAlphabet.split(',').map(s => s.trim());

    // parse transitions after the header
    const transitions = data.slice(7).map(line => {
        const parts = line.split(',');
        const state = parts[0].trim();
        const readSymbols = parts.slice(1, 1 + tapeCount).map(s => s.trim());
        const newState = parts[1 + tapeCount].trim();
        const writeSymbols = parts.slice(2 + tapeCount, 2 + 2 * tapeCount).map(s => s.trim());
        const headMovements = parts.slice(2 + 2 * tapeCount).map(s => s.trim());
        return { state, readSymbols, newState, writeSymbols, headMovements };
    });

    return {
        name,
        tapeCount: parseInt(tapeCount, 10),
        states: Q,
        inputAlphabet: Σ,
        tapeAlphabet: Γ,
        startState: startState.trim(),
        acceptState: acceptState.trim(),
        rejectState: rejectState.trim(),
        transitions
    };
}

function checkSymbols(str1, str2) {
  if (str1.length !== str2.length) {
    return false;
  }

  for (let i = 0; i < str1.length; i++) {
    if (str1[i] !== str2[i] && str1[i] !== '*' && str2[i] !== '*') {
      return false;
    }
  }

  return true;
}

//execute the turing machine based on the input string and terminationFlag
function runTuringMachine(turingMachine, string, terminationFlag) {
  let inputTape = ("_" + string + "_".repeat(100)).split('');
  let tapes = [];
  let currentState = turingMachine.startState;
  let transitionCount = 0;
  tapes[0] = inputTape;
  //load tapes other than the first tape with blank chars
  if (turingMachine.tapeCount > 1) {
    for (let i = 1; i < turingMachine.tapeCount; i++) {
      tapes[i] = new Array(20).fill('_');
    }
  }

  let heads = new Array(turingMachine.tapeCount).fill(1); //simulate a _ always being at the start of the tape
  let inputs = []
  // keep going through states until you get to a reject or accept state, or if the terminationFlag is activated until 50 transitions.
  while (true) {
    if (currentState == turingMachine.rejectState || currentState == turingMachine.acceptState) {
      break;
    }
    console.log(`Current State: ${currentState}`)
    //load inputs
    for (let i = 0; i < turingMachine.tapeCount; i++) {
      inputs[i] = tapes[i][heads[i]];
      console.log(`Tape ${i} character under its head: ${inputs[i]}`)
    }
    //get appropriate transition
    let transitions = turingMachine.transitions.filter(a => a.state == currentState);
    let transitionToTake = transitions.filter(b => checkSymbols(b.readSymbols.join(''),inputs.join('')) == true)[0];
    //set new state
    currentState = transitionToTake.newState;
    ++transitionCount;
    //write the write symbols
    for (let i = 0; i < turingMachine.tapeCount; i++) {
      if (transitionToTake.writeSymbols[i] == '*') continue;
      else {
        tapes[i][heads[i]] = transitionToTake.writeSymbols[i];
      }
    }
    //move the tape heads
    for (let i = 0; i < turingMachine.tapeCount; i++) {
      switch (transitionToTake.headMovements[i]) {
        case "R": {
          ++heads[i];
          break;
        }
        case "L": {
          --heads[i];
          
          if (heads[i] < 0) heads[i] = 0;
          break;
        }
        case "S": {
          //do nothing lul
          break;
        }
      }
    }
    if (transitionCount > 50 && terminationFlag) {
      currentState = turingMachine.rejectState;
      break;
    }  
  }
  if (currentState == turingMachine.acceptState) {
    console.log("Machine Accepted!");
  } else {
    console.log("Machine Rejected!")
  }

}

// command line args
const csvFilePath = process.argv[2];
let string = process.argv[3];
let terminationFlag = process.argv[4] == 'true'

if (!csvFilePath) {
    console.error('Error: Please provide the path to the CSV file as a command-line argument.');
    process.exit(1);
}

if (!string) {
  console.error('Error: Please provide the string after the CSV path');
  process.exit(1);
}

try {
    const turingMachine = parseTuringMachineCSV(csvFilePath);
    console.log(`Machine Name: ${turingMachine.name}. String: ${string}`);
    runTuringMachine(turingMachine, string, terminationFlag);

} catch (error) {
    console.error('Error reading or parsing the CSV file:', error);
}