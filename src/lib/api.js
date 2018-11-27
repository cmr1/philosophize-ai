import Api from '@bowtie/api'

/**
 * Init API from ENV
 */
// const api = new Api({
//   root: process.env.REACT_APP_API_ROOT_URL,
//   stage: process.env.REACT_APP_API_STAGE,
//   prefix: process.env.REACT_APP_API_PREFIX,
//   version: process.env.REACT_APP_API_VERSION,
//   secureOnly: process.env.NODE_ENV !== 'development',
//   verbose: process.NODE_ENV !== 'production'
// })

const api = new Api({
  root: 'https://p3l5r3fsod.execute-api.us-east-1.amazonaws.com',
  stage: 'dev',
  prefix: 'api',
  version: 'v1',
  secureOnly: process.env.REACT_APP_ENV !== 'development',
  verbose: process.REACT_APP_ENV !== 'production'
})

// Handler for all non 2xx code api responses
const handleApiError = (resp) => {
  // Airbrake severity is warning unless response status was 5xx
  const severity = /^5\d\d$/.test(resp.status) ? 'error' : 'warn'
  let errorTitle = `${resp.status} ${resp.statusText}`

  if (resp.data && resp.data.message && resp.data.message.trim() !== '') {
    errorTitle = resp.data.message
  }

  const payload = {
    error: new Error(`API ${severity}: ${errorTitle}`),
    context: {
      severity,
      resp
    }
  }

  console.warn(payload)
}

// Attach handlers to event emitter by string event name
api.on('error', handleApiError)

api.use(async (response) => {
  try {
    response.data = await response.json()
  } catch (e) {
    return Promise.resolve(response)
  }

  return Promise.resolve(response)
})

export default api
