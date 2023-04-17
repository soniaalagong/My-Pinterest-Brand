import { NavLink } from 'react-router-dom'
import './BtnBrown.css'

export const BtnBrown = ({href, textoBtn})=>{
    return(
        <NavLink to={href} className="BtnBrown">
            <span>{textoBtn}</span>
        </NavLink>
    )
}