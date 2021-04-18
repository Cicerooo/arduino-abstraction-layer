// Serial stuff
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const port = new SerialPort('COM4', { baudRate: 115200 });
const parser = port.pipe(new Readline({ delimiter: '\n' }));// Read the port data
// Input robot
const robot = require("robotjs");

const dataToSkip = 100;
let currentData = 0;
let inputData = {
  "c1":1,
  "x":0,
  "y":0,
  "b1":1
};
let assignedValue = "";

//List all serial ports available
SerialPort.list().then(function (data) {
  console.log(data);  
});

port.on("open", () => {
  console.warn('serial port open');
});
port.on('close', ()=>{
  console.log(JSON.stringify(inputData));
})

parser.on('data', data =>{
  if(data.includes("}")){
    parseNextInput(data);
  }  
  showDataOnScreen();
});

function showDataOnScreen(){
  if(currentData==dataToSkip){
    console.clear();
    console.log(inputData)
    currentData = 0;
  }
  else currentData++;
}

function parseNextInput(input){
  try {
    inputData = JSON.parse(input);
  }
  catch(e){
    console.log(e) 
    console.log(input)
  }
  finally{
    processInput();
  }
}
function processInput(){
  if(inputData.y>700)
    robot.keyTap("w")
  if(inputData.x>700)
    robot.keyTap("a")
  if(inputData.y<300)
    robot.keyTap("s")
  if(inputData.x<300)
    robot.keyTap("d")
}
