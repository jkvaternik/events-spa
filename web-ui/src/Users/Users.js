import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

function Users({ users, session }) {
  if (session) {
    let rows = users.map((user) => (
      <tr key={user.id}>
        <td>{user.name}</td>
        {session.email === user.email ?
          <td>
            <Link to={`/users/${user.id}/edit`}>
              Edit
            </Link>
          </td> :
          <td>
            ...
          </td>}
      </tr>
    ));

    return (
      <div>
        <Row>
          <Col>
            <h2>List Users</h2>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows}
              </tbody>
            </table>
          </Col>
        </Row>
      </div>
    );
  }
  else {
    return <h5>Log in to continue</h5>
  }
}

export default connect(({ users, session }) => ({ users, session }))(Users);