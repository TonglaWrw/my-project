import React, { useState, useRef, useContext, useEffect } from 'react'
import { Form, Modal, Button, Alert, Row, Col } from 'react-bootstrap'
import { AuthContext } from '../../context/Authen';

export const Additems = ({ setItem }) => {
    const [showmodal,setShowModal] = useState(false);
    const [error,setError] = useState('');
    const [images,setImages] = useState([]);
    const [imagesUrl,setImagesUrl] = useState([]);

    const Name = useRef();
    const Desc = useRef();
    const Startprice = useRef();
    const Bidprice = useRef();
    const Duration = useRef();
    const Image = useRef();

    const { currentUser } = useContext(AuthContext)

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    const imgTypes = ['image/png','image/jpeg','image/jpg'];

    useEffect(() => {
        if (images.length < 1) return;
        const newImageUrls = [];
        images.forEach(image => newImageUrls.push(URL.createObjectURL(image)));
        setImagesUrl(newImageUrls)
    }, [images])
    
    function onImageChange(e) {
        setImages([...e.target.files]);
    }

    const submitForm = async (e) => {
        e.preventDefault();
        setError('');
        setImagesUrl([]);
        if(!imgTypes.includes(Image.current.files[0].type)){
            return setError('Image type not valid!')
        }

        let hours = Math.floor((1000 * 60 * 60) * Duration.current.value)
        let currentDate = Date.now();
        let startprices = Math.floor(Startprice.current.value)
        let bidprices = Math.floor(Bidprice.current.value)
        // let dueDate = currentDate.setHours(
        //     currentDate.getHours() + hours
        // )
        let dueDate = currentDate + hours;
        let newItem = {
            email: currentUser.email,
            name: Name.current.value,
            desc: Desc.current.value,
            curPrice: startprices,
            bidPrice: bidprices,
            duration: dueDate,
            image: Image.current.files[0],
        }

        setItem(newItem);
        closeModal();
    };

  return (
  <>
    <div className='col d-flex justify-content-end mb-2'>
        <div onClick={openModal} className='btn btn-outline-secondary mx-2'>Add item</div>
    </div>
    <Modal centered show={showmodal} onHide={closeModal}>
        <form onSubmit={submitForm}>
        <Modal.Header>
            <Modal.Title>Add Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {error && <Alert variant='danger'>{error}</Alert>}
            <Row>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type='text' required ref={Name} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type='text' required ref={Desc} as="textarea" rows={3} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Start Price</Form.Label>
                        <Form.Control type='number' required ref={Startprice} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Bid Price</Form.Label>
                        <Form.Control type='number' required ref={Bidprice} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Duration / hour</Form.Label>
                        <Form.Control type='number' required ref={Duration} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Seller</Form.Label>
                        <Form.Control type='text' value={currentUser.email} readOnly />
                    </Form.Group><Form.Group className="mb-3">
                        <Form.Label>Image</Form.Label>
                        <Form.File onChange={onImageChange} label="select Image" custom required ref={Image} />
                        <div className='mt-2'>
                        { imagesUrl.map((imgSrc , idx) => (<img key={idx} width="100%" height="300" src={imgSrc} />))}
                        </div>
                    </Form.Group>
                </Col>
            </Row>
        </Modal.Body>
        <Modal.Footer>
            <Button variant='secondary' onClick={closeModal}>Cancel</Button>
            <Button variant='primary' type='submit'>Add</Button>
        </Modal.Footer>
        </form>
    </Modal>
  </>
  );
}
