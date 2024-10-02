import type { UseFormReturn } from 'react-hook-form'
import type { FormValues } from './App'
import { useEffect, useState } from 'react'
import { useFieldArray, useWatch } from 'react-hook-form'
import useWatchCondition from './useWatchCondition'

type NumberProps = {
  name: any
  index: number
  numbers: { value: number }[]
} & Partial<UseFormReturn<FormValues>>

export function Numbers({ control, name, register, numbers, watch, index }: NumberProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  })

  //   const watchValue = watch!(value => console.log(value))

  const showAnswer = useWatchCondition(watch!, ({ data }, info) => {
    console.log({ data, curr: data?.[index]?.numbers, info })
    return data?.[index]?.numbers?.some((num) => {
      return Number.parseInt(num?.value) === 42
    })
  })

  // Re-renders on every change
  //   const isAnyNumberZero = watch?.(`data[${index}]`)?.numbers.some(({ value }) => value === 0)
  // Re-renders only when the value of the numbers array changes
  //   const isThereAnyOne = useWatch({
  //     control,
  //     name: `data[${index}].numbers`,
  //   })

  return (
    <div style={{ display: 'flex', gap: '5px' }}>
      {fields.map((data, index) => (
        <div key={data.id}>
          <input type="number" {...register(`${name}.${index}.value`)} />
          <button onClick={() => remove(index)} type="button">
            X
          </button>
        </div>
      ))}
      <button type="button" onClick={() => append({ value: 0 })}>
        Append
      </button>
      {showAnswer && 'Answer is 42'}
    </div>
  )
}
