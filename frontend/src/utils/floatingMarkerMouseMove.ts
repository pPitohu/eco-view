export const attachMarkerToMouseMove = (container, markerImage: string) => {
  const marker = document.createElement('img')
  marker.classList.add('floating-marker')
  marker.setAttribute('src', markerImage)

  container.appendChild(marker)
  console.log(container.getBoundingClientRect())
  const containerRect = container.getBoundingClientRect()

  document.onmousemove = e => setTimeout(() => {
    marker.style.top = e.pageY - containerRect.top - 41 + 'px'
    marker.style.left = e.pageX - containerRect.left - 17 + 'px'
  }, 10)
}

export const detachMarkerFromMouseMove = container => {
  const marker = container.querySelector('.floating-marker')
  container.removeChild(marker)

  document.onmousemove = () => {}
}
