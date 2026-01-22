import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/axios"
import useAuth from "../hooks/useAuth"
import PasswordInput from "../components/PasswordInput"


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alerta, setAlerta] = useState({})
    const { setAuth } = useAuth();
    const navigate = useNavigate()

    const handleSubmit = async e => {
        e.preventDefault()
        if ([email, password].includes('')) {
            setAlerta({
                msg: "Todos los campos son obligatorios",
                error: true
            })
            return
        }
        try {
            const { data } = await clienteAxios.post("/veterinarios/login", { email, password });
            localStorage.setItem("token", data.token)
            setAuth(data);
            setAlerta({
                msg: data.msg
            })
            navigate("/admin")
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    const { msg } = alerta;
    return (
        <>
            <div>
                <h1 className="text-indigo-500 font-black text-7xl">Inicia Sesion y Administra tus <span className="text-black">Pacientes</span></h1>
            </div>
            <div className="py-10 sm:py-0 shadow-lg px-5 rounded-2xl bg-white">
                {msg && <Alerta
                    alerta={alerta}
                />}
                <form onSubmit={handleSubmit}>
                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-2xl font-bold">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="Ingresa tu Email para ingresar"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="my-5">
                        {/* <label className="uppercase text-gray-600 block text-2xl font-bold">
                            Password
                        </label> */}
                        <PasswordInput
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />

                    </div>
                    <input
                        type="submit"
                        value="Iniciar Sesion"
                        className="bg-indigo-500 w-full py-3 rounded-xl text-white uppercase font-bold
                    mt-5 hover:cursor-pointer hover:bg-indigo-800"
                    />
                </form>
                <nav className="">
                    <Link
                        className="block text-center my-5 text-indigo-500 hover:underline
                    hover:text-indigo-800"
                        to="/registrar"
                    >¿No tienes una cuenta? <span className="font-bold">Registrate</span></Link>
                    <Link
                        className="block text-center my-5 text-indigo-500 hover:underline
                    hover:text-indigo-800"
                        to="/olvide-password"
                    >Olvide mi password</Link>
                </nav>
            </div>
        </>
    )
}

export default Login