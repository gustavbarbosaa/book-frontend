import { Input } from "../ui/input"
import { Label } from "../ui/label"

function InputForm({ label, id, placeholder, type = 'text', register, isSubmitted }) {
  return (
    <div className="w-full">
      <Label htmlFor={type} className="block text-sm font-medium text-gray-700">
        {label}
      </Label>
      <Input
        type={type}
        id={id}
        placeholder={placeholder}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        {...register({register})}
      />
      {isSubmitted && errors.email && (
        <small className="text-red-600 font-medium font-poppins p-2">{errors.email.message}</small>
      )}
    </div>
  )
}

export default InputForm