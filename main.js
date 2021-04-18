const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');const port = new SerialPort('COM4', { baudRate: 115200 });
const parser = port.pipe(new Readline({ delimiter: '\n' }));// Read the port data
let inputData = {
  "c1":1,
  "x":0,
  "y":0,
  "b1":1
};
let assignedValue = "";

port.on("open", () => {
  console.warn('serial port open');
});
parser.on('data', data =>{
  parseNextInput(data);
  if(data.includes("DATA_START")){
      //port.close();
      console.clear();
  }
  console.log('input:', data);
});
port.on('close', ()=>{
  console.log(JSON.stringify(inputData));
})
function parseNextInput(input){
  if(parseInt(input)!=NaN){
    inputData[assignedValue] = parseInt(input);
  }
  else{
    assignedValue = input;
  }
}
