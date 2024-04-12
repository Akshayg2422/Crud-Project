import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addUser, updateUser, deleteUser } from "../Redux/action";
import '../App.css'
import * as Yup from 'yup'

const CrudUsingRedux = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setErrors] = useState({});
  const [isTable, setIsTable] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData);

  useEffect(() => {
    if (userData && userData.length > 0) {
      setIsTable(true);
    }
  }, [userData]);

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is Required'),
    email: Yup.string().required('Email is Required').email('Invalid Format'),
    mobileNo: Yup.string().matches(/^\d{10}$/, 'Mobile number must be 10 digits'),
    password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters')
  })

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate({
        name, email, mobileNo, password
      }, { abortEarly: false })

      // If editingIndex is not null, update the user, otherwise add a new user
      if (editingIndex !== null) {
        dispatch(updateUser(editingIndex, { name, email, mobileNo, password }));
        setEditingIndex(null);
      } else {
        const newUser = {
          name, email, mobileNo, password
        };
        dispatch(addUser(newUser));
      }

      // Clear form fields and errors
      setName("");
      setEmail("");
      setMobileNo("");
      setPassword("");
      setErrors("");
      setIsTable(true);
    } catch (error) {
      // If validation fails, set errors
      const newError = {};
      error.inner.forEach(err => {
        newError[err.path] = err.message;
      });
      setErrors(newError);
    }
  };

  const handleEdit = (index) => {
    const selectedUserData = userData[index];
    setName(selectedUserData.name);
    setEmail(selectedUserData.email);
    setMobileNo(selectedUserData.mobileNo);
    setPassword(selectedUserData.password);
    setEditingIndex(index);
    setIsTable(false);
  };

  const handleDelete = (index) => {
    dispatch(deleteUser(index));
  };

  const firstLetterToUpperCase = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <>
      {!isTable && (
        <div className="vh-100 d-flex justify-content-center align-items-center">
          <form onSubmit={handleSubmit}>
            <label className="h6" htmlFor={"name"}>
              Name
            </label>
            <div>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              {error.name && <div className="text-danger">{error.name}</div>}
            </div>
            <label className="h6" htmlFor={"email"}>
              Email
            </label>
            <div>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              {error.email && <div className="text-danger">{error.email}</div>}
            </div>
            <label className="h6" htmlFor={"mNo"}>
              Mobile Number
            </label>
            <div>
              <input
                type="number"
                id="mNo"
                value={mobileNo}
                onChange={(e) => {
                  setMobileNo(e.target.value);
                }}
              />
              {error.mobileNo && <div className="text-danger">{error.mobileNo}</div>}
            </div>
            <label className="h6" htmlFor={"pswd"}>
              Password
            </label>
            <div>
              <input
                type="password"
                id="pswd"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              {error.password && <div className="text-danger">{error.password}</div>}
            </div>

            <div className="text-center">
              <button type="">{`${editingIndex !== null ? "Update" : "Submit"
                }`}</button>
            </div>
          </form>
        </div>
      )}

      <div className={"ml-3"}>
        {isTable && (
          <button
            onClick={() => {
              setIsTable(!true);
            }}
          >
            Add New User
          </button>
        )}
      </div>

      {isTable && userData && userData.length > 0 && (
        <div>
          <div className="mx-3">
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
                {userData &&
                  userData.length > 0 &&
                  userData.map((el, index) => {
                    const { name, email, mobileNo } = el;
                    return (
                      <tr key={mobileNo}>
                        <td>{firstLetterToUpperCase(name)}</td>
                        <td>{email}</td>
                        <td>{mobileNo}</td>
                        <td
                          className="Edit"
                          onClick={() => {
                            handleEdit(index);
                          }}
                        >
                          {"Edit"}
                        </td>
                        <td
                          className="Delete"
                          onClick={() => {
                            handleDelete(index);
                          }}
                        >
                          {"Delete"}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default CrudUsingRedux;
