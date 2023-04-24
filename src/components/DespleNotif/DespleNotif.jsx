import './DespleNotif.css'

import { useContext, useState, useEffect } from 'react'
import { HeaderContexto } from '../../context/global'

export const DespleNotif = ()=>{

    const {header} = useContext(HeaderContexto)

    const [menuNotif, setMenuNotif] = useState({})
    useEffect( ()=>{

        let controller = new AbortController()
        let opciones = {
            method: 'get',
            headers: {"Content-type" : "application/json"},
            signal: controller.signal
        }

        const bbdd = /*'http://localhost:2802/menuNotif'*/ 'https://api-pinterest.vercel.app/menuNotif'

        fetch( bbdd, opciones)
        .then( res  => res.json() )
        .then( data => setMenuNotif(data.data[0]))
        .catch( err => console.log(err))
        .catch( err => console.log(err))
        .finally( ()=> controller.abort())

    }, [])

    return(
        <>{ menuNotif && 
            <>
            { header.notif && <Notificacion {...menuNotif} /> } 
            </>
        }</>
    )
}

const Notificacion = ({ titulo, imagenes, listado})=>{
    return(
        <div className="DespleNotif">
            <h3 className="Notif-h3">{titulo}</h3>
            <Figure     imagenes    = {imagenes} />
            <Article    listado     = {listado} />
        </div>
    )
}

const Figure = ({ imagenes })=>{
    return(
        <figure className="Notif-figure">
            { imagenes.map( imagen => 
                <img key={imagen.id} {...imagen} />
            )}
        </figure>
    )
}

const Article = ({listado})=>{
    return(
        <ul className="Notif-ul">
            {listado.map(frase => 
                <li key={frase.id} className="Notif-li">{frase.nombre}</li>
            )}
        </ul>
    )
}
