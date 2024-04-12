import React, { useState } from 'react'

const Crud = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [mobileNo, setMobileNo] = useState('')
    const [password, setPassword] = useState('')
    const [userData, setUserData] = useState([])
    const [error, setError] = useState('')
    const [view, setView] = useState(false)
    const [editingIndex, setEditingIndex] = useState(null)


    const handleSubmit = (e) => {
        e.preventDefault()

        if (!name || !email || !mobileNo || !password) {
            return setError('All fields are required')
        }

        if (editingIndex !== null) {
            const updatedUserData = [...userData]
            updatedUserData[editingIndex] = { name, email, mobileNo, password }
            setUserData(updatedUserData)
            setEditingIndex(null)
        } else {
            const newUser = {
                name: name,
                email: email,
                mobileNo: mobileNo,
                password: password
            }
            setUserData(prevUserData => [...prevUserData, newUser])
        }

        setName('')
        setEmail('')
        setMobileNo('')
        setPassword('')
        setError('')
        setView(true)
    }

    const handleEdit = (index) => {
        const selectedUserData = userData[index]
        setName(selectedUserData.name)
        setEmail(selectedUserData.email)
        setMobileNo(selectedUserData.mobileNo)
        setPassword(selectedUserData.password)
        setEditingIndex(index)
        setView(false)
    }

    const handleDelete = (index) => {
        const updatedUserData = userData.filter((el, i) => i !== index)
        setUserData(updatedUserData)
    }


    return (
        <div className='Form'>
            {!view && <div className='vh-100 d-flex justify-content-center align-items-center'>

                <form onSubmit={handleSubmit}>
                    <label className='h6' htmlFor={'name'}>Name</label>
                    <div>
                        <input type='text' id='name' value={name} onChange={(e) => { setName(e.target.value) }} />
                    </div>
                    <label className='h6' htmlFor={'email'}>Email</label>
                    <div>
                        <input type='email' id='email' value={email} onChange={(e) => { setEmail(e.target.value) }} />
                    </div>
                    <label className='h6' htmlFor={'mNo'}>Mobile Number</label>
                    <div >
                        <input type='number' id='mNo' value={mobileNo} onChange={(e) => { setMobileNo(e.target.value) }} />
                    </div>
                    <label className='h6' htmlFor={'pswd'}>Password</label>
                    <div>
                        <input type='password' id='pswd' disabled={`${editingIndex !== null ? !view : ''}`} value={password} onChange={(e) => { setPassword(e.target.value) }} />
                    </div>
                    {error && <h6 className='text-center text-danger'>{error}</h6>}
                    <div className='text-center'>
                        <button type='submit'>{`${editingIndex !== null ? 'Update' : 'Submit'}`}</button>
                    </div>
                </form>

            </div>}

            {view && <button onClick={() => { setView(!true) }}>Add New User</button>}

            {view && userData && userData.length > 0 && <div>

                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile Number</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            userData.map((el, index) => {
                                const { name, email, mobileNo } = el
                                return (
                                    <tr key={mobileNo}>
                                        <td>{name}</td>
                                        <td>{email}</td>
                                        <td>{mobileNo}</td>
                                        <td className='Edit' onClick={() => { handleEdit(index) }}>{'Edit'}</td>
                                        <td className='Delete' onClick={() => { handleDelete(index) }}>{'Delete'}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>}
        </div>
    )
}

export default Crud