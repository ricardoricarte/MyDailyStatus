import React, { useEffect } from 'react'
import auth0 from '../lib/auth0'
import router from 'next/router'

import Map from '../components/Map'



import { getDistance } from '../lib/geo'

import { db } from '../lib/db'


const App = (props) => {

    useEffect(() => {
        if (!props.isAuth) {
            router.push('/')
        } else if (props.forceCreate) {
            router.push('/create-status')
        }
    })

    if (!props.isAuth || props.forceCreate) {
        return null
    }


    return (
        <div className="mx-20 text-center bg-pink-200 min-h-screen rounded">

            <div className=" text-xl mx-20 text-center mt-8 mb-12 ">
                <h1>Status próximos a você:</h1>
                <a href="/api/logout">SAIR</a>
            </div>

            <table class="table-fixed border-2 border-pink-800 m-auto ">
                <thead>
                    <tr >
                        <th class="px-4 py-2">Veja o seu Status</th>
                        <th class="px-4 py-2">Status</th>
                        {/* <th>coordenadas</th> */}
                        <th class="px-4 py-2">Distância em KM</th>


                    </tr>

                </thead>
                {props.checkins.map(checkin => {
                    return (
                        <tr >
                            <td class="border px-4 py-2 text-center">{checkin.id === props.user.sub && 'Você está'}</td>
                            <td class="border px-4 py-2 text-center">{checkin.status}</td>
                            {/* <td class="border px-4 py-2 text-center">{JSON.stringify(checkin.coords)}</td> */}
                            <td class="border px-4 py-2 text-center">{checkin.distance}</td>
                        </tr>



                    )
                })}

            </table>

            {/* <pre>{JSON.stringify(props, null, 2)}</pre> */}



            <Map />
        </div>





    )
}

export default App

export async function getServerSideProps({ req, res }) {
    const session = await auth0.getSession(req)

    if (session) {


        const today = new Date()
        const currentDate = today.getFullYear() + '-' + today.getMonth() + '-' + today.getDate()

        const todaysCheckin =
            await
                db
                    .collection('markers')
                    .doc(currentDate)
                    .collection('checks')
                    .doc(session.user.sub)
                    .get()

        const todaysData = todaysCheckin.data()
        //console.log(todaysData.coordinates)

        let forceCreate = true


        if (todaysData) {
            //pode ver os outros checkin
            forceCreate = false

            const checkins = await db.collection('markers')
                .doc(currentDate)
                .collection('checks')
                .near({
                    center: todaysData.coordinates,
                    radius: 1000
                }).get()

            const checkinsList = []


            checkins.docs.forEach(doc => {
                //console.log(doc.id, doc.data())
                checkinsList.push({
                    id: doc.id,
                    status: doc.data().status,
                    coords: {
                        lat: doc.data().coordinates.latitude,
                        long: doc.data().coordinates.longitude
                    },
                    distance: getDistance(
                        todaysData.coordinates.latitude,
                        todaysData.coordinates.longitude,
                        doc.data().coordinates.latitude,
                        doc.data().coordinates.longitude,

                    ).toFixed(2)

                })
            })
            return {
                props: {
                    isAuth: true,
                    user: session.user,
                    forceCreate: false,
                    checkins: checkinsList
                }
            }

        }



        return {
            props: {
                isAuth: true,
                user: session.user,
                forceCreate
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