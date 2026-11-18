import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, Table, Spinner } from 'reactstrap';
import Swal from 'sweetalert2';

const BuildingModal = (props) => {

const {
  modal,
  setModal,
  toggle,
  building,
  _id,
  name,
  onChangeModal,
  modalData,
  setModalData,
  updateBuilding,
  archiveBuilding,
  deleteBuilding,
  GET_BUILDINGS,
  setLoading,
  buildingsLoading
} = props

const onClickArchiveHandler = async (e) => {
  e.preventDefault();
  try{
    await archiveBuilding({
      variables: {
        _id,
        isArchived: !building.isArchived
      },
      refetchQueries: [
        {
          query: GET_BUILDINGS
        }
      ]
    })
    if(buildingsLoading) return <Spinner color="primary" />
    toggle(false, _id, name)
    Swal.fire({
      title: "Success",
      text: `"${building.name.toUpperCase()}" is ${building.isArchived ? "Activated" : "Archived"}`,
      icon: "success",
      showConfirmationButton: false,
      timer: 1500
    })
  } catch(e) {
    // setLoading(false)
    console.log(e)
    //SWAL ERROR
  }
}

const onClickDeleteHandler = (e) => {
    e.preventDefault();
    Swal.fire({
      icon: "question",
      title: "Delete Location",
      text: `Are you sure you want to delete "${name.toUpperCase()}"`,
      focusConfirm: false,
      showCloseButton: true
    }).then(async response => {

      if(response.value){
        setLoading(true)
        await deleteBuilding({
          variables: {
            _id
          },
          refetchQueries: [
            {
              query: GET_BUILDINGS
            }
          ]
        })
        setLoading(false)
        Swal.fire({
          title: "Success",
          text: `"${name.toUpperCase()}" Deleted`,
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
      await updateBuilding({
        variables: {...modalData},
        refetchQueries: [
          {
            query: GET_BUILDINGS
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
  if(building.isArchived == false) {
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
        <ModalHeader toggle={toggle}>UPDATE BUILDING MODAL</ModalHeader>
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

export default BuildingModal;