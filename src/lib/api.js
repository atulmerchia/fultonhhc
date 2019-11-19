const API_URL = process.env.API_URL;

const headers = method => ({
  method: method,
  headers: {
    "Content-Type": "Application/json",
    "Accept": "Application/json"
  }
})

const apiRequest = function(method, path, body, params) {
  if(params) path += `?${module.exports.buildQuery(params)}`
  const request = headers(method);
  if (method !== 'GET') request.body = JSON.stringify(body);
  return fetch(API_URL + path, request)
    .then(res => {
      if (res.ok) return res.json()
      else throw res.json()
    }).catch(err => {
      throw err.err
        ? err
        : Object.assign(err, { err: "An unexpected error has occurred" })
    })
}

module.exports = {
  get: (path, params) => apiRequest('GET', path, undefined, params),
  post: (path, body, params) => apiRequest('POST', path, body, params),
  buildQuery: queryObj => Object.entries(queryObj).map(x => x.join('=')).join('&')
}
