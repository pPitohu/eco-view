export const attachMarkerToMouseMove = (container, markerImage: string) => {
  const marker = document.createElement('img')
  marker.classList.add('floating-marker')
  marker.setAttribute('src', markerImage)

  container.appendChild(marker)

  container.onmousemove = e => setTimeout(() => {
    marker.style.top = e.screenY - 310 + 'px'
    marker.style.left = e.screenX - 390 + 'px'
  }, 10)
}

export const detachMarkerFromMouseMove = container => {
  const marker = container.querySelector('.floating-marker')
  container.removeChild(marker)

  container.onmousemove = () => {}
}
