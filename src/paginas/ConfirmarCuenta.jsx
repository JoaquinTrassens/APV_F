import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const ConfirmarCuenta = () => {
    const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
    const [cargando, setCargando] = useState(true);
    const [alerta,setAlerta] = useState({})
    const params = useParams();
    const {id} = params;
    useEffect(() =>{
      const confirmarCuenta = async () =>{
        try {
          const url = `/veterinarios/confirmar/${id}`;
          const {data} = await clienteAxios.get(url)
          setCuentaConfirmada(true);
          setAlerta({
            msg: data.msg
          })
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
        setCargando(false)
      }
      confirmarCuenta();
    }, [id])


    return (
        <>
            <div>
                <h1 className="text-indigo-500 font-black text-7xl">Confirma tu Cuenta
                    <span className="text-black"> Via Token </span>
                    y Administra tus <span className="text-black">Pacientes</span> de Manera Sencilla</h1>
            </div>

            <div className="py-10 sm:py-0 shadow-lg px-5 rounded-2xl bg-white">
                {!cargando && 
                  <Alerta
                    alerta={alerta}
                  />}

                  {cuentaConfirmada && 
                    <Link
                        className="block text-center my-5 text-indigo-500 hover:underline hover:text-indigo-800 font-bold"
                        to="/"
                    >Felicidades ya Puedes Iniciar Sesion</Link>
                  }
            </div>
        </>
    )
}

export default ConfirmarCuenta