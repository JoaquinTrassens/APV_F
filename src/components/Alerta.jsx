const Alerta = ({alerta}) => {
  return (
    <div className={`${alerta.error ? 'from-red-600 to-red-700' : 'from-indigo-600 to-indigo-700'} bg-linear-to-br text-center text-white p-3 rounded-2xl uppercase font-bold mt-5 mb-5`}>
        {alerta.msg}
    </div>
  )
}

export default Alerta