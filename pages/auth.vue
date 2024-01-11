<template>
  <div class="grid min-h-screen place-items-center p-3">
    <form
      class="grid w-full max-w-sm gap-3 rounded-xl border border-mischka p-6 dark:border-woodsmoke"
      @submit.prevent="submit()"
    >
      <h1 class="mb-5 text-4xl font-medium">Увійти</h1>

      <UInput
        v-model="state.login"
        :placeholder="'Логін'"
        :errors="v$.login.$errors"
      >
        <template #icon>
          <Icon name="solar:user-linear" />
        </template>
      </UInput>

      <UInput
        v-model="state.password"
        :placeholder="'Пароль'"
        :type="isPasswordVisible ? 'text' : 'password'"
        :errors="v$.password.$errors"
      >
        <template #icon>
          <Icon name="solar:lock-password-linear" />
        </template>

        <template #trailing>
          <div class="flex h-full cursor-pointer items-center">
            <Icon
              class="mx-auto"
              :name="
                isPasswordVisible
                  ? 'solar:eye-linear'
                  : 'solar:eye-closed-linear'
              "
              @click="isPasswordVisible = !isPasswordVisible"
            />
          </div>
        </template>
      </UInput>

      <UButton class="mt-1" type="submit" :loading="loader"> Увійти </UButton>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'

const auth = useAuth()

const loader = ref(false)
const isPasswordVisible = ref(false)

const state = ref({
  login: '',
  password: '',
})

const rules = computed(() => ({
  login: {
    required: helpers.withMessage('errors.required', required),
  },
  password: {
    required: helpers.withMessage('errors.required', required),
  },
}))

const v$ = useVuelidate(rules, state)

async function submit() {
  v$.value.$touch()
  if (v$.value.$invalid) return

  loader.value = true

  const { data } = await useApi('auth/login', {
    method: 'POST',
    body: { email: state.value.login, password: state.value.password },
  })

  if (data?.value?.access_token) auth.login(data?.value?.access_token)
  else state.value.password = ''

  loader.value = false
}
</script>
