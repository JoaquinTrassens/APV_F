import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";
import PasswordInput from "../components/PasswordInput";

const NuevoPassword = () => {
    const [password, setPassword] = useState('');
    const [repetirPassword, setRepetirPassword] = useState('');
    const [alerta, setAlerta] = useState({})
    const [tokenValido, setTokenValido] = useState(false)
    const [passwordNuevo, setPasswordNuevo] = useState(false)
    const params = useParams();
    const { token } = params;
    useEffect(() => {
        const comprobarToken = async () => {
            try {
                await clienteAxios.get(`/veterinarios/olvide-password/${token}`)
                setAlerta({
                    msg: "Coloca tu nuevo password"
                })
                setTokenValido(true)
            } catch (error) {
                console.log(error)
                setAlerta({
                    msg: "Hubo un error en el enlace",
                    error: true
                })
            }
        }
        comprobarToken()
    }, [token])
    const handleSubmit = async e => {
        e.preventDefault();
        if (password !== repetirPassword) {
            setAlerta({ msg: "Los passwords deben ser iguales", error: true })
            return;
        }
        if (password.length < 8) {
            setAlerta({ msg: "El password es demasiado corto, Tu password debe contener minimo 8 caracteres", error: true })
            return;
        }
        try {
            const url = `/veterinarios/olvide-password/${token}`;
            const { data } = await clienteAxios.post(url, { password })
            setAlerta({
                msg: data.msg
            })
            setPasswordNuevo(true)
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
                <h1 className="text-indigo-500 font-black text-7xl">Estas a un Solo Paso
                    <span className="text-black"> de Recuperar </span>
                    tu Cuenta</h1>
            </div>

            <div className="py-10 sm:py-0 shadow-lg px-5 rounded-2xl bg-white">
                {msg && <Alerta
                    alerta={alerta}
                />}

                {tokenValido && (
                    <>
                        <form
                            onSubmit={handleSubmit}
                        >
                            <div className="my-5">
                                {/* <label className="uppercase text-gray-600 block text-2xl font-bold">
                                    Password
                                </label> */}
                                <PasswordInput
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="my-5">
                                {/* <label className="uppercase text-gray-600 block text-2xl font-bold">
                                    Confirma tu Password
                                </label> */}
                                <PasswordInput
                                    label="Confirma tu Password"
                                    placeholder="Confirma tu password"
                                    value={repetirPassword}
                                    onChange={e => setRepetirPassword(e.target.value)}
                                />
                            </div>
                            <input
                                type="submit"
                                value="Recuperar Password"
                                className="bg-indigo-500 w-full py-3 rounded-xl text-white uppercase font-bold
                    mt-5 mb-10 hover:cursor-pointer hover:bg-indigo-800"
                            />
                        </form>
                    </>
                )}

                {passwordNuevo && <Link
                    className="block text-center my-5 text-indigo-500 hover:underline hover:text-indigo-800 font-bold"
                    to="/"
                >Iniciar Sesion</Link>}
            </div>
        </>
    )
}

export default NuevoPassword