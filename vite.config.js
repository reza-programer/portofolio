
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import fs from 'fs'
import path from 'path'

// Real Backend Plugin to save Data permanently
const dbPath = path.resolve(__dirname, 'public', 'db.json')

const apiPlugin = () => ({
  name: 'api-plugin',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if (req.url === '/api/projects' && req.method === 'GET') {
        try {
          const data = fs.existsSync(dbPath) ? fs.readFileSync(dbPath, 'utf-8') : '{"projects":[],"messages":[]}'
          res.setHeader('Content-Type', 'application/json')
          res.end(data || '{"projects":[],"messages":[]}')
        } catch (e) {
          res.statusCode = 500
          res.end(JSON.stringify({ error: 'Gagal baca database' }))
        }
      } else if (req.url === '/api/projects' && req.method === 'POST') {
        let body = ''
        req.on('data', chunk => { body += chunk.toString() })
        req.on('end', () => {
          try {
            // Validate JSON before saving
            JSON.parse(body) 
            fs.writeFileSync(dbPath, body)
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ status: 'ok' }))
          } catch (e) {
            res.statusCode = 500
            res.end(JSON.stringify({ error: 'Gagal tulis database atau format JSON salah' }))
          }
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
