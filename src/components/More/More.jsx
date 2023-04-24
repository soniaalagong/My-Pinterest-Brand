import './More.css'
import '../BtnBrown/BtnBrown.css'

import { useState, useEffect, useContext } from 'react'
import { UsersContexto } from '../../context/global'

export const More = ()=>{

    const [sectionMore, setSectionMore] = useState({})
    useEffect( ()=>{

        let controller = new AbortController()
        let opciones = {
            method: 'get',
            headers: {"Content-type" : "application/json"},
            signal: controller.signal
        }

        const bbdd = /*'http://localhost:2802/sectionMore'*/ 'https://api-pinterest.vercel.app/sectionMore'

        fetch( bbdd, opciones)
        .then( res  => res.json() )
        .then( data => setSectionMore(data.data[0]))
        .catch( err => console.log(err))
        .catch( err => console.log(err))
        .finally( ()=> controller.abort())

    }, [])

    return(
        
        <main className="More">
            { sectionMore.titulo     && <h3 className="More-h3">{sectionMore.titulo}</h3>}             
            { sectionMore.subtitulo  && <h2 className="More-h2">{sectionMore.subtitulo}</h2>}                
            { sectionMore.formulario && <Formulario {...sectionMore.formulario} />}
        </main>
        
    )
}

const Formulario = ({ userEditar, userActuales, userNuevos, botones })=>{

    /*FORMULARIO*/
    const [actuales, setActuales] = useState()
    const [nuevo, setNuevo] = useState({
        nombre: '',
        apellido: ''
    })
    const [edit, setEditar] = useState({
        _id:'',
        nombre:'',
        apellido:''
    })
    
    /*Mostrar*/
    useEffect( ()=>{

        let controller = new AbortController()
        let opciones = {
            method: 'get',
            headers: {"Content-type" : "application/json"},
            signal: controller.signal
        }

        const bbdd = /*'http://localhost:2802/users'*/ 'https://api-pinterest.vercel.app/users'

        fetch( bbdd, opciones)
        .then( res  => res.json())
        .then( data => setActuales(data))
        .catch( err => console.log(err))
        .finally( ()=> controller.abort())
    }, [])

    /*Actualizar*/
    const editarBtnHandler = (_id)=>{
        const buscar = actuales.find( user => user._id === _id)
        setEditar(buscar)
    }

    const editarHandler = ({target})=>{
        const {name, value} = target
        setEditar({...edit, [name]:value})
    }

    const formEditarHandler = (e)=>{
        e.preventDefault();

        let controller = new AbortController()
        let opciones = {
            method: 'put',
            headers: {"Content-type" : "application/json"},
            signal: controller.signal,
            body: JSON.stringify(edit)
        }
      
        const bbdd = /*'http://localhost:2802/users'*/ 'https://api-pinterest.vercel.app/users'

        fetch( bbdd, opciones) 
        .then( res  => res.json() )
        .then( data => setActuales(data))
        .catch( err => console.log(err))          
        .finally( ()=> controller.abort())
    }

    /*Insertar*/
    const insertarHandler = ({target}) =>{
        const {name, value} = target
        setNuevo({...nuevo, [name]:value})
    }

    const formInsertarHandler = (e)=>{
        e.preventDefault();

        let options = {
            method: 'post',
            headers: {"Content-type" : "application/json"},
            body: JSON.stringify(nuevo)
        }

        const bbdd = /*'http://localhost:2802/users'*/ 'https://api-pinterest.vercel.app/users'

        fetch( bbdd, options)
        .then( res  => res.json() )
        .then( data => setActuales(data))
        .catch( err => console.log(err))
    }

    /*Eliminar*/
    const eliminarHandler = (_id)=>{

        let controller = new AbortController()
        let opciones = {
            method: 'delete',
            headers: {"Content-type" : "application/json"},
            signal: controller.signal
        }
      
        const bbdd = /*'http://localhost:2802/users'*/ 'https://api-pinterest.vercel.app/users'

        fetch( bbdd + '/' + `${_id}`, opciones) 
        .then( res  => res.json() )
        .then( data => setActuales(data))
        .catch( err => console.log(err))
        .finally( ()=> controller.abort())
    }

    /*BOTONES TAB*/
    const [buttons, setBtnNuevo] = useState({
        btnNuevo: true,
        btnEdit: false
    })
    const btnNuevoHandler = (valor1, valor2)=>{
        setBtnNuevo({btnNuevo: valor1, btnEdit: valor2})
        console.log({btnNuevo: valor1, btnEdit: valor2})
    }

    return(

        <UsersContexto.Provider value={ {
            actuales,
            eliminarHandler,
            editarBtnHandler,

            nuevo,
            insertarHandler,
            formInsertarHandler,

            edit,
            editarHandler,
            formEditarHandler,

            buttons
        }}>

        <div className="Formulario">
            
            <UserActuales {...userActuales}/>
            <div className="Formulario-botones">
                <button onPointerDown={ ()=>btnNuevoHandler(true, false)} className={`Formulario-btn ${buttons.btnNuevo ? '' : 'clicado'}`}>{botones.txtBtnNuevo}</button>
                <button onPointerDown={ ()=>btnNuevoHandler(false, true)} className={`Formulario-btn ${buttons.btnEdit ? '' : 'clicado'}`}>{botones.txtBtnEdit}</button>
            </div>
            <div className="Formulario-tab"> 
                <UserEditar {...userEditar} />
                <UserNuevos {...userNuevos} />
            </div>                   
        </div>
        </UsersContexto.Provider>
        
    )
}

const UserActuales = ({titulo, btnEdit, btnDelet})=>{

    const { actuales, editarBtnHandler, eliminarHandler } = useContext(UsersContexto)

    return(
        <div className="Div-actuales">
            <h4 className="Div-h4">{titulo}</h4>
            <ul className="Actual-lista">
                { actuales && actuales.map( ({_id, nombre, apellido}) => 
                <li key={_id} className="Actual-user">
                    <span className="Actual-nombre">{nombre} {apellido}</span>
                    <div className="Actual-botones">
                        <button onPointerDown={ ()=> editarBtnHandler(_id)} className="Actual-btnIco">
                            <img {...btnEdit} />
                        </button>
                        <button onPointerDown={ ()=> eliminarHandler(_id)} className="Actual-btnIco">
                            <img {...btnDelet} />
                        </button> 
                    </div>                   
                </li>)}
            </ul>  
        </div>
    )
}

const UserEditar = ({titulo, datos, textBtn})=>{

    const { edit, editarHandler, formEditarHandler, buttons } = useContext(UsersContexto)

    return(
        <div className={`Div-editar ${buttons.btnEdit ? 'mostrar' : 'ocultar'}`}>
                <h4 className="Div-h4">{titulo}</h4>
                <form onSubmit={ formEditarHandler } className="Nuevo-form">  
                    <div className="Nuevo-div">
                        <div className="Form-nombre">
                            <label className="Label-nombre" htmlFor="idNombre">{datos.textNombre}</label>
                            <input
                                className="Input-nombre"
                                type="text"
                                name="nombre"
                                id="idNombre"
                                placeholder="Nombre"
                                value={edit.nombre}
                                onChange={ editarHandler } />
                        </div>      
                        <div className="Form-apell">
                            <label className="Label-nombre" htmlFor="idApellido">{datos.textApellido}</label>
                            <input
                                className="Input-nombre"
                                type="text"
                                name="apellido"
                                id="idApellido"
                                placeholder="Apellido"
                                value={edit.apellido}
                                onChange={ editarHandler } />
                        </div>
                    </div> 
                    <input className="BtnBrown" type="submit" value={textBtn} />
                </form>
            </div>
    )
}

const UserNuevos = ({titulo, datos, textBtn})=>{

    const {nuevo, insertarHandler, formInsertarHandler, buttons } = useContext(UsersContexto)

    return(
        <div className={`Div-nuevo ${buttons.btnNuevo ? 'mostrar' : 'ocultar'}`}>
            <h4 className="Div-h4">{titulo}</h4>
            <form onSubmit={ formInsertarHandler } className="Nuevo-form">  
                <div className="Nuevo-div">
                    <div className="Form-nombre">
                        <label className="Label-nombre" htmlFor="idNombre">{datos.textNombre}</label>
                        <input
                            className="Input-nombre"
                            type="text"
                            name="nombre"
                            id="idNombre"
                            placeholder="Nombre"
                            value={nuevo.nombre}
                            onChange={ insertarHandler } />
                    </div>      
                    <div className="Form-apell">
                        <label className="Label-nombre" htmlFor="idApellido">{datos.textApellido}</label>
                        <input
                            className="Input-nombre"
                            type="text"
                            name="apellido"
                            id="idApellido"
                            placeholder="Apellido"
                            value={nuevo.apellido}
                            onChange={ insertarHandler } />
                    </div>
                </div> 
                <input className="BtnBrown" type="submit" value={textBtn} />
            </form>
        </div>
    )
}