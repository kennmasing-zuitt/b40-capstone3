import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, Table, Spinner, 
} from 'reactstrap';
import Swal from 'sweetalert2';

const LocationModal = (props) => {

const {
	modal,
  setModal,
	toggle,
  location,
  _id,
	name,
  isArchived,
	onChangeModal,
  modalData,
  setModalData,
  updateLocation,
  archiveLocation,
  deleteLocation,
  GET_LOCATIONS,
  setLoading,
  locationsLoading
} = props

const onClickArchiveHandler = async (e) => {
  e.preventDefault();
  try{
    await archiveLocation({
      variables: {
        _id,
        isArchived: !location.isArchived
      },
      refetchQueries: [
        {
          query: GET_LOCATIONS
        }
      ]
    })
    if(locationsLoading) return <Spinner color="primary" />
    toggle(false, _id, name)
    Swal.fire({
      title: "Success",
      text: `"${location.name.toUpperCase()}" is ${location.isArchived ? "Activated" : "Archived"}`,
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
    title: "Delete Location",
    text: `Are you sure you want to delete "${location.name.toUpperCase()}"`,
    focusConfirm: false,
    showCloseButton: true
  }).then(async response => {

    if(response.value){
      setLoading(true)
      await deleteLocation({
        variables: {
          _id
        },
        refetchQueries: [
          {
            query: GET_LOCATIONS
          }
        ]
      })
      setLoading(false)
      Swal.fire({
        title: "Success",
        text: `"${location.name.toUpperCase()}" Deleted`,
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
      await updateLocation({
        variables: {...modalData},
        refetchQueries: [
          {
            query: GET_LOCATIONS
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
  if(location.isArchived == false) {
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
        <ModalHeader toggle={toggle}>UPDATE LOCATION MODAL</ModalHeader>
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

export default LocationModal;