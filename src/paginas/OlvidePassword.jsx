import { Link } from "react-router-dom"
import { useState } from "react"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/axios"

const OlvidePassword = () => {
    const [alerta, setAlerta] = useState({});
    const [email, setEmail] = useState('');
    const handleSubmit = async e => {
        e.preventDefault()
        if (email === "" || email.length < 8) {
            setAlerta({ msg: "El Email es obligatorio", error: true });
            return
        }
        try {
            const {data} = await clienteAxios.post("/veterinarios/olvide-password",{email})
            setAlerta({
                msg: data.msg
            })
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    }
    const {msg} = alerta

    return (
        <>
            <div>
                <h1 className="text-indigo-500 font-black text-7xl">¿Olvidaste tu Password?<span className="text-black">Recuperala Facil</span></h1>
            </div>
            <div className="py-10 sm:py-0 shadow-lg px-5 rounded-2xl bg-white">
                {msg && <Alerta
                    alerta={alerta}
                />}
                <form
                    onSubmit={handleSubmit}
                >
                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-2xl font-bold">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="Ingresa tu Email"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <input
                        type="submit"
                        value="Recuperar Password"
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
                        to="/"
                    >¿Ya tienes una cuenta? <span className="font-bold">Logueate</span></Link>
                </nav>
            </div>
        </>
    )
}

export default OlvidePassword