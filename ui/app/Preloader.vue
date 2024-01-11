<template>
  <Transition>
    <div v-if="preloader.data" class="global-preloader">
      <div class="global-preloader_scene">
        <div class="global-preloader_scene_wrapper">
          <div class="global-preloader_scene_wrapper_cube">
            <div class="global-preloader_scene_wrapper_cube_faces">
              <div
                class="global-preloader_scene_wrapper_cube_faces_item shadow"
              />
              <div
                class="global-preloader_scene_wrapper_cube_faces_item bottom"
              />
              <div class="global-preloader_scene_wrapper_cube_faces_item top" />
              <div
                class="global-preloader_scene_wrapper_cube_faces_item left"
              />
              <div
                class="global-preloader_scene_wrapper_cube_faces_item right"
              />
              <div
                class="global-preloader_scene_wrapper_cube_faces_item back"
              />
              <div
                class="global-preloader_scene_wrapper_cube_faces_item front"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
const preloader = usePreloaderStore()

onMounted(() => {
  const body = document.body
  body.style.overflow = 'hidden'
})

watch(
  () => preloader.data,
  (newValue) => {
    if (!newValue) {
      const body = document.body
      body.style.overflow = 'auto'
    } else {
      const body = document.body
      body.style.overflow = 'hidden'
    }
  },
)
</script>

<style lang="scss">
:root {
  --preloader-size: 80px;
  --preloader-start: 45deg;
  --preloader-animation-duration: 2s;
}

.global-preloader {
  @apply fixed bottom-0 left-0 right-0 top-0 z-50 grid h-full w-full place-items-center bg-black;

  &_scene {
    @apply relative z-10 grid h-[var(--preloader-size)*2.75] w-[var(--preloader-size)*2.75] place-items-center;

    &_wrapper {
      transform-style: preserve-3d;
      animation: bouncing var(--preloader-animation-duration) infinite;

      &_cube {
        transform-style: preserve-3d;
        transform: rotateX(45deg) rotateZ(45deg);
        animation: rotation var(--preloader-animation-duration) infinite;

        &_faces {
          transform-style: preserve-3d;
          height: var(--preloader-size);
          width: var(--preloader-size);
          position: relative;
          transform-origin: 0 0;
          transform: translateX(0) translateY(0)
            translateZ(calc((var(--preloader-size) * -1) / 2));

          &_item {
            @apply absolute border border-black bg-flamingo;
            // bg-gradient-to-r from-amaranth to-flamingo // bg-malibu

            inset: 0;
            box-shadow: 0px 4px 20px 4px rgba(107, 120, 255, 0.1);

            &.shadow {
              @apply bg-amaranth;
              transform: translateZ(calc(var(--preloader-size) * -1));
              animation: bouncing-shadow var(--preloader-animation-duration)
                infinite;
              filter: blur(5px);
            }

            &.top {
              transform: translateZ(var(--preloader-size));
            }

            &.front {
              @apply bg-gradient-to-r from-amaranth to-flamingo;
              transform-origin: 0 50%;
              transform: rotateY(-90deg);
            }

            &.back {
              @apply bg-gradient-to-r from-amaranth to-flamingo;
              transform-origin: 0 50%;
              transform: rotateY(-90deg)
                translateZ(calc(var(--preloader-size) * -1));
            }

            &.right {
              @apply bg-gradient-to-t from-amaranth to-flamingo;
              transform-origin: 50% 0;
              transform: rotateX(-90deg)
                translateY(calc(var(--preloader-size) * -1));
            }

            &.left {
              @apply bg-gradient-to-t from-amaranth to-flamingo;
              transform-origin: 50% 0;
              transform: rotateX(-90deg)
                translateY(calc(var(--preloader-size) * -1))
                translateZ(var(--preloader-size));
            }
          }
        }
      }
    }
  }
}

@keyframes rotation {
  0% {
    transform: rotateX(var(--preloader-start)) rotateY(0)
      rotateZ(var(--preloader-start));
    animation-timing-function: cubic-bezier(0.17, 0.84, 0.44, 1);
  }
  50% {
    transform: rotateX(var(--preloader-start)) rotateY(0)
      rotateZ(calc(var(--preloader-start) + 360deg / 2));
    animation-timing-function: cubic-bezier(0.76, 0.05, 0.86, 0.06);
  }
  100% {
    transform: rotateX(var(--preloader-start)) rotateY(0)
      rotateZ(calc(var(--preloader-start) + 360deg));
    animation-timing-function: cubic-bezier(0.17, 0.84, 0.44, 1);
  }
}

@keyframes bouncing {
  0% {
    transform: translateY(calc(var(--preloader-size) * -0.5));
    animation-timing-function: cubic-bezier(0.76, 0.05, 0.86, 0.06);
  }

  45% {
    transform: translateY(calc(var(--preloader-size) * 0.5));
    animation-timing-function: cubic-bezier(0.23, 1, 0.32, 1);
  }

  100% {
    transform: translateY(calc(var(--preloader-size) * -0.5));
    animation-timing-function: cubic-bezier(0.76, 0.05, 0.86, 0.06);
  }
}

@keyframes bouncing-shadow {
  0% {
    transform: translateZ(calc(var(--preloader-size) * -1)) scale(1.3);
    animation-timing-function: cubic-bezier(0.76, 0.05, 0.86, 0.06);
    opacity: 0.07;
  }

  45% {
    transform: translateZ(0);
    animation-timing-function: cubic-bezier(0.23, 1, 0.32, 1);
    opacity: 0.35;
    filter: blur(0);
  }

  100% {
    transform: translateZ(calc(var(--preloader-size) * -1)) scale(1.3);
    animation-timing-function: cubic-bezier(0.76, 0.05, 0.86, 0.06);
    opacity: 0.07;
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
