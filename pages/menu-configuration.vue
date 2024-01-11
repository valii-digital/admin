<template>
  <UPage :loading="loading" @save="save">
    <template #top> Управління меню </template>

    <template #content>
      <ULangSelect />

      <Draggable
        v-model="clonedValue"
        class="max-w-4xl"
        :group="{ name: 'nested' }"
        itemKey="id"
        @end="sortValue(clonedValue)"
      >
        <template #item="{ element: parent, index: parentIndex }">
          <div>
            <div class="parrent-item flex gap-2">
              <div
                :class="[
                  'relative flex w-9 flex-col border border-transparent pr-2 pt-3 transition-all',
                  {
                    'new-item': isNew(parent),
                    'update-item': isUpdate(parent),
                  },
                ]"
              >
                <div
                  class="buttons flex flex-col gap-2 opacity-0 transition-all"
                >
                  <div
                    class="flex aspect-square w-full cursor-pointer items-center rounded-md border-2 border-radical-red transition-all hover:bg-radical-red hover:text-black"
                    :title="'Видалити'"
                    @click="deleteItem(parent.id)"
                  >
                    <Icon class="mx-auto" name="tabler:trash" />
                  </div>

                  <div
                    class="flex aspect-square w-full cursor-pointer items-center rounded-md border-2 border-screamin-green transition-all hover:bg-screamin-green hover:text-black"
                    :title="'Додати сторінку'"
                    @click="addItem(parent.id)"
                  >
                    <Icon class="mx-auto" name="ph:plus" />
                  </div>
                </div>

                <div
                  class="is-new absolute bottom-2 left-2 -rotate-90 text-xs uppercase tracking-widest opacity-0 transition-all"
                >
                  New
                </div>

                <div
                  class="is-update absolute -left-1 bottom-5 -rotate-90 text-xs uppercase tracking-widest opacity-0 transition-all"
                >
                  Update
                </div>
              </div>

              <div class="grid w-full grid-cols-2 gap-3 py-3">
                <UInput
                  v-model="parent.name[language.select]"
                  :placeholder="'Назва'"
                  :errors="v$[parentIndex].name[language.select].$errors"
                />

                <UInput v-model="parent.url" :placeholder="'URL'" />

                <UInput v-model="parent.route" :placeholder="'Route'" />

                <UInput
                  v-model="parent.icon"
                  :placeholder="'Іконка'"
                  :errors="v$[parentIndex].icon.$errors"
                >
                  <template #icon>
                    <Icon :name="parent.icon" class="overflow-hidden" />
                  </template>
                </UInput>
              </div>
            </div>

            <Draggable
              v-model="parent.childs"
              class="col-span-2 flex min-h-[16px] w-full max-w-4xl flex-col gap-2 pl-9"
              :group="{ name: 'nested' }"
              itemKey="id"
              @end="sortValue(clonedValue)"
            >
              <template #item="{ element: child, index: childIndex }">
                <div>
                  <div class="parrent-item flex gap-2">
                    <div
                      :class="[
                        'relative flex w-9 flex-col border border-transparent pr-2 pt-3 transition-all',
                        {
                          'new-item': isNew(child),
                          'update-item': isUpdate(child),
                        },
                      ]"
                    >
                      <div
                        class="buttons flex flex-col gap-2 opacity-0 transition-all"
                      >
                        <div
                          class="flex aspect-square w-full cursor-pointer items-center rounded-md border-2 border-radical-red transition-all hover:bg-radical-red hover:text-black"
                          :title="'Видалити'"
                          @click="deleteItem(child.id)"
                        >
                          <Icon class="mx-auto" name="tabler:trash" />
                        </div>
                      </div>

                      <div
                        class="is-new absolute bottom-2 left-2 -rotate-90 text-xs uppercase tracking-widest opacity-0 transition-all"
                      >
                        New
                      </div>

                      <div
                        class="is-update absolute -left-1 bottom-5 -rotate-90 text-xs uppercase tracking-widest opacity-0 transition-all"
                      >
                        Update
                      </div>
                    </div>

                    <div class="grid w-full grid-cols-2 gap-3 py-3">
                      <UInput
                        v-model="child.name[language.select]"
                        :placeholder="'Назва'"
                        :errors="
                          v$[parentIndex].childs[childIndex].name[
                            language.select
                          ].$errors
                        "
                      />

                      <UInput v-model="child.url" :placeholder="'URL'" />

                      <UInput v-model="child.route" :placeholder="'Route'" />

                      <UInput
                        v-model="child.icon"
                        :placeholder="'Іконка'"
                        :errors="
                          v$[parentIndex].childs[childIndex].icon.$errors
                        "
                      >
                        <template #icon>
                          <Icon :name="child.icon" class="overflow-hidden" />
                        </template>
                      </UInput>
                    </div>
                  </div>
                </div>
              </template>
            </Draggable>
          </div>
        </template>
      </Draggable>
    </template>

    <template #end>
      <div class="flex gap-2">
        <button
          class="h-10 border border-[red] px-3"
          :title="'Зберегти & Ctrl+S'"
          :disabled="!isEditValue"
          @click="save()"
        >
          Зберегти
        </button>

        <button
          v-if="isEditValue"
          class="h-10 border border-[red] px-3"
          :title="'Відмінити'"
          @click="cloneValue()"
        >
          Відмінити
        </button>

        <button
          class="h-10 border border-[red] px-3"
          :title="'Додати сторінку'"
          @click="addItem()"
        >
          Додати сторінку
        </button>
      </div>
    </template>
  </UPage>
</template>

<script setup lang="ts">
import Draggable from 'vuedraggable'
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'

interface MenuElement {
  id: number | string
  name: { key: string }
  icon: string
  url: string
  route?: string | null
  number: number
  childs?: MenuElement[]
}

const navigate = useNavigateStore()
const language = useLanguageStore()
const loading = ref(true)
const originalValue = ref<MenuElement[] | []>([])
const clonedValue = ref<MenuElement[] | []>([])

const isEditValue = computed(
  () =>
    JSON.stringify(clonedValue.value) !== JSON.stringify(originalValue.value),
)

const rules = computed(() => {
  const langs: any = {}

  for (const key of language.keys)
    langs[key] = {
      required: helpers.withMessage('errors.required', required),
    }

  const itemRule = {
    name: langs,
    icon: {
      required: helpers.withMessage('errors.required', required),
    },
  }

  const r = []

  for (const e of clonedValue.value) {
    const childRule = []
    for (const i in e.childs) {
      childRule.push(itemRule)
    }

    r.push({ ...itemRule, childs: childRule })
  }

  return r
})

const v$ = useVuelidate(rules, clonedValue)

onMounted(async () => {
  await fetch()
})

async function fetch() {
  await useApi('admin/menu/control')
    .then(
      ({
        data: {
          value: { data },
        },
      }) => {
        originalValue.value = data
        sortValue(originalValue.value)
        cloneValue()
      },
    )
    .finally(() => {
      loading.value = false
    })
}

async function save() {
  if (!isEditValue.value) return

  v$.value.$touch()
  if (v$.value.$invalid) return

  await useApi('admin/menu', {
    method: 'POST',
    body: clonedValue.value,
  }).then(
    ({
      data: {
        value: { data },
      },
    }) => {
      navigate.fetch()

      originalValue.value = data

      sortValue(originalValue.value)
      cloneValue()
    },
  )
}

function isNew(value: MenuElement) {
  return typeof value.id !== 'number'
}

function isUpdate(value: MenuElement) {
  if (!value.id) return false

  return (
    JSON.stringify(getItem(value, clonedValue.value)) !==
    JSON.stringify(getItem(value, originalValue.value))
  )
}

function getItem(value: MenuElement, list: MenuElement[]) {
  for (const item of list)
    if (item.id === value.id) return item
    else
      for (const child of item.childs) if (child.id === value.id) return child

  return null
}

function addItem(value?: number) {
  const langs: any = {}

  for (const slug in language.data) {
    langs[slug] = ''
  }

  const item: MenuElement = {
    id: `interfaceKey${Math.random() * 1000}`,
    name: langs,
    icon: '',
    url: '',
    route: null,
    number: 0,
    childs: [],
  }

  if (!value) return clonedValue.value.push(item)

  for (const e in clonedValue.value) {
    if (clonedValue.value[e].id === value)
      return clonedValue.value[e].childs.push(item)
  }
}

function deleteItem(value: number) {
  for (let e = 0; e < clonedValue.value.length; e++) {
    if (clonedValue.value[e].id === value) return clonedValue.value.splice(e, 1)

    for (let i = 0; i < clonedValue.value[e].childs.length; i++) {
      if (clonedValue.value[e].childs[i].id === value)
        return clonedValue.value[e].childs.splice(i, 1)
    }
  }
}

function sortValue(value: MenuElement[]) {
  for (let e = 0; e < value.length; e++) {
    value[e].number = e

    if (!value[e].childs) value[e].childs = []

    for (let i = 0; i < value[e].childs.length; i++) {
      value[e].childs[i].number = i

      if (!value[e].childs[i].childs) value[e].childs[i].childs = []
      else if (value[e].childs[i].childs?.length) {
        value[e].childs = value[e].childs.concat(value[e].childs[i].childs)
        value[e].childs[i].childs = []
      }
    }
  }
}

function cloneValue() {
  const { cloned } = useCloned(originalValue.value, { manual: true })
  clonedValue.value = cloned.value
}
</script>

<style lang="scss" scoped>
.parrent-item {
  &:hover .buttons {
    @apply opacity-100;
  }
}

.new-item {
  @apply border-r-cornflower-blue #{!important};

  .is-new {
    @apply text-cornflower-blue opacity-100;
  }

  .is-update {
    @apply opacity-0 #{!important};
  }
}

.update-item {
  @apply border-r-mustard;

  .is-update {
    @apply text-mustard opacity-100;
  }
}
</style>
