import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addUser, updateUser, deleteUser } from "./Redux/action";

const CrudUsingRedux = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isTable, setIsTable] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData);

  useEffect(() => {
    if (userData && userData.length > 0) {
      setIsTable(true);
    }
  }, [userData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !mobileNo || !password) {
      setError("All fields are required");
      return;
    }

    if (editingIndex !== null) {
      dispatch(updateUser(editingIndex, { name, email, mobileNo, password }));
      setEditingIndex(null);
    } else {
      const newUser = {
        name: name,
        email: email,
        mobileNo: mobileNo,
        password: password,
      };
      dispatch(addUser(newUser));
    }

    setName("");
    setEmail("");
    setMobileNo("");
    setPassword("");
    setError("");
    setIsTable(true);
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
            </div>
            {error && <h6 className="text-center text-danger">{error}</h6>}
            <div className="text-center">
              <button type="">{`${
                editingIndex === 0 ? "Update" : "Submit"
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
