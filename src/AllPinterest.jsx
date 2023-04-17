import { HeaderContexto } from './context/global'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'

import { Header } from './components/Header/Header'
import { DespleNotif } from './components/DespleNotif/DespleNotif'
import { DespleUser } from './components/DespleUser/DespleUser'


export const AllPinterest = ()=>{

    const [header, setHeader] = useState({
        notif: false,
        user: false,
    })

    return(
        <HeaderContexto.Provider value={{header, setHeader}}>
            <>
            <Header />
            <DespleNotif />
            <DespleUser />
            <Outlet />
            </>
        </HeaderContexto.Provider>
    )
}