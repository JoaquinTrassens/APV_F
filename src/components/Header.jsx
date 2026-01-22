import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const Header = () => {
    const {cerrarSesion} = useAuth();
    const handleCerrarSesion = () => {
        const confirmar = window.confirm("¿Deseás cerrar la sesión?");
        if (confirmar) {
            cerrarSesion();
        }
    };
    return (
        <header className="py-7 bg-indigo-600">
            <div className="container mx-auto flex justify-between items-center flex-col lg:flex-row">
                <h1 className="text-4xl text-white font-black text-center">
                    APV
                </h1>
                <nav className="flex gap-4 flex-col lg:flex-row mt-5 lg:mt-0 items-center">
                    <Link 
                        to={"/admin"}
                        className="text-white text-xl uppercase"
                        >Pacientes
                    </Link>
                    <Link 
                        to={"/admin/perfil"} 
                        className="text-white text-xl uppercase"
                        >Perfil
                    </Link>
                    <button
                        type="button"
                        className="text-white text-xl uppercase cursor-pointer"
                        onClick={handleCerrarSesion}
                        >Cerrar Sesion
                    </button>
                </nav>
            </div>
        </header>
    )
}

export default Header