import React from 'react'
import HeaderComponent from '../header/HeaderComponent'
import FooterComponent from '../footer/FooterComponent'
import { Outlet } from 'react-router-dom'


const LayoutComponent: React.FC = () => {
    return (
        <>
            <HeaderComponent/>
            <div className="container">
                <div className="mt-3">
                    <main>
                        <Outlet/>
                    </main>
                    <FooterComponent/>
                </div>
            </div>
        </>

    )
}

export default LayoutComponent