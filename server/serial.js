const { SerialPort } = require('serialport');

let serialport;

function writeSerial(numArr) {
  const buf = Buffer.from(numArr);
  console.log(buf);
  serialport.write(buf);
}

module.exports.startSerial = function(portPath) {
  if (serialport) {
    return;
  }

  serialport = new SerialPort({
    path: portPath,
    baudRate: 9600,
  });

  serialport.on("open", function(){
    console.log("Serial port opened.");
  })

  serialport.on("error", function(err){
    console.error(err);
  })

  serialport.on("close", function() {
    console.log("Serial port closed.")
  })

  
  serialport.on('readable', function () {
    console.log('Data:', serialport.read())
  })

  // Switches the port into "flowing mode"
  serialport.on('data', function (data) {
    console.log('Data:', data)
  })


  if (!serialport.isOpen) {
    serialport.open();
  }

  console.log(`serialport ready: ${portPath}`);

  return writeSerial;
}
