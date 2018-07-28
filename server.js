'use strict';

let inc = 1
let message = ""
let start = new Date()

// /usr/src/app/*
const update = () => {
  var fs = require('fs')
  var content = fs.readFileSync("./server.js")
  content += "\nconsole.log('Dog')"
  fs.writeFile("./server.js", content, function(err) {
    if (err) {
      message = JSON.stringify(err)
      return
    }
  })
}

const express = require('express')

// Constants
const PORT = 8080
const HOST = '0.0.0.0'

// App
const app = express()
app.get('/', (req, res) => {
  inc += 1
  // If 10 seconds have passed update 
  if (new Date() - start > 10000) {
    // If update works this file (server.js) will be reloaded by nodemon and inc will become 1 again
    update()
  }
  let content = `Ahoy, world! ${inc} ${message}`
  
  res.send(`Farto Furto Farta\n\n\n${content}`)
})

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

