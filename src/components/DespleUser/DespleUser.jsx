import './DespleUser.css'

import { useContext, useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { HeaderContexto } from '../../context/global'

import { BtnBrown } from '../BtnBrown/BtnBrown'

export const DespleUser = ()=>{

    const usuarioActual = localStorage.getItem("usuario")

    const {header} = useContext(HeaderContexto)

    const [menuUser, setMenuUser] = useState({})
    useEffect( ()=>{

        let controller = new AbortController()
        let opciones = {
            method: 'get',
            headers: {"Content-type" : "application/json"},
            signal: controller.signal
        }

        fetch('http://localhost:2802/menuUser', opciones)
        .then( res  => res.json() )
        .then( data => setMenuUser(data.data[0]))
        .catch( err => console.log(err))
        .catch( err => console.log(err))
        .finally( ()=> controller.abort())

    }, [])

    return(
        <>{ menuUser && 
            <>
            { header.user && <Usuario usuarioActual={usuarioActual} {...menuUser} /> }
            </>
        }</>
    )
}

const Usuario =({usuarioActual, cuenta, premium})=>{
    return(
        <div className="DespleUser">
            <Cuenta usuarioActual={usuarioActual} {...cuenta} />
            <Premium {...premium} />
        </div>
    )
}

const Cuenta = ({usuarioActual, nombre, user})=>{
    return(
        <div className="User-cuenta">
            <h4 className="Cuenta-h4">{nombre}</h4>
            <User usuarioActual={usuarioActual} {...user} />
        </div>
    )
}

const User = ({usuarioActual, imgUser, btnClose})=>{
    return(
        <div className="Cuenta-user">
            <img {...imgUser} className="Cuenta-img"/>
            <h2 className="Cuenta-h3">{usuarioActual}</h2>   
            <NavLink to={btnClose.href} className="Cuenta-btnIco">
                <img {...btnClose.imgBtn} />
            </NavLink>                     
        </div>
    )
}


const Premium = ({nombre, ventajas, btnPremium})=>{
    return(
        <div className="User-registrate">
            <h4 className="Registrate-h4">{nombre}</h4>
            <Ventajas {...ventajas} />
            <BtnBrown {...btnPremium} />
        </div>
    )
}

const Ventajas = ({titulo, opciones})=>{
    return(
        <div className="Registrate-ventajas">
            <span>{titulo}</span>
            <ul className="Registrate-ul">
                {opciones.map( opcion => 
                    <li key={opcion.id} className="Registrate-li">{opcion.nombre}</li>
                )}
            </ul>
        </div>
    )
}