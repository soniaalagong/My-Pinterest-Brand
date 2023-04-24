import './Inicio.css'

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const Inicio = ()=>{

    const [inicio, setInicio] = useState({})
    useEffect( ()=>{

        let controller = new AbortController()
        let opciones = {
            method: 'get',
            headers: {"Content-type" : "application/json"},
            signal: controller.signal
        }

        const bbdd = /*'http://localhost:2802/inicio'*/ 'https://api-pinterest.vercel.app/inicio'

        fetch( bbdd, opciones)
        .then( res  => res.json() )
        .then( data => setInicio(data.data[0]))
        .catch( err => console.log(err))
        .catch( err => console.log(err))
        .finally( ()=> controller.abort())

    }, [])


    return(
        <div className="Inicio">
            { inicio.titulo && <h2 className="Inicio-h2">{inicio.titulo}</h2>}
            { inicio.subtitulo && <h1 className="Inicio-h1">{inicio.subtitulo}</h1>}
            { inicio.login && <Login {...inicio.login} {...inicio.error}/>}
        </div>
    )
}

const Login = ({titulo, userName, contra, textBienvenida, textBtn, texto1, texto2, boton})=>{
    
    const navegar = useNavigate()

    const [error, setError] = useState(false)

    const [login, setLogin] = useState({
        userName: '',
        contra:''
    })
    const inputHandler = ({target}) =>{
        const {name, value} = target
        setLogin({...login, [name] : value})
    }
    const formHandler = (e)=>{
        e.preventDefault()
        
        let controller = new AbortController()

        let options = {
            method: 'post', 
            signal: controller.signal,
            headers: { "Content-type":"application/json" },
            body: JSON.stringify(login)
        }

        fetch('http://localhost:2802/login', options)
        .then( res  => res.json())
        .then( data => {
            if(data.data.login){
                localStorage.setItem("usuario", data.data.usuario)
                navegar('/all/main') 
                console.log(localStorage)
            } else{
                setError(true)
            }
        })
        .catch( err => console.log(err))
        .finally( ()=> controller.abort())
    }

    const btnHandler = ()=>{
        setError(false)
    }

    const lista1 = texto1.split('<br/>')
    const lista2 = texto2.split('<br/>')

    return(
        <form onSubmit={formHandler} className="Form-inicio">
            <h2 className="Form-h2">{titulo}</h2>

            <label className="Form-label" htmlFor="idName">{userName.textUser}</label>
            <input className="Form-name"
                type="text" 
                name="userName"
                id="idName"
                placeholder={userName.placeHUser}
                value={login.userName}
                onChange={inputHandler} />

            <label className="Form-label" htmlFor="idContra">{contra.textContra}</label>
            <input className="Form-name"
                type="password" 
                name="contra"
                id="idContra"
                placeholder={contra.placeHContra}
                value={login.contra}
                onChange={inputHandler} />

            <h2 className="Form-relleno">{textBienvenida}</h2>
            <input className="Form-btnEnviar"
                type="submit"
                value ={textBtn} />
        
            { error &&
                <div className="Error-Login">
                    <div className="Error-central">
                        <p className="Inicio-h2">{lista1[0]} <br/> {lista1[1]}</p>
                        <p className="Inicio-h2 espacio">{lista2[0]} <br/> {lista2[1]}</p>
                        <button onPointerDown={ btnHandler } className="Error-btnIco">
                            <img {...boton}/>
                        </button>
                    </div>                   
                </div>}
        </form>
    )
}