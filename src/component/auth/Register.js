import React, { useState, useRef, useContext } from 'react'
import { Form, Modal, Button, Alert } from 'react-bootstrap'
import { AuthContext } from '../../context/Authen';

export const Register = () => {
    const [showmodal,setShowModal] = useState(false);
    const [error,setError] = useState('');

    const email = useRef();
    const password = useRef();
    const cnfpassword = useRef();

    const { register } = useContext(AuthContext);

    const openModal = () => setShowModal(true);
    const closeModal = () => {
        setError('');
        setShowModal(false);
    }

    const submitForm = async (e) => {
        e.preventDefault();
        setError('');
        if (password.current.value !== cnfpassword.current.value) {
            return setError('Password does not match!')
        }

       try{
        await register(email.current.value, password.current.value);
        closeModal();
       } catch (error){
        setError(error.message)
       }
    };

  return (
  <>
    <div onClick={openModal} className='btn btn-outline-light mx-2'>Register</div>
    <Modal centered show={showmodal} onHide={closeModal}>
        <form onSubmit={submitForm}>
        <Modal.Header>
            <Modal.Title>Register</Modal.Title>
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
            <Form.Group>                
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type='password' required ref={cnfpassword} />
            </Form.Group>
        </Modal.Body>
        <Modal.Footer>
            <Button variant='secondary' onClick={closeModal}>Cancel</Button>
            <Button variant='primary' type='submit'>Register</Button>
        </Modal.Footer>
        </form>
    </Modal>
  </>
  );
}
