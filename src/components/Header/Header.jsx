import './Header.css'

import {NavLink} from 'react-router-dom'
import { useContext, useState, useEffect } from 'react'
import { HeaderContexto } from '../../context/global'
import { Overlay } from '../Overlay/Overlay'

export const Header = ()=>{

    const [header, setHeader] = useState({})
    useEffect( ()=>{

        let controller = new AbortController()
        let opciones = {
            method: 'get',
            headers: {"Content-type" : "application/json"},
            signal: controller.signal
        }

        fetch('http://localhost:2802/header', opciones)
        .then( res  => res.json() )
        .then( data => setHeader(data.data[0]))
        .catch( err => console.log(err))
        .catch( err => console.log(err))
        .finally( ()=> controller.abort())

    }, [])

    return(
        <header className="Header">
            { header.inicio  && <Inicio  {...header.inicio}  /> }
            { header.buscar  && <Buscar  {...header.buscar}  /> }
            { header.botones && <Botones {...header.botones} /> }
        </header>
    )
}

const Inicio = ({logo, ini, hoy})=>{
    return(
        <>
        <div className="Header-inicio">
            <h1 className="Header-h1">
                <NavLink to={logo.href} className="Header-aLogo btnSinActive">
                    <img {...logo} className="Header-img"/>
                </NavLink>
            </h1>
            <NavLink to={ini.href} className="Header-a">
                <span>{ini.nombre}</span>
            </NavLink>
            <NavLink to={hoy.href} className="Header-a Header-btnHoy">
                <span>{hoy.nombre}</span>
            </NavLink>
        </div>
        <Overlay />
        </>
    )
}

const Buscar = ({lupa, texto})=>{
    return(
        <div className="Header-buscar">
            <a href={lupa.href} className="Header-search">
                <img {...lupa} />
            </a>
            <input {...texto} className="Header-input" />
        </div>
    )
}

const Botones = ({btnNotf, btnMore, btnUser})=>{

    const {header, setHeader} = useContext(HeaderContexto)

    const notifHandler = ()=> setHeader({ notif: !header.notif, user:false})
    const userHandler  = ()=> setHeader({ notif:false, user: !header.user})
    
    return(
        <div className="Header-botones">
            <button onPointerDown={ notifHandler } className={`Header-btnIco ${header.notif ? 'bordeBtnIco' : ''}`}>
                <img {...btnNotf} />
            </button>  
            <button onPointerDown={ userHandler } className={`Header-btnIco ${header.user ? 'bordeBtnIco' : ''}`}>
                <img {...btnUser} />
            </button>
            <NavLink to={ btnMore.href } className="Header-btnIco">
                <img {...btnMore} />
            </NavLink>
        </div>
    )
}