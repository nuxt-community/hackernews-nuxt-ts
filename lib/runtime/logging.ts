// There must be a way to make a type based on the possible values.
// But, for now, its not like we'll have more than this list
const possibleLevels: string[] = ["debug", "info", "warn", "error", "fatal"]
export type LogLevel = "debug" | "info" | "warn" | "error" | "fatal"

export const levels: ReadonlyArray<string> = [...possibleLevels]

const isLogLevel = (x: any): x is LogLevel => levels.includes(x)

export const ensureValidLogLevel = (input: string): LogLevel => {
  const fallbackValue: LogLevel = "info"
  if (isLogLevel(input)) {
    return input
  }
  return fallbackValue
}
