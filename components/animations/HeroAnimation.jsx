/**
 * TODO Convert that HeroAnimation dirty function into a real React Component.
 */

/* eslint-disable no-use-before-define */

import SimplexNoise from 'simplex-noise'

export default function HeroAnimation($window, $canvas, $reference, opacity = 0.7) {
  // Utils
  const { PI, cos, sin, abs, sqrt, pow, round, random, atan2 } = Math
  const HALF_PI = 0.5 * PI
  const TAU = 2 * PI
  const TO_RAD = PI / 180
  const floor = n => n | 0
  const rand = n => n * random()
  const randIn = (min, max) => rand(max - min) + min
  const randRange = n => n - rand(2 * n)
  const fadeIn = (t, m) => t / m
  const fadeOut = (t, m) => (m - t) / m
  const fadeInOut = (t, m) => {
    let hm = 0.5 * m
    return abs(((t + hm) % m) - hm) / hm
  }
  const dist = (x1, y1, x2, y2) => sqrt(pow(x2 - x1, 2) + pow(y2 - y1, 2))
  const angle = (x1, y1, x2, y2) => atan2(y2 - y1, x2 - x1)
  const lerp = (n1, n2, speed) => (1 - speed) * n1 + speed * n2

  const particleCount = 700
  const particlePropCount = 9
  const particlePropsLength = particleCount * particlePropCount
  const rangeY = 100
  const baseTTL = 50
  const rangeTTL = 150
  //   const baseSpeed = 0.1
  const baseSpeed = 0.05
  //   const rangeSpeed = 2
  const rangeSpeed = 1
  const baseRadius = 1
  const rangeRadius = 4
  //   const baseHue = 220
  const baseHue = 200
  //   const rangeHue = 100
  const rangeHue = 50
  const noiseSteps = 8
  const xOff = 0.00125
  const yOff = 0.00125
  const zOff = 0.0005
  //   const backgroundColor = 'hsla(260,40%,5%,1)'
  //   const backgroundColor = '#121117'
  const backgroundColor = 'hsla(250, 15%, 8%, 1)'

  let container
  let canvas
  let ctx
  let center
  let gradient
  let tick
  let simplex
  let particleProps
  let positions
  let velocities
  let lifeSpans
  let speeds
  let sizes
  let hues

  function setup() {
    createCanvas()
    resize()
    initParticles()
    draw()
  }

  function createCanvas() {
    canvas = {
      a: $window.document.createElement('canvas'),
      b: $canvas,
    }

    ctx = {
      a: canvas.a.getContext('2d'),
      b: canvas.b.getContext('2d'),
    }

    center = []
  }

  function resize() {
    const { offsetWidth, offsetHeight } = $reference

    canvas.a.width = offsetWidth
    canvas.a.height = offsetHeight

    ctx.a.drawImage(canvas.b, 0, 0)

    canvas.b.width = offsetWidth
    canvas.b.height = offsetHeight

    ctx.b.drawImage(canvas.a, 0, 0)

    center[0] = 0.5 * canvas.a.width
    center[1] = 0.5 * canvas.a.height
  }

  function initParticles() {
    tick = 0
    simplex = new SimplexNoise()
    particleProps = new Float32Array(particlePropsLength)

    let i

    for (i = 0; i < particlePropsLength; i += particlePropCount) {
      initParticle(i)
    }
  }

  function initParticle(i) {
    let x, y, vx, vy, life, ttl, speed, radius, hue

    x = rand(canvas.a.width)
    y = center[1] + randRange(rangeY)
    vx = 0
    vy = 0
    life = 0
    ttl = baseTTL + rand(rangeTTL)
    speed = baseSpeed + rand(rangeSpeed)
    radius = baseRadius + rand(rangeRadius)
    hue = baseHue + rand(rangeHue)

    particleProps.set([x, y, vx, vy, life, ttl, speed, radius, hue], i)
  }

  function drawParticles() {
    let i

    for (i = 0; i < particlePropsLength; i += particlePropCount) {
      updateParticle(i)
    }
  }

  function updateParticle(i) {
    let i2 = 1 + i,
      i3 = 2 + i,
      i4 = 3 + i,
      i5 = 4 + i,
      i6 = 5 + i,
      i7 = 6 + i,
      i8 = 7 + i,
      i9 = 8 + i
    let n, x, y, vx, vy, life, ttl, speed, x2, y2, radius, hue

    x = particleProps[i]
    y = particleProps[i2]
    n = simplex.noise3D(x * xOff, y * yOff, tick * zOff) * noiseSteps * TAU
    vx = lerp(particleProps[i3], cos(n), 0.5)
    vy = lerp(particleProps[i4], sin(n), 0.5)
    life = particleProps[i5]
    ttl = particleProps[i6]
    speed = particleProps[i7]
    x2 = x + vx * speed
    y2 = y + vy * speed
    radius = particleProps[i8]
    hue = particleProps[i9]

    drawParticle(x, y, x2, y2, life, ttl, radius, hue)

    life++

    particleProps[i] = x2
    particleProps[i2] = y2
    particleProps[i3] = vx
    particleProps[i4] = vy
    particleProps[i5] = life
    ;(checkBounds(x, y) || life > ttl) && initParticle(i)
  }

  function drawParticle(x, y, x2, y2, life, ttl, radius, hue) {
    ctx.a.save()
    ctx.a.lineCap = 'round'
    ctx.a.lineWidth = radius
    ctx.a.strokeStyle = `hsla(${hue},100%,60%,${Math.max(0, fadeInOut(life, ttl) - (1 - opacity))})`
    ctx.a.beginPath()
    ctx.a.moveTo(x, y)
    ctx.a.lineTo(x2, y2)
    ctx.a.stroke()
    ctx.a.closePath()
    ctx.a.restore()
  }

  function checkBounds(x, y) {
    return x > canvas.a.width || x < 0 || y > canvas.a.height || y < 0
  }

  function renderGlow() {
    ctx.b.save()
    ctx.b.filter = 'blur(8px) brightness(200%)'
    ctx.b.globalCompositeOperation = 'lighter'
    ctx.b.drawImage(canvas.a, 0, 0)
    ctx.b.restore()

    ctx.b.save()
    ctx.b.filter = 'blur(4px) brightness(200%)'
    ctx.b.globalCompositeOperation = 'lighter'
    ctx.b.drawImage(canvas.a, 0, 0)
    ctx.b.restore()
  }

  function renderToScreen() {
    ctx.b.save()
    ctx.b.globalCompositeOperation = 'lighter'
    ctx.b.drawImage(canvas.a, 0, 0)
    ctx.b.restore()
  }

  function draw() {
    tick++

    ctx.a.clearRect(0, 0, canvas.a.width, canvas.a.height)

    ctx.b.fillStyle = backgroundColor
    ctx.b.fillRect(0, 0, canvas.a.width, canvas.a.height)

    drawParticles()
    renderGlow()
    renderToScreen()

    $window.requestAnimationFrame(draw)
  }

  // window.addEventListener('load', setup)
  $window.addEventListener('resize', resize)

  setup()
}