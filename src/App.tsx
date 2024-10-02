import type {
  Control,
  UseFormRegister,
} from 'react-hook-form'
import {
  useFieldArray,
  useForm,
  useWatch,
} from 'react-hook-form'
import { Numbers } from './Numbers'

export interface FormValues {
  data: { name: string, numbers: { value: number }[] }[]
}

function ConditionField({
  control,
  index,
  register,
}: {
  control: Control<FormValues>
  index: number
  register: UseFormRegister<FormValues>
}) {
  const output = useWatch({
    name: 'data',
    control,
  })

  return (
    <>
      {/* Required shouldUnregister: false */}
      {output[index]?.name === 'bill' && (
        <input {...register(`data.${index}.name` as const)} />
      )}
      {/* doesn't required shouldUnregister: false */}
      <input
        name={`data[${index}].easyConditional`}
        style={{ display: output[index]?.name === 'bill' ? 'block' : 'none' }}
      />
    </>
  )
}

export function App() {
  const { control, handleSubmit, register, ...useFormRes } = useForm<FormValues>({
    defaultValues: {
      data: [{ name: 'test', numbers: [{ value: 1 }, { value: 2 }] }, { name: 'test1', numbers: [{ value: 3 }] }, { name: 'test2' }],
    },
    mode: 'onSubmit',
  })
  const { fields } = useFieldArray({
    control,
    name: 'data',
  })

  return (
    <form onSubmit={handleSubmit(data => console.log(data))} style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-start' }}>
      {fields.map((data, index) => (
        <div key={data.id} data-id={data.id}>
          <input {...register(`data.${index}.name`)} />
          <Numbers
            control={control}
            register={register}
            name={`data[${index}].numbers`}
            numbers={data.numbers}
            watch={useFormRes.watch}
            index={index}
          />
          <ConditionField register={register} control={control} index={index} />
        </div>
      ))}
      <input type="submit" />
    </form>
  )
}
