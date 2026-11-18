import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label } from 'reactstrap';

const UserModal = (props) => {

const {
	modal,
	toggle,
	username,
	onChangeModal,
	onSubmitModal
} = props

  return (
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
        	<Form onSubmit={ e => onSubmitModal(e) }>
        		<FormGroup>
        			<Label className="mb-3">Update Username</Label>
        			<Input
        				type="text"
        				name="username"
        				value={username}
        				onChange={ e => onChangeModal(e) }
        			/>
        		</FormGroup>
	          <Button color="primary" className="mr-1">Update</Button>{' '}
	          <Button color="secondary" onClick={()=> toggle() }>Cancel</Button>
        	</Form>
        </ModalBody>
      </Modal>
  );
}

export default UserModal;