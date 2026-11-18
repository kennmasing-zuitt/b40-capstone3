import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label } from 'reactstrap';

const CurrentUserModal = (props) => {

const {
	modal,
	toggle,
    _id,
	firstName,
	lastName,
	username,
	email,
	onChangeModal,
	onSubmitModal
} = props

  return (
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
            <Form onSubmit={ e => onSubmitModal(e) }>
                <FormGroup>
                    <Label className="">First Name</Label>
                    <Input
                        type="text"
                        name="firstName"
                        value={firstName}
                        onChange={ e => onChangeModal(e) }
                        maxLength="20"
                        pattern="[a-zA-Z\s]+"
                    />
                </FormGroup>
                <FormGroup>
                    <Label className="">Last Name</Label>
                    <Input
                        type="text"
                        name="lastName"
                        value={lastName}
                        onChange={ e => onChangeModal(e) }
                        maxLength="20"
                        pattern="[a-zA-Z\s]+"
                    />
                </FormGroup>
                <FormGroup>
                    <Label className="">Username</Label>
                    <Input
                        type="text"
                        name="username"
                        value={username}
                        onChange={ e => onChangeModal(e) }
                        maxLength="20"
                        pattern="[a-zA-Z0-9]+"
                    />
                </FormGroup>
                <FormGroup>
                    <Label className="">Email</Label>
                    <Input
                        type="text"
                        name="email"
                        value={email}
                        onChange={ e => onChangeModal(e) }
                    />
                </FormGroup>
              <Button color="primary" className="mr-1">Update</Button>{' '}
              <Button color="secondary" onClick={()=> toggle(true, _id, firstName, lastName, username, email) }>Cancel</Button>
            </Form>
        </ModalBody>
      </Modal>
  );
}

export default CurrentUserModal;