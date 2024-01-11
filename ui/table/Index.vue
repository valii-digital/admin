<template>
  <div>
    <table class="w-full">
      <thead>
        <tr>
          <td
            v-for="(field, index) in fields"
            :key="index"
            class="border border-mischka px-1 py-3 text-center text-xs dark:border-woodsmoke"
          >
            {{ field.name }}
          </td>

          <td
            v-if="isActions"
            class="border border-mischka px-1 py-3 text-center text-xs dark:border-woodsmoke"
          >
            Action
          </td>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in data" :key="item.id">
          <td
            v-for="(field, index) in fields"
            :key="index"
            class="border border-transparent border-b-mischka px-1 py-3 text-center text-sm dark:border-b-woodsmoke"
          >
            {{ getFormat(index, item, field.type) }}
          </td>

          <td
            v-if="isActions"
            class="flex justify-center gap-1 border border-transparent border-b-mischka px-1 py-2 text-center text-xs dark:border-b-woodsmoke"
          >
            <NuxtLink
              v-if="isUpdateAction"
              :to="
                localePath(
                  `${crud ? '/crud' : ''}/${route.params.url}/${item.id}`,
                )
              "
              class="flex h-8 items-center gap-1.5 rounded-lg border border-mustard px-4 text-sm font-medium uppercase transition-all hover:bg-mustard hover:text-black-pearl"
            >
              Update

              <Icon name="iconamoon:edit" />
            </NuxtLink>

            <button
              v-if="isRemoveAction"
              class="flex h-8 items-center gap-1.5 rounded-lg border border-radical-red px-4 text-sm font-medium uppercase transition-all hover:bg-radical-red hover:text-black-pearl"
              @click="removeItem(item.id)"
            >
              Remove

              <Icon name="mingcute:delete-line" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
const emits = defineEmits(['update:data'])
const props = defineProps<{
  fields: any[]
  data: any[]
  actions: string[]
  crud?: boolean
}>()

const route = useRoute()
const localePath = useLocalePath()

const isUpdateAction = computed(() => props.actions?.indexOf('update') !== -1)
const isRemoveAction = computed(() => props.actions?.indexOf('remove') !== -1)
const isActions = computed(() => isUpdateAction.value || isRemoveAction.value)

function getFormat(field: string, value: any, format: string) {
  const evalValue = eval(`value.${field}`)

  if (!evalValue) return '- - -'

  if (format === 'date')
    return useDateFormat(evalValue, 'DD.MM.YYYY HH:mm:ss').value
  return evalValue
}

async function removeItem(id: number) {
  await useApi(`/admin/${route.params.url}/${id}`, {
    method: 'DELETE',
  }).then(() => {
    const newData = props.data.filter((item) => item.id !== id)
    emits('update:data', newData)
  })
}
</script>
