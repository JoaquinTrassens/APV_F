import { Outlet, Navigate } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"
import useAuth from "../hooks/useAuth"

const RutaProtegida = () => {
    const {auth,cargando} = useAuth()
    if(cargando) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
    </div>
  )

    return (
        <>
            <Header/>
                {auth?._id ? (
                    <main className="container mx-auto mt-10">
                        <Outlet/> 
                    </main>
                ): <Navigate to="/" />}
            <Footer/>
        </>
    )
}

export default RutaProtegida