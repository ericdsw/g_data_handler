export default interface GenericFormSchema {
  additionalText?: string,
  parameters?: {
    [key: string]: {[key: string]: any}
  }
}