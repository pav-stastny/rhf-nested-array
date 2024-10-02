import type { DeepPartial, EventType, FieldPath, FieldValues, UseFormWatch } from 'react-hook-form'
import { useEffect, useState } from 'react'

type CallbackType<T extends FieldValues> = (value: DeepPartial<T>, info: {
  name?: FieldPath<T>
  type?: EventType
  values?: unknown
}) => boolean

function useWatchCondition<T extends FieldValues>(watch: UseFormWatch<T>, callback: CallbackType<T>) {
  const [result, setResult] = useState(false)

  useEffect(() => {
    const { unsubscribe } = watch((value, info) => {
      setResult(callback(value, info))
    })

    return () => unsubscribe()
  }, [watch, callback])

  return result
}

export default useWatchCondition
