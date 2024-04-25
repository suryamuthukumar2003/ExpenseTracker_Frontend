import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Signup() {
  return (
    <div>
    <Form>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>User Name</Form.Label>
      <Form.Control type="text" placeholder="Enter UserName" className="input"/>
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Email address</Form.Label>
      <Form.Control type="email" placeholder="Enter email" className="input"/>
      <Form.Text className="text-muted">
        {`We'll never share your email with anyone else.`}
      </Form.Text>
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Password" className="input" />
    </Form.Group>
    <Button variant="primary" type="submit">
      Submit
    </Button>
  </Form>
    </div>
  )
}

export default Signup