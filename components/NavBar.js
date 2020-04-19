import React from 'react'
import Link from 'next/link'


const NavLink = ({ href, children }) => {
    return (
        <Link  href={href}><a className='p-4 hover:shadow shadow-xs shadow:bg-gray-800  hover:bg-pink-200 rounded
        
        '>{children}</a></Link>
    )
}

const NavBar = () => {
    return (
        <div className='bg-gay-400 py-4 text-center font-bold mt-8 '>
            <NavLink href='/'>Inicio</NavLink> 
            <NavLink href='/about'>Sobre</NavLink> 
            <NavLink href='/register'>Cadastre-se</NavLink>
            <NavLink href='/login'>Entrar</NavLink>
        </div>




    )
}

export default NavBar