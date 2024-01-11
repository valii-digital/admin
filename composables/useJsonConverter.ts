export const useJsonConverter = (json: any) => {
  const formData = new FormData()

  for (const key in json) {
    if (json[key] instanceof Array)
      for (const item of json[key]) {
        formData.append(`${key}[]`, item)
      }
    else formData.append(key, json[key])
  }

  return formData
}
