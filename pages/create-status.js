import React, { useState } from 'react'
import auth0 from '../lib/auth0'
import axios from 'axios'


const CreateStatus = () => {

    const [dados, setDados] = useState({
        status: 'bem',
        coords: {
            lat: null,
            long: null
        }
    })


    const getMyLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {

                setDados(old => {
                    return {
                        ...old,
                        coords: {
                            lat: position.coords.latitude,
                            long: position.coords.longitude
                        }
                    }
                })
            })
        }
    }


    const onStatusChange = event => {
        const value = event.target.value
        setDados(old => {
            return {
                ...old,
                status: value
            }
        })
    }

    const save = async () => {
        await axios.post('/api/save-status', dados)

    }

    return (
        <div>
            <h1>Create Status</h1>

            <label className="block"><input type="radio" name="status" value="bem" onClick={onStatusChange} /> Estou me sentindo bem.</label>
            <label className="block"><input type="radio" name="status" value="gripe" onClick={onStatusChange} />Estou me sentindo com resfriado / gripe.</label>
            <label className="block"><input type="radio" name="status" value="covid" onClick={onStatusChange} />Estou com sintomas da COVID.</label>

            Sua posição atual: {JSON.stringify(dados)}

            <button onClick={getMyLocation}>Pegar minha localização</button>

            <button onClick={save} >Salvar meu status</button>


        </div >



    )

}


export default CreateStatus




export async function getServerSideProps({ req, res }) {
    const session = await auth0.getSession(req)

    if (session) {

        return {
            props: {
                isAuth: true,
                user: session.user,

            }
        }
    }
    console.log(session)

    return {
        props: {
            isAuth: false,
            user: {}
        }
    }
}