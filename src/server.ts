/* eslint-disable no-console */
import { app } from './app'
import { config } from './config'

app.listen(config.LOCAL_PORT, () => {
  console.log(`Server running on port ${config.LOCAL_PORT}`)
})
