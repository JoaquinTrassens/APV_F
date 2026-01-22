import { useState } from "react"
import AdminNav from "../components/AdminNav"
import Alerta from "../components/Alerta"
import useAuth from "../hooks/useAuth"
import PasswordInput from "../components/PasswordInput"
const CambiarPassword = () => {
  const { guardarPassword } = useAuth()
  const [alerta, setAlerta] = useState({})
  const [password, setPassword] = useState({
    pwd_actual: "",
    pwd_nuevo: ""
  })
  const handleSubmit = async e => {
    e.preventDefault()

    if (Object.values(password).some(campo => campo === "")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true
      })
      return
    }

    if (password.pwd_nuevo.length < 8) {
      setAlerta({
        msg: "El Password debe contener al menos 8 Caracteres",
        error: true
      })
      return
    }
    const respuesta = await guardarPassword(password)
    setAlerta(respuesta)
  }
  const { msg } = alerta

  return (
    <>
      <AdminNav />
      <h2
        className="font-black text-3xl text-center mt-10"
      >Cambiar Password</h2>
      <p
        className="text-xl mt-5 mb-10 text-center"
      >Modifica tu {""}
        <span
          className="text-indigo-600 font-bold"
        >Password Aqui
        </span>
      </p>

      <div className="flex justify-center">
        <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
          {msg && <Alerta alerta={alerta} />}
          <form
            onSubmit={handleSubmit}
          >
            <div className="my-3">
              {/* <label
                className="uppercase font-bold text-gray-600"
              >Password Actual
              </label> */}
              <PasswordInput
                label="Password Actual"
                name="pwd_actual"
                placeholder="Coloca aquí tu password actual"
                value={password.pwd_actual}
                onChange={e =>
                  setPassword({
                    ...password,
                    [e.target.name]: e.target.value
                  })
                }
              />
            </div>

            <div className="my-3">
              {/* <label
                className="uppercase font-bold text-gray-600"
              >Nuevo Password
              </label> */}
              <PasswordInput
                label="Nuevo Password"
                name="pwd_nuevo"
                placeholder="Coloca aquí tu nuevo password"
                value={password.pwd_nuevo}
                onChange={e =>
                  setPassword({
                    ...password,
                    [e.target.name]: e.target.value
                  })
                }
              />
            </div>

            <input
              type="submit"
              value={"Actualizar Password"}
              className="bg-indigo-600 hover:bg-indigo-700 px-10 py-3 font-bold text-white
              rounded-lg uppercase w-full mt-5 cursor-pointer"
            />
          </form>
        </div>
      </div>
    </>
  )
}

export default CambiarPassword