export const lazy = (commit, task, optimistic, enabled = false) => {
  // By default, do lazy operations only in client
  if (enabled === undefined) {
    // hack `(process as any)` to wait till this is fixed in Nuxt
    enabled = (process as any).client
  }

  // Non lazy mode
  if (!enabled) {
    return task().then(commit)
  }

  // Do real task in background
  Promise.resolve(task(optimistic))
    .then(commit)
    .catch(console.error)

  // Commit optimistic value and resolve
  return Promise.resolve(commit(optimistic))
}
