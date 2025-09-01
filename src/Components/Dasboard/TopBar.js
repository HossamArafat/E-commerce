import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../../CSS/components/bars.css'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { Menu } from '../../Context/MenuContext'
import { useContext, useEffect, useState } from 'react'
import { Dropdown, DropdownButton } from 'react-bootstrap'
import { LOGOUT, USER } from '../../API/Api'
import { customAxios } from '../../API/CustomAxios'
import Cookie from 'cookie-universal'

export default function TopBar() {
    // States
    const [name, setName] = useState('')
    const menu = useContext(Menu)
    const setIsOpen = menu.setIsOpen
    const cookie = new Cookie()

    useEffect(()=>{
        customAxios.get(`${USER}`)
        .then((data) => setName(data.data.name))
        .catch((err) => {
            console.log(err)
        })
    }, [])

    // Handle functions
    async function handleLogout() {
        try{
            await customAxios.get(`/${LOGOUT}`)
            window.location.pathname = '/'
            cookie.remove('accessToken')
        } catch(err) {
            console.log(err);
        }
    }
    return (
        <div className="top-bar d-flex align-items-center justify-content-between">
            <div className='d-flex align-items-center gap-4'>
                <h3>E-commerce</h3>
                <FontAwesomeIcon cursor={'pointer'} onClick={() => setIsOpen(value => !value)} icon={faBars} />
            </div>
            <DropdownButton variant={"none"} size='lg'  title={name}>
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </DropdownButton>
        </div>
    )
}