import Clipboard from 'clipboard'

export default function handleClipboard (text, event, succFn, failFn) {
  const clipboard = new Clipboard(event.target, {
    text: () => text
  })
  clipboard.on('success', () => {
    succFn && succFn()
    clipboard.off('error')
    clipboard.off('success')
    clipboard.destroy()
  })
  clipboard.on('error', () => {
    failFn && failFn()
    clipboard.off('error')
    clipboard.off('success')
    clipboard.destroy()
  })
  clipboard.onClick(event)
}
