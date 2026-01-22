import { Outlet } from "react-router-dom"

const AuthLayout = () => {
  return (
    <>
        <main className="px-6 container mx-auto lg:grid lg:grid-cols-2 mt-24 items-center">
            <Outlet/>
        </main>
    </>
  )
}

export default AuthLayout
