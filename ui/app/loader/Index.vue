<template>
  <div class="loader">
    <div class="loader_item center" />

    <div v-for="item in 6" :key="item" class="loader_item" />
  </div>

  <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
    <defs>
      <filter id="goo">
        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
        <feColorMatrix
          in="blur"
          mode="matrix"
          values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
          result="goo"
        />
        <feBlend in="SourceGraphic" in2="goo" />
      </filter>
    </defs>
  </svg>
</template>

<script setup lang="ts">
// https://codepen.io/eliortabeka/pen/EXJyPP
</script>

<style scoped lang="scss">
$left: calc(-330px - 50%);
$right: calc(330px - 50%);

svg {
  @apply hidden;
}

.loader {
  @apply relative mx-auto h-[150px] w-full max-w-xs overflow-hidden;
  transform-style: preserve-3d;

  &_item {
    @apply absolute left-[50%] top-[50%] h-[20px] w-[20px] rounded-full bg-gradient-to-t from-amaranth to-flamingo;

    // background: $bolb-color;
    animation: blobs ease-out 3.4s infinite;
    transform: scale(0.9) translate(-50%, -50%);
    transform-origin: center top;
    opacity: 0;

    @for $i from 1 to 6 {
      &:nth-child(#{$i}) {
        animation-delay: $i * 0.2 + s;
      }
    }

    &.center {
      transform-style: preserve-3d;
      transform-origin: left top !important;
      animation: blob-grow linear 3.4s infinite !important;
      box-shadow: 0 -10px 40px -5px #f25727 !important;
      opacity: 1;
    }
  }
}

@keyframes blobs {
  0% {
    opacity: 0;
    transform: scale(0) translate($left, -50%);
  }
  1% {
    opacity: 1;
  }
  35%,
  65% {
    opacity: 1;
    transform: scale(0.9) translate(-50%, -50%);
  }
  99% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: scale(0) translate($right, -50%);
  }
}

@keyframes blob-grow {
  0%,
  39% {
    transform: scale(0) translate(-50%, -50%);
  }
  40%,
  42% {
    transform: scale(1, 0.9) translate(-50%, -50%);
  }
  43%,
  44% {
    transform: scale(1.2, 1.1) translate(-50%, -50%);
  }
  45%,
  46% {
    transform: scale(1.3, 1.2) translate(-50%, -50%);
  }
  47%,
  48% {
    transform: scale(1.4, 1.3) translate(-50%, -50%);
  }
  52% {
    transform: scale(1.5, 1.4) translate(-50%, -50%);
  }
  54% {
    transform: scale(1.7, 1.6) translate(-50%, -50%);
  }
  58% {
    transform: scale(1.8, 1.7) translate(-50%, -50%);
  }
  68%,
  70% {
    transform: scale(1.7, 1.5) translate(-50%, -50%);
  }
  78% {
    transform: scale(1.6, 1.4) translate(-50%, -50%);
  }
  80%,
  81% {
    transform: scale(1.5, 1.4) translate(-50%, -50%);
  }
  82%,
  83% {
    transform: scale(1.4, 1.3) translate(-50%, -50%);
  }
  84%,
  85% {
    transform: scale(1.3, 1.2) translate(-50%, -50%);
  }
  86%,
  87% {
    transform: scale(1.2, 1.1) translate(-50%, -50%);
  }
  90%,
  91% {
    transform: scale(1, 0.9) translate(-50%, -50%);
  }
  92%,
  100% {
    transform: scale(0) translate(-50%, -50%);
  }
}
</style>
