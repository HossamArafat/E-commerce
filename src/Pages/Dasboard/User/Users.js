import { USER, USERS } from "../../../API/Api";
import { useEffect, useState } from "react";
import { customAxios } from "../../../API/CustomAxios";
import { Link } from "react-router-dom";
import SharedTable from "../../../Components/Dasboard/SharedTable";


function Users() {
    // States
    const [users, setUsers] = useState([])
    const [change, setChange] = useState(false)
    const [currUser, setCurrUser] = useState('')
    const [loaded, setLoaded] = useState(false)
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);

    const [total, setTotal] = useState(0);
    const [perPage, setPerPage] = useState(0)

        const header = {
        name: ["Username", "Email", "Role", "Created", "Last Login"],
        key: ["name", "email", "role", "created_at", "updated_at"],
    }
    const metadata = {
        name: "Users",
        link: USER,
        loaded: loaded,
        currUser: currUser,
        delete: handleDelete,
        limit: limit,
        setLimit: setLimit,
        page: page,
        setPage: setPage,
        total: total,
        perPage: perPage,
        search: 'name'
    }

    const sortedUsers = [ 
        ...users.filter(user => user.role === '1995'),
        ...users.filter(user => user.role !== '1995')
    ]

    // Get All Users
    useEffect(() =>{
        setLoaded(false)
        customAxios.get(`/${USERS}?limit=${limit}&page=${page}`)
        .then((res => {
            setUsers(res.data.data)
            setTotal(res.data.total);
            setPerPage(res.data.per_page)
            setLoaded(true)
        }))
        .catch(err => console.log(err))
    }, [change, limit, page])

    // Get Current User
    useEffect(() => {
        customAxios.get(`${USER}`)
        .then((res => setCurrUser(res.data)))
        .catch(err => console.log(err))
    }, [])

    async function handleDelete(id) {
        if(currUser.id !== id) {
            try {
                await customAxios.delete(`${USER}/${id}`)
                setChange((prev) => !prev)
            }catch(err) {
                console.log(err)
            }
        } else console.log('Not Allowed')
    }

    return (
        <>
            <div className="bg-white w-100 custom-box-shadow">
                <div className="d-flex align-items-center justify-content-between mb-2">
                    <h1>Users Page</h1>
                    <Link className="btn btn-primary" to={'/dashboard/user/add'}>Add User</Link>
                </div>
                
                <SharedTable header={header} data={sortedUsers} metadata={metadata}/>
            </div>
        </>
    )
}

export default Users;