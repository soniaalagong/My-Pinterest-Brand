import './Hoy.css'

import { BtnBrown } from '../BtnBrown/BtnBrown'
import { useState, useEffect } from 'react'

export const Hoy = ()=>{

    const [sectionHoy, setSectionHoy] = useState({})
    useEffect( ()=>{

        let controller = new AbortController()
        let opciones = {
            method: 'get',
            headers: {"Content-type" : "application/json"},
            signal: controller.signal
        }

        const bbdd = /*'http://localhost:2802/sectionHoy'*/ 'https://api-pinterest.vercel.app/sectionHoy'

        fetch( bbdd, opciones)
        .then( res  => res.json() )
        .then( data => setSectionHoy(data.data[0]))
        .catch( err => console.log(err))
        .catch( err => console.log(err))
        .finally( ()=> controller.abort())

    }, [])

    return(
        <main className="Hoy">
            { sectionHoy.filaInspo && 
                <>{ sectionHoy.filaInspo.map( fila => 
                    <FilaInspo key={fila.id} {...fila} /> 
                )}</>
            }
            { sectionHoy.sectionFin && <SectionFin {...sectionHoy.sectionFin} />}
        </main>
    )
}

const FilaInspo = ({titulo, novedad})=>{
    return(
        <>
        <h1 className="Hoy-h1">{titulo}</h1>
        <Novedad novedad={novedad} /> 
        </>        
    )
}

const Novedad = ({ novedad })=>{
    return(
        <div className="Hoy-novedades">
            { novedad.map( idea => 
                <Idea key={idea.id} {...idea} />
            )}
        </div> 
    )
}

const Idea = ({ id, src, alt, nombre })=>{
    return(
        <div key={id} className="Hoy-novedad">
            <figure className="Novedad-figure">
                <img src={src} alt={alt} />
            </figure>
            <span className="Novedad-texto">{nombre}</span>
        </div>
    )
}

const SectionFin = ({ src, alt, textoFin, textoRegistro, btnInicio })=>{
    return(
        <div className="Novedad-fin">
            <img src={src} alt={alt} />
            <span>{textoFin}</span>
            <h3 className="Novedad-h3">{textoRegistro}</h3>
            <BtnBrown {...btnInicio} />
        </div>
    )
}