function componentToHex(c) {
  const hex = c.toString(16)
  return hex.length === 1 ? `0${hex}` : hex
}

export function rgbToHex(rgb) {
  const arr = rgb.match(/\((.*)\)/)[1].split(',')
  const r = +arr[0]
  const g = +arr[1]
  const b = +arr[2]
  return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`
}

export function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
  const h = hex.replace(shorthandRegex, (m, r, g, b) => (r + r + g + g + b + b))

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(h)
  return result ? [parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  ].join(',') : null
}
