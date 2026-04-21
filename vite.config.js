
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import fs from 'fs'
import path from 'path'

// Real Backend Plugin to save Data permanently
const dbPath = path.resolve(__dirname, 'db.json')

const apiPlugin = () => ({
  name: 'api-plugin',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if (req.url === '/api/projects' && req.method === 'GET') {
        const data = fs.existsSync(dbPath) ? fs.readFileSync(dbPath, 'utf-8') : 'null'
        res.setHeader('Content-Type', 'application/json')
        res.end(data)
      } else if (req.url === '/api/projects' && req.method === 'POST') {
        let body = ''
        req.on('data', chunk => { body += chunk.toString() })
        req.on('end', () => {
          fs.writeFileSync(dbPath, body)
          res.end(JSON.stringify({ status: 'ok' }))
        })
      } else {
        next()
      }
    })
  }
})

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), apiPlugin()],
  server: {
    host: true
  }
})
