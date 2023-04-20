import './Main.css'

import { useState, useEffect } from 'react'

export const Main = ()=>{

    const [columnas, setColumnas] = useState([])
    useEffect( ()=>{

        let controller = new AbortController()
        let opciones = {
            method: 'get',
            headers: {"Content-type" : "application/json"},
            signal: controller.signal
        }

        fetch('http://localhost:2802/columnaPines', opciones)
        .then( res  => res.json() )
        .then( data => setColumnas(data.data))
        .catch( err => console.log(err))
        .catch( err => console.log(err))
        .finally( ()=> controller.abort())

    }, [])

    return(
        <main className="Main">
            {columnas && 
                <>{columnas.map( eachPin =>
                    <MainColumna key={eachPin.id} {...eachPin} />
                )}</>
            }
        </main>
    )
}

const MainColumna = ({pin})=>{
    return(
        <div className="Main-columna">
            {pin.map( pines => 
                <Pin key={pines.id} {...pines} />
            )}
        </div>
    )
}

const Pin = ({id, mainMask, textoUsuario})=>{
    return(
        <div key={id} className="Main-pin">
            <MainMask {...mainMask}/>
            <TextoUser textoUsuario = {textoUsuario}/>
        </div>
    )
}

const MainMask = ({pin, maskSuperior})=>{
    return(
        <a className="Main-mask">
            <img {...pin} className="Mask-img" />
            <MaskSuperior {...maskSuperior}/>
        </a>
    )
}

/*El botón guardar finalmente tiene imagen imagen de un corazón para simular un like*/
const MaskSuperior = ({botonGuardar})=>{
    return(
        <div className="Mask-superior">
            <button className="Mask-btnGuardar">
                <img {...botonGuardar} className="icon"/>
            </button>
        </div>
    )
}

const TextoUser = ({textoUsuario})=>{
    return(
        <div className="Main-texto">
            <img {...textoUsuario} className="Texto-user" />
            <h2 className="Texto-h2">{textoUsuario.nombre}</h2>
        </div>
    )
}