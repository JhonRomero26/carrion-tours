export function averageImageColor(image: HTMLImageElement) {

  let i = -4
  const blockSize = 5
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  const rgb = { r: 0, g: 0, b: 0 }

  let data: ImageData
  let count = 0

  if (!context) return rgb

  const height = canvas.height = image.naturalHeight || image.offsetHeight || image.height
  const width = canvas.width = image.naturalWidth || image.offsetWidth || image.height

  context.drawImage(image, 0, 0)

  try {
    data = context.getImageData(0, 0, width, height)
  } catch (err) {
    return rgb
  }

  const length = data.data.length

  while ((i += blockSize * 4) < length) {
    ++count
    rgb.r += data.data[i];
    rgb.g += data.data[i + 1];
    rgb.b += data.data[i + 2];
  }

  rgb.r = ~~(rgb.r / count);
  rgb.g = ~~(rgb.g / count);
  rgb.b = ~~(rgb.b / count);

  return rgb
}

export const rgb2hex = (rgb: { r: number, g: number, b: number }, opacity?: number) => {
  const r = rgb.r.toString(16).padStart(2, '0')
  const g = rgb.g.toString(16).padStart(2, '0')
  const b = rgb.b.toString(16).padStart(2, '0')
  const alpha = opacity !== undefined && opacity < 100 ? Math.round(opacity / 100 * 255).toString(16).padStart(2, '0') : ''

  return `#${r}${g}${b}${alpha}`
}

export function luminanceColor({ rgb, gamma }: { rgb: { r: number, g: number, b: number }, gamma?: number }) {
  const GAMMA = 2.4
  const a = Object.values(rgb).map(value => {
    const newValue = value / 255
    return newValue <= 0.03928 ? newValue / 12.92 : Math.pow((newValue + 0.055) / 1.055, gamma ?? GAMMA)
  })

  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722
}


export function contrastColor({ rgb1, rgb2 }: { rgb1: { r: number, g: number, b: number }, rgb2: { r: number, g: number, b: number } }) {
  const lum1 = luminanceColor({ rgb: rgb1 })
  const lum2 = luminanceColor({ rgb: rgb2 })
  const brightness = Math.max(lum1, lum2)
  const darkness = Math.min(lum1, lum2)

  return (brightness + 0.05) / (darkness + 0.05)
}
