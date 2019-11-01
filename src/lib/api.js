const API_URL = process.env.API_URL;

const headers = method => ({
  method: method,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  }
})

const apiRequest = function(method, path, body, params) {
  if(params) path += `?${module.exports.buildQuery(params)}`
  const request = headers();
  if (method !== "GET") headers.body = JSON.stringify(params);
  return fetch(API_URL + path, request)
    .then(async res => {
      if (res.ok) return JSON.parse(await res.json())
      else throw JSON.parse(await res.json())
    })
}

module.exports = {
  get: (path, params) => apiRequest("GET", path, undefined, params),
  post: (path, body, params) => apiRequest("POST", path, body, params),
  buildQuery: queryObj => Object.values(queryObj).map(x => x.join("=")).join("&")
}
