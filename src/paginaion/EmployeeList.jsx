import {useState, useEffect} from 'react';
import './pagination.css';

export default function EmployeeList(){
    const [newUserForm, setNewUserForm] = useState(false);
    const [formData, setFormData] = useState({
        id:'',
        username:'',
        firstName:'',
        lastName:'',
        email:''
    })
    const [spinner, setSpinner] = useState(false);
    const [usersList, setUsersList] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);

    async function getUsers(params) {
        setSpinner(true);
        await fetch('https://dummyjson.com/users')
            .then(response =>  response.json())
            .then((data) => {
                setUsersList(data.users);
                setTotal(data.total);
                setSpinner(false);
            })
            .catch(error=>console.log(error,'Error occurred'));       
    }

    useEffect(()=>{
        getUsers();
    },[]);

    const deleteUser = function(user){
        let filteredList = usersList.filter((emp)=>{
           return emp.id !== user.id;
        });
        setUsersList(filteredList);
    }

    const handleChange = function(e){
        const {name, value} = e.target;
        setFormData((prev)=>({
            ...prev ,
            [name]:value
        }))
    }

    const handleSubmit = function(e){
        e.preventDefault();
        setUsersList([{...formData,id: Date.now()}, ...usersList]);
        setFormData({id:'',
        username:'',
        firstName:'',
        lastName:'',
        email:''})
        setNewUserForm(false);
    }

    const handlePagination = function(SelectedPage){
        setPage(SelectedPage);
    }

    return(<>
        {spinner ? 
        (<div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-500"></div>) :
        <>
           {newUserForm ? (<>
           <form action="" method="post">
            <label>
                Username:
                <input onChange={(e)=>{handleChange(e)}} type="text"  name="username" value={formData.username} placeholder='Username here' id="" />
            </label>
            <label>
                First Name:
                <input onChange={(e)=>{handleChange(e)}} type="text" name="firstName" value={formData.firstName} placeholder='first name here' id="" />
            </label>
            <label>
                Last Name:
                <input onChange={(e)=>{handleChange(e)}} type="text" name="lastName" value={formData.lastName} placeholder='last name here' id="" />
            </label>
            <label>
                Email:
                <input onChange={(e)=>{handleChange(e)}} type="email" name="email" value={formData.email} placeholder='email here' id="" />
            </label>
            <button onClick={handleSubmit}>Save</button>
           </form>
           </>) : (<button className='' onClick={()=>setNewUserForm(true)}>Add New User</button>)}
            <table>
            <thead className='solid-black-border'>
                <tr>
                    <th>Id</th>
                    <th>Username</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody className='solid-black-border'>
                {usersList.length>0 && usersList.slice(page*10-10, page*10).map((user)=>{
                    return (<tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.firstName} {user.lastName}</td>
                    <td>{user.email}</td>
                    <td><button onClick={()=>{deleteUser(user)}}>delete</button></td>
                </tr>)
                })}
            </tbody>
        </table>
        <div className='pagination'>
            {page >1 && <span onClick={()=>handlePagination(page-1)}>◀️</span>}
            {
                [...Array(Math.ceil(total/10))].map((_,index)=>{
                   return <span className={page == index+1 ? 'selected_page' :''} key={index} onClick={()=>handlePagination(index+1)}>{index+1}</span>
                })
            }
            {page< (Math.ceil(total/10)) && <span onClick={()=>handlePagination(page+1)}>▶️</span>}
        </div>
        </>
        }
        
        </>)
}