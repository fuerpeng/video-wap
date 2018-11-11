class QualitySelector {
  constructor (player) {
    this.player = player
    this.callback = undefined
    this.containerDropdownElement = undefined
    this.defaults = {}
  }

  onQualitySelect (quality) {
    if (this.callback) {
      this.callback(quality)
    }

    const player = document.getElementById(this.player.id_)
    const qualitySelector = player.getElementsByClassName('vjs-brand-quality-link')

    if (qualitySelector && qualitySelector.length > 0) {
      qualitySelector[0].innerText = quality.name
    }

    this.onToggleDropdown()
  }

  onToggleDropdown () {
    if (this.containerDropdownElement.className.indexOf('show') === -1) {
      this.containerDropdownElement.className += ' show'
    } else {
      const className = this.containerDropdownElement.className.replace(' show', '')

      this.containerDropdownElement.className = className
    }
  }

  onPlayerReady (options) {
    this.containerDropdownElement = document.createElement('div')
    this.containerDropdownElement.className = 'vjs-quality-dropdown'

    let containerElement = document.createElement('div')

    containerElement.className = 'vjs-quality-container'

    let buttonElement = document.createElement('button')

    buttonElement.className = 'vjs-brand-quality-link'
    buttonElement.onclick = (event) => this.onToggleDropdown(event)
    buttonElement.innerText = options.text || 'Quality'

    let ulElement = document.createElement('ul')

    if (!options.formats) {
      options.formats = [{ code: 'auto', name: 'Auto' }]
    }

    if (options.onFormatSelected) {
      this.callback = options.onFormatSelected
    }

    options.formats.map((format) => {
      let liElement = document.createElement('li')

      liElement.dataset.code = format.code

      let linkElement = document.createElement('a')

      linkElement.innerText = format.name
      linkElement.setAttribute('href', '#')
      linkElement.addEventListener('click', (event) => {
        event.preventDefault()
        this.onQualitySelect(format)
      })

      liElement.appendChild(linkElement)
      ulElement.appendChild(liElement)
    })

    this.containerDropdownElement.appendChild(ulElement)
    containerElement.appendChild(this.containerDropdownElement)
    containerElement.appendChild(buttonElement)

    const fullScreenToggle = this.player.controlBar.fullscreenToggle.el()

    this.player.controlBar.el().insertBefore(containerElement, fullScreenToggle)

    this.player.addClass('vjs-qualityselector')
  }
}

export default QualitySelector
