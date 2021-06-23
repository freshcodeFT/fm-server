const http = require('http')
const fs = require('fs').promises

let counter = 0

const users = [];

const routerGET = {
  '/': async (req, res) => {
    const data = await fs.readFile('./views/index.html', 'utf8')
    res.end(data)
  },
  '/contacts.html': async (req, res) => {
    const data = await fs.readFile('./views/contacts.html', 'utf8')
    res.end(data)
  },
  '/about.html': async (req, res) => {
    const data = await fs.readFile('./views/about.html', 'utf8')
    res.end(data)
  }
}

const routerPOST = {
  '*': async (req, res) => {
    counter++
    console.log(counter)
    res.end()
  },
  '/create-user': async (req, res) => {
    let jsonString = ''
    req.on('data', chunk => {
      jsonString += chunk
    })
    req.on('end', () => {
      const user = JSON.parse(jsonString);
      user.id = Date.now();
      users.push(user);
      console.log(users);
      res.end(JSON.stringify(user));
    })
  }
}

const requestListener = async (req, res) => {
  const { url, method } = req
  if (method === 'GET' && routerGET[url]) {
    return routerGET[url](req, res)
  }

  if (method === 'POST') {
    if (routerPOST[url]) {
      return routerPOST[url](req, res)
    } else {
      return routerPOST['*'](req, res)
    }
  }

  const data = await fs.readFile('./views/404.html', 'utf8')
  res.end(data)
}

const server = http.createServer(requestListener)

server.listen(3000)
