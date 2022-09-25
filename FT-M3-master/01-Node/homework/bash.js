 // Output un prompt
 process.stdout.write('prompt > ');
 // El evento stdin 'data' se dispara cuando el user escribe una línea
 process.stdin.on('data', function (data) {
   var args = data.toString().trim().split(" "); // remueve la nueva línea
   process.stdout.write('You typed: ' + cmd); 
let cmd = args.shift();
   if(cmd === 'echo')
   {
process.stdout.write(args.join(" "))

   }
   process.stdout.write('\nprompt > ');
 });