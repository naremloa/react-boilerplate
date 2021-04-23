type Props = {
  name?: string,
  onInput: (e: any) => void
}

export default function NInput({
  name,
  onInput,
}: Props) {
  return (
    <input value={name} onInput={onInput} />
  )
}