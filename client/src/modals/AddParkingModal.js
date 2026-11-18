import React, { Fragment } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, Table, Spinner } from 'reactstrap';
import Swal from 'sweetalert2';

const AddParkingModal = (props) => {

const {
    modal,
    setModal,
    parking,
    toggle,
    _id,
    name,
    isArchived,
    onChangeModal,
    updateParking,
    archiveParking,
    deleteParking,
    buildingId,
    GET_PARKINGS_BY_BUILDING,
    setLoading,
    parksByBldgLoading,
    modalData,
    setModalData
} = props

const onClickArchiveHandler = async (e) => {
  e.preventDefault();
  try{
    await archiveParking({
      variables: {
        _id,
        isArchived: !parking.isArchived
      },
      refetchQueries: [
        {
          query: GET_PARKINGS_BY_BUILDING,
          variables: {
            buildingId
          }
        }
      ]
    })
    if(parksByBldgLoading) return <Spinner color="primary" />
    toggle(false, _id, name)
    Swal.fire({
      title: "Success",
      text: `"${parking.name.toUpperCase()}" is ${parking.isArchived ? "Activated" : "Archived"}`,
      icon: "success",
      showConfirmationButton: false,
      timer: 1500
    })
  } catch(e) {
    console.log(e)
    //SWAL ERROR
  }
}

const onClickDeleteHandler = (e) => {
  e.preventDefault();
  Swal.fire({
    icon: "question",
    title: "Delete Parking",
    text: `Are you sure you want to delete "${parking.name.toUpperCase()}"`,
    focusConfirm: false,
    showCloseButton: true
  }).then(async response => {

    if(response.value){
      setLoading(true)
      await deleteParking({
        variables: {
          _id
        },
        refetchQueries: [
          {
            query: GET_PARKINGS_BY_BUILDING,
            variables: {
              buildingId
            }
          }
        ]
      })
      setLoading(false)
      Swal.fire({
        title: "Success",
        text: `"${parking.name.toUpperCase()}" Deleted`,
        icon: "success",
        showConfirmationButton: false,
        timer: 2250
      })
    }
  })
}

  const onSubmitModal = async (e) => {
    e.preventDefault()
    props.setLoading(true)
    try {
      await updateParking({
        variables: {...modalData},
        refetchQueries: [
          {
            query: GET_PARKINGS_BY_BUILDING,
            variables: {
              buildingId
            }
          }
        ]
      })
      Swal.fire({
        title: "Success",
            text: `"${name.toUpperCase()}" Updated.`,
            icon: "success",
            showConfirmationButton: false,
            timer: 2250       
      })
      setModalData({
        _id: "",
        name: ""
      })
      props.setLoading(false)
      setModal(!modal)
    } catch(e) {
      props.setLoading(false)
      console.log(e)
      //SWAL ERROR
    }

  } 

  let archival = ""
  if(parking.isArchived == false) {
     archival = (
      <Button className="mb-1 btn btn-sm btn-block btn-success btn-block" onClick={ e => onClickArchiveHandler(e) } ><i class="fas fa-archive"></i>&nbsp;&nbsp; ACTIVE </Button>
    )
  } else {
    archival =(
      <Button className="mb-1 btn btn-sm btn-block btn-secondary btn-block" onClick={ e => onClickArchiveHandler(e) } ><i class="fas fa-archive"></i>&nbsp;&nbsp;  ARCHIVED </Button>
    )
  }

  return (
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>UPDATE PARKING MODAL</ModalHeader>
        <ModalBody>
          <Form onSubmit={ e => onSubmitModal(e) }>
            <FormGroup>
              <Label className="mb-3">Name</Label>
              <Input
                type="text"
                name="name"
                value={name}
                onChange={ e => onChangeModal(e) }
              />
            </FormGroup>
            <Table className="">
                <thead>
                    <th>ACTIONS</th>
                </thead>
                <tbody>
                  <tr>
                    <td className="md-12 no-gutters">
                      {archival}
                      <Button className="mb-1 btn btn-sm btn-block btn-warning" onClick={ e => onClickDeleteHandler(e) }><i class="fas fa-trash-alt"></i>&nbsp;&nbsp;DELETE</Button>
                    </td>
                  </tr>
                </tbody>
            </Table>
            <div className="d-flex justify-content-end">        
                <Button color="success" className="mr-1">Update</Button>{' '}
                <Button color="secondary" onClick={()=> toggle(true, _id, name) }>Cancel</Button>
            </div>
          </Form>
        </ModalBody>
      </Modal>
  );
}

export default AddParkingModal;