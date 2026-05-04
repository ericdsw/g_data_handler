interface GenericFormField {
  label: string,
  type: string,
  required: boolean
}

export default interface GenericFormSchema {
  additionalText?: string,
  parameters?: {[key: string]: {[key: string]: any} }
}