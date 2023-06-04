import mongoose from 'mongoose'
import app from './app'
import config from './config/index'

async function connection() {
  try {
    await mongoose.connect(config.database_url as string)
    console.log('Database Connect Successfully')

    app.listen(config.port, () => {
      console.log(`Application listening on port ${config.port}`)
    })
  } catch (err) {
    console.log('Failed to connect database', err)
  }
}

connection()
