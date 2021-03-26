import React from 'react';
import { Table } from 'react-bootstrap';

const Invites = ({invites}) => {
  let responses = invites.map((inv) => {
    return (
      <tr key={inv.id}>
        <td>{inv.email}</td>
        <td>{inv.resp}</td>
      </tr>
    )
  })

  return (
    <Table striped>
      <thead>
        <tr>
          <th>Email</th>
          <th>Responses</th>
        </tr>
      </thead>
      <tbody>
        {responses}
      </tbody>
    </Table>
  )
}

export default Invites;