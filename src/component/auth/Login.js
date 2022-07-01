import React, { useState, useRef, useContext } from 'react'
import { Form, Modal, Button, Alert } from 'react-bootstrap'
import { AuthContext } from '../../context/Authen';

export const Login = () => {
    const [showmodal,setShowModal] = useState(false);
    const [error,setError] = useState('');

    const email = useRef();
    const password = useRef();

    const { login } = useContext(AuthContext);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    const submitForm = async (e) => {
        e.preventDefault();
        setError('');

        try{
            await login(email.current.value, password.current.value)
            closeModal();
        } catch (error){
            setError('Invalid login')
        }
    };

  return (
  <>
    <div onClick={openModal} className='btn btn-outline-light mx-2'>Login</div>
    <Modal centered show={showmodal} onHide={closeModal}>
        <form onSubmit={submitForm}>
        <Modal.Header>
            <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {error && <Alert variant='danger'>{error}</Alert>}
            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control type='email' required ref={email} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' required ref={password} />
            </Form.Group>
        </Modal.Body>
        <Modal.Footer>
            <Button variant='secondary' onClick={closeModal}>Cancel</Button>
            <Button variant='primary' type='submit'>Login</Button>
        </Modal.Footer>
        </form>
    </Modal>
  </>
  );
}
