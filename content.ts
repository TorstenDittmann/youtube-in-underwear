import type { PlasmoCSConfig } from "plasmo"

export const config: PlasmoCSConfig = {
  matches: ["https://*.youtube.com/*"],
  world: "MAIN"
}

let initialized = false

const removeShorts = () => {
  const shorts = document.querySelectorAll('a[href^="/shorts"]')
  shorts.forEach((n) => n.closest("ytd-grid-video-renderer")?.remove())
}

const observer = new MutationObserver(removeShorts)
const callback = () => {
  removeShorts()
  const subscriptions = document.querySelector(
    'ytd-section-list-renderer[page-subtype="subscriptions"] div#contents'
  )
  if (subscriptions) {
    initialized = true
  }
  observer.observe(subscriptions, {
    childList: true,
    subtree: false
  })
}

window.addEventListener("yt-navigate-finish", callback)
setInterval(() => {
  if (initialized) return

  callback()
}, 1000)
