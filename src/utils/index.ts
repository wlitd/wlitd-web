export function getEnv(key: string): string {
  const env = import.meta.env

  return env[key]
}
