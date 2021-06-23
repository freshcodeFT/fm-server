const http = require('http')
const fs = require('fs').promises

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

const requestListener = async (req, res) => {
  const { url, method } = req
  if (method === 'GET' && routerGET[url]) {
    return routerGET[url](req, res)
  }

  const data = await fs.readFile('./views/404.html', 'utf8')
  res.end(data)
}

const server = http.createServer(requestListener)

server.listen(3000)
