<template>
  <canvas ref="canvas" class="starlight-bg"></canvas>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const canvas = ref(null)
let ctx = null
let animationId = null
let stars = []
let blobs = []
const STAR_NUM = 80
const STAR_COLOR = 'rgba(255,255,255,0.85)'
const STAR_MIN_RADIUS = 0.7
const STAR_MAX_RADIUS = 2.2
const STAR_MIN_SPEED = 0.15
const STAR_MAX_SPEED = 0.6
const BLOB_NUM = 10
const BLOB_COLORS = [
  'rgba(79,140,255,0.32)',
  'rgba(110,208,255,0.28)',
  'rgba(255,255,255,0.18)',
  'rgba(120,255,210,0.22)',
  'rgba(255,180,255,0.20)',
  'rgba(255,255,180,0.18)'
]

function randomBetween(a, b) {
  return a + Math.random() * (b - a)
}

function resizeCanvas() {
  const c = canvas.value
  c.width = window.innerWidth
  c.height = window.innerHeight
}

function createStars() {
  stars = []
  for (let i = 0; i < STAR_NUM; i++) {
    stars.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: randomBetween(STAR_MIN_RADIUS, STAR_MAX_RADIUS),
      speed: randomBetween(STAR_MIN_SPEED, STAR_MAX_SPEED),
      alpha: randomBetween(0.5, 1),
      drift: randomBetween(-0.2, 0.2)
    })
  }
}

function createBlobs() {
  blobs = []
  for (let i = 0; i < BLOB_NUM; i++) {
    blobs.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: randomBetween(260, 420),
      color: BLOB_COLORS[i % BLOB_COLORS.length],
      dx: randomBetween(-0.12, 0.12),
      dy: randomBetween(-0.08, 0.08)
    })
  }
}

function drawStars() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
  for (const star of stars) {
    ctx.save()
    ctx.globalAlpha = star.alpha
    ctx.beginPath()
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2)
    ctx.fillStyle = STAR_COLOR
    ctx.shadowColor = '#fff'
    ctx.shadowBlur = 8
    ctx.fill()
    ctx.restore()
  }
}

function drawBlobs() {
  for (const blob of blobs) {
    ctx.save()
    const gradient = ctx.createRadialGradient(blob.x, blob.y, blob.r * 0.2, blob.x, blob.y, blob.r)
    gradient.addColorStop(0, blob.color)
    gradient.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.beginPath()
    ctx.arc(blob.x, blob.y, blob.r, 0, Math.PI * 2)
    ctx.fillStyle = gradient
    ctx.globalAlpha = 1
    ctx.fill()
    ctx.restore()
  }
}

function animate() {
  // 先移动光斑
  for (const blob of blobs) {
    blob.x += blob.dx
    blob.y += blob.dy
    // 边界反弹
    if (blob.x < -blob.r) blob.x = window.innerWidth + blob.r
    if (blob.x > window.innerWidth + blob.r) blob.x = -blob.r
    if (blob.y < -blob.r) blob.y = window.innerHeight + blob.r
    if (blob.y > window.innerHeight + blob.r) blob.y = -blob.r
  }
  // 再移动星星
  for (const star of stars) {
    star.y += star.speed
    star.x += star.drift
    if (star.y > window.innerHeight + 5) {
      star.y = -5
      star.x = Math.random() * window.innerWidth
      star.r = randomBetween(STAR_MIN_RADIUS, STAR_MAX_RADIUS)
      star.speed = randomBetween(STAR_MIN_SPEED, STAR_MAX_SPEED)
      star.alpha = randomBetween(0.5, 1)
      star.drift = randomBetween(-0.2, 0.2)
    }
    if (star.x < 0) star.x = window.innerWidth
    if (star.x > window.innerWidth) star.x = 0
  }
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
  drawBlobs()
  drawStars()
  animationId = requestAnimationFrame(animate)
}

onMounted(() => {
  resizeCanvas()
  ctx = canvas.value.getContext('2d')
  createBlobs()
  createStars()
  animate()
  window.addEventListener('resize', () => {
    resizeCanvas()
    createBlobs()
    createStars()
  })
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animationId)
})
</script>

<style scoped>
.starlight-bg {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  pointer-events: none;
  /* 让canvas更容易被看到 */
  mix-blend-mode: lighten;
}
</style> 