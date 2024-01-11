import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'

export const useCRUDPage = () => {
  const language = useLanguageStore()

  const loading = ref(true)

  const fieldsValue = ref<any[]>({})
  const originalValue = ref<any>({})
  const clonedValue = ref<any>({})

  const isUpdateValue = computed(
    () =>
      JSON.stringify(clonedValue.value) !== JSON.stringify(originalValue.value),
  )

  const customRules = ref(null)
  const rules = computed(() => {
    const r: any = {}

    for (const item in fieldsValue.value) {
      if (fieldsValue.value[item].required) {
        if (fieldsValue.value[item].translations) {
          for (const lang in language.data) {
            r[item][lang] = {
              required: helpers.withMessage('errors.required', required),
            }
          }
        } else
          r[item] = {
            required: helpers.withMessage('errors.required', required),
          }
      }
    }

    return r
  })

  const v$ = useVuelidate(rules, clonedValue)

  function onClone() {
    const { cloned } = useCloned(originalValue.value, { manual: true })
    clonedValue.value = cloned.value
  }

  return {
    loading,

    fieldsValue,
    originalValue,
    clonedValue,

    isUpdateValue,

    customRules,
    v$,

    onClone,
  }
}
