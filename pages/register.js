import React from 'react'

const Register = () => {
    return (

        <div className="container mx-auto text-center mt-4">

            {/* <div className="text-center font-bold text-2xl text-white bg-pink-900 border-1 rounded-lg">
                
            </div> */}

            <a className="px-12 py-4 bg-pink-900 border-1 rounded-lg text-2xl font-bold text-white" href="/api/login">Clique aqui para se cadastrar</a>


            <div className="py-24 text-3xl mt-12 text-white border-1 rounded-lg bg-pink-900">
                <p>Neste sistema estamos utilizando a autenticação do Auth0. <br /> Não se preocupe é totalmente seguro, faça o seu cadastro agora mesmo. ;)</p>
            </div>

        </div>
    )

}

export default Register