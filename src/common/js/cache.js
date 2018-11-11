const PLAY_KEY = '__playing__'

export function getPlaying () {
  return JSON.parse(sessionStorage.getItem(PLAY_KEY))
}

export function setPlaying (path) {
  return sessionStorage.setItem(PLAY_KEY, JSON.stringify(path))
}

export function assembleParam (url, param) {
  return JSON.stringify({
    uri: url,
    token: '',
    paramData: param
  })
}
