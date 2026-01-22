import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";
import PasswordInput from "../components/PasswordInput"


const Registrar = () => {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repetirPassword, setRepetirPassword] = useState('');
    const [alerta, setAlerta] = useState({})
    const handleSubmit = async e => {
        e.preventDefault();

        if ([nombre, email, password, repetirPassword].includes('')) {
            setAlerta({ msg: "Todos los campos son obligatorios", error: true })
            return;
        }
        if (password !== repetirPassword) {
            setAlerta({ msg: "Los passwords deben ser iguales", error: true })
            return;
        }
        if (password.length < 8) {
            setAlerta({ msg: "El password es demasiado corto, Tu password debe contener minimo 8 caracteres", error: true })
            return;
        }
        setAlerta({})
        try {
            await clienteAxios.post("/veterinarios", { nombre, email, password })
            setAlerta({
                msg: "Usuario Registrado exitosamente, Revisa tu Email!",
                error: false
            })
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
                <h1 className="text-indigo-500 font-black text-7xl">Crea tu Cuenta
                    <span className="text-black"> Gratis </span>
                    y Administra tus <span className="text-black">Pacientes</span> de Manera Sencilla</h1>
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
                            Nombre
                        </label>
                        <input
                            type="text"
                            placeholder="Tu nombre"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={nombre}
                            onChange={e => setNombre(e.target.value)}
                        />
                    </div>
                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-2xl font-bold">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="Tu email"
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
                            label="Password"
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
                        value="Registrar"
                        className="bg-indigo-500 w-full py-3 rounded-xl text-white uppercase font-bold
                    mt-5 hover:cursor-pointer hover:bg-indigo-800"
                    />
                </form>

                <nav className="">
                    <Link
                        className="block text-center my-5 text-indigo-500 hover:underline
                    hover:text-indigo-800"
                        to="/"
                    >¿Ya tienes una cuenta? <span className="font-bold">Logueate</span></Link>
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

export default Registrar