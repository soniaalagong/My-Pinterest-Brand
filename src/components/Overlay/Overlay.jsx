import './Overlay.css'

import { useContext, useState } from 'react'
import { HeaderContexto } from '../../context/global'

export const Overlay = ()=>{
    
    const {header, setHeader} = useContext(HeaderContexto)

    /* Gestión del divOverlay para cerrar los desplegables */
    const [div, setDiv] = useState(false)
    const divHandler= ()=>{
        setHeader({notif: div, user: div})
    }
    const setFalse = ()=>{ setDiv(false)}

    return(
        <>
        { (header.notif || header.user) && setFalse &&
            <div
                onPointerDown={divHandler}
                className={`Overlay ${div ? 'ocultar' : 'mostrar'}`}>
            </div>
        }
        </>
    )
}