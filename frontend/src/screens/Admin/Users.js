import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import PageTitle from "../../components/PageTitle";
import { Row, Table, Button } from "react-bootstrap";
import Message from "../../components/Message";
import { getUsers } from "../../actions/userActions";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "../../actions/userActions";
const Users = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allUsers = useSelector((state) => state.users);
  const { loading, error, users } = allUsers;

  const adminUser = useSelector((state) => state.userLogin);
  const { userInfo } = adminUser;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getUsers());
    } else {
      navigate("/");
    }
  }, [dispatch, userInfo, navigate, successDelete]);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };
  return (
    <>
      <PageTitle title="Admin Users - Chowkbazaar" />
      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      {!loading && !error && (
        <>
          <Row>
            <h1>Users</h1>
          </Row>
          <Table
            striped
            bordered
            hover
            responsive
            className="table-sm text-center"
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>User Name</th>
                <th>Email</th>
                <th>Admin</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.map((user) => (
                  <tr key={user._id} className="mb-4 mt-4">
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      {user.isAdmin ? (
                        <i
                          className="fa-sharp fa-solid fa-check"
                          style={{ color: "#008000" }}
                        ></i>
                      ) : (
                        <i
                          className="fa fa-times"
                          style={{ color: "#FF0000" }}
                        ></i>
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/admin/user/${user._id}/edit`}>
                        <Button className="btn-sm" variant="light">
                          <i className="fas fa-edit"></i>
                        </Button>
                      </LinkContainer>
                      <Button
                        className="btn-sm"
                        variant="danger"
                        onClick={() => deleteUserHandler(user._id)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default Users;
