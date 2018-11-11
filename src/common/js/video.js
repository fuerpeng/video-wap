export default class Video {
  constructor ({id, videoTitle, pathLogo, path480p, path720p, path1080p, videoTime, hotHit}) {
    this.id = id
    this.videoTitle = videoTitle
    this.pathLogo = pathLogo
    this.path480p = path480p
    this.path720p = path720p
    this.path1080p = path1080p
    this.videoTime = videoTime
    this.hotHit = hotHit
  }
}
