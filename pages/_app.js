import React from 'react'
import '../styles/styles.css'
import Header from '../components/Header'
import Footer from '../components/Footer'

const App = ({ Component, pageProps }) => {
    return (
        <div>
            <Header />
            <div className='min-h-screen bg-gray-700 p-8 '>
                <Component {...pageProps} />
            </div>
            <div>
                <Footer />
            </div>
        </div>


    )
}

export default App