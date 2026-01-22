import { useState } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa"

const PasswordInput = ({
  label = "Password",
  placeholder = "Password",
  value,
  onChange,
  maxLength = 30,
  name
}) => {
  const [mostrar, setMostrar] = useState(false)

  return (
    <div className="my-5">
      <label className="uppercase text-gray-600 block text-2xl font-bold">
        {label}
      </label>

      <div className="relative">
        <input
          type={mostrar ? "text" : "password"}
          placeholder={placeholder}
          name={name}
          className="border w-full p-3 mt-3 bg-gray-50 rounded-xl pr-12"
          value={value}
          onChange={onChange}
          maxLength={maxLength}
        />

        <button
          type="button"
          onClick={() => setMostrar(!mostrar)}
          className="absolute right-3 top-1/2 -translate-y-[10%] text-gray-500 hover:text-gray-700"
        >
          {mostrar ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
        </button>
      </div>
    </div>
  )
}

export default PasswordInput
