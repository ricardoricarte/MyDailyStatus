import React from 'react'
import login from '.././pages/api/login'


const Index = () => {
    return (

        <div className="container mx-auto text-center bg-pink-200 mt-4 min-h-screen rounded-lg">

            <div className="font-bold   text-2xl p-8 mb-24 ">
                <p>Mantenha-se protegido.<br />
                Sua comunidade também.</p>
            </div>


            <div className="font-bold  text-2xl  p-8 mb-24">
                <p>
                    Compartilhe
                    como você está.
                    </p>

            </div>

            <div className="font-bold  text-2xl  p-8 mb-24 ">

                <h1>Veja como
                pessoas a seu
                 redor estão.</h1>
            </div>







            <a href='/api/login'
                className=" py-3 px-16
            rounded 
            bg-pink-800
            font-bold
            shadow-xl
            hover:shadow-xl
            
            text-white
            
            

            
            

            
           
            
            
             ">Comece por aqui</a>




        </div>



    )
}

export default Index