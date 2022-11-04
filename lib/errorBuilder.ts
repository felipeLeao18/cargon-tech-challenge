/* eslint-disable @typescript-eslint/no-unused-vars */
const build = ({ statusCode, message }): { err: Error, statusCode: number, message: String } => {
  return {
    err: new Error(),
    statusCode,
    message
  }
}

const error = {
  build
}
export { error }
