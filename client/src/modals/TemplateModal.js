let payment = ""
if(booking.isPaid == false) {
  payment = (
   <td className="md-10 no-gutters"><Button className="mb-1 btn btn-sm btn-warning btn-block mx-1" onClick={ e => onClickPaymentHandler(e) } disabled={disabledBtn}> UNPAID </Button></td>
  )
} else if(booking.isPaid == true) {
  payment = (
   <td className="md-10 no-gutters"><Button className="mb-1 btn btn-sm btn-secondary btn-block mx-1" onClick={ e => onClickPaymentHandler(e) } disabled> PAID </Button></td>
  )
}

let complete = ""
if(booking.isCompleted == false) {
  complete = (
     <td className="md-10 no-gutters"><Button className="mb-1 btn btn-sm btn-warning btn-block mx-1" onClick={ e => onClickCompletedHandler(e) } disabled={disabledBtn}> ON-GOING </Button></td>
  )
} else {
  complete = (
     <td className="md-10 no-gutters"><Button className="mb-1 btn btn-sm btn-secondary btn-block mx-1" onClick={ e => onClickCompletedHandler(e) } disabled>  COMPLETED </Button></td>
  )
}

let archival = ""
if(booking.isArchived == false) {
   archival = (
    <td className="md-10 no-gutters"><Button className="mb-1 btn btn-sm btn-success btn-block mx-1" onClick={ e => onClickArchiveHandler(e) } > ACTIVE </Button></td>
  )
} else {
  archival =(
   <td className="md-10 no-gutters"><Button className="mb-1 btn btn-sm btn-secondary btn-block mx-1" onClick={ e => onClickArchiveHandler(e) } disabled>  ARCHIVED </Button></td>
  )
}

let tableData = "";
if(roleId == 1) {
	tableData = (
		<Fragment>
			<Modal isOpen={modal} toggle={toggle}>
			<ModalHeader toggle={toggle}>VIEW BOOKING DETAILS</ModalHeader>
				<ModalBody>
					<Table>
						<thead>
							<tr>
								<th>DETAILS</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>Booking ID:</td>
								<td>{booking._id}</td>
							</tr>
							<tr>
								<td>User:</td>
								<td>{booking.userId && booking.userId.firstName.toUpperCase()} {booking.userId && booking.userId.lastName.toUpperCase()}</td>
							</tr>
							<tr>
								<td>Date:</td>
								<td>{booking.startDate && moment(booking.startDate).format('MMMM DD, YYYY')}</td>
							</tr>
							<tr>
								<td>Slot:</td>
								<td>{booking.parkingId && booking.parkingId.name.toUpperCase()}</td>
							</tr>
							<tr>
								<td>Building:</td>
								<td>{booking.buildingId && booking.buildingId.name.toUpperCase()}</td>
							</tr>
							<tr>
								<td>Location:</td>
								<td>{booking.locationId && booking.locationId.name.toUpperCase()}</td>
							</tr>

						</tbody>
						<br/>
					</Table>

					<Table>
						<thead>
							<tr>
								<th className="text-left">STATUS</th>
							</tr>
						</thead>
					</Table>

					<Table>
						<tbody className="md-12">
							<tr className="md-12">
								{payment}
								<td className="text-right md-2 no-gutters">
									<Button className="mb-1 btn btn-sm btn-success ml-1" onClick={ e => onClickPaymentHandler(e) }><i class="fas fa-credit-card"></i></Button>
								</td>
							</tr>
							<tr className="md-12">
								{complete}
								<td className="text-right md-2 no-gutters">
									 <Button className="mb-1 btn btn-sm btn-info ml-1" onClick={ e => onClickCompletedHandler(e) }><i class="fas fa-check-square"></i></Button>
								</td>
							</tr>
							<tr className="md-12">
								<td className="md-10 no-gutters">
									<Button className="mb-1 btn btn-sm btn-success btn-block mx-1" disabled>PENDING</Button>
								</td>
								<td className="text-right md-2 no-gutters">
									<Button className="mb-1 btn btn-sm btn-info ml-1" ><i class="far fa-thumbs-up"></i></Button>
									<Button className="mb-1 btn btn-sm btn-warning ml-1" ><i class="fas fa-ban"></i></Button>
									<Button className="mb-1 btn btn-sm btn-secondary ml-1" ><i class="fas fa-wrench"></i></Button>
								</td>
							</tr>
							<tr className="md-12">
								{archival}
								<td className="text-right md-2 no-gutters">
									<Button className="mb-1 btn btn-sm btn-secondary ml-1" onClick={ e => onClickArchiveHandler(e) }><i class="fas fa-archive"></i></Button> 
								</td>
							</tr>
						</tbody>
					</Table>

					<Table>
						<tr>
							<td className="no-gutters">
								<Button className="mb-1 btn btn-sm btn-block btn-warning ml-1" onClick={ e => onClickDeleteHandler(e) } ><i class="fas fa-trash-alt"></i>&nbsp;CANCEL BOOKING</Button> {/*CANCEL*/}
							</td>
						</tr>
					</Table>
					<Form>
						<FormGroup className="mb-5">
							<h5>Are your sure you want to close booking details?</h5>
						</FormGroup>
						<div className=" d-flex justify-content-end">
							<Button className="btn btn-secondary mr-3" onClick={ () => toggle() }>CLOSE</Button>
						</div>
					</Form>
				</ModalBody>
			</Modal>
		</Fragment>
	)
} else if(roleId == 2) {
	tableData = (
		<Fragment>
			<Modal isOpen={modal} toggle={toggle}>
			<ModalHeader toggle={toggle}>VIEW BOOKING DETAILS</ModalHeader>
				<ModalBody>
					<Table>
						<thead>
							<tr>
								<th>DETAILS</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>Booking ID:</td>
								<td>{booking._id}</td>
							</tr>
							<tr>
								<td>User:</td>
								<td></td>
							</tr>
							<tr>
								<td>Date:</td>
								<td>{moment(booking.startDate).format('MMMM DD, YYYY')}</td>
							</tr>
							<tr>
								<td>Slot:</td>
								<td></td>
							</tr>
							<tr>
								<td>Building:</td>
								<td>yyyyyy</td>
							</tr>
							<tr>
								<td>Location:</td>
								<td>yyyyyy</td>
							</tr>

						</tbody>


					</Table>
						<br/>
					<Table>
						<thead>
							<tr>
								<th className="text-left">STATUS</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								{payment}
							</tr>
							<tr>
								{complete}
							</tr>
							<tr>
								{archival}
							</tr>
						</tbody>

					</Table>
					<Table>
						<tbody className="col-12">
							<tr className="">
								<td className="md-7">
								<Button className="mb-1 btn btn-sm btn-success btn-block mx-1 col-12 no-gutters" disabled>PENDING</Button>
								</td>
								<td className="md-5 text-right">
									<Button className="mb-1 btn btn-sm btn-info ml-1 sm-2 col-3 no-gutters" ><i class="far fa-thumbs-up"></i></Button>
									<Button className="mb-1 btn btn-sm btn-warning ml-1 sm-2 col-3 no-gutters" ><i class="fas fa-ban"></i></Button>

								</td>
							</tr>
						</tbody>
					</Table>

					<Table>
						<tr>
							<td>
								<Button className="mb-1 btn btn-sm btn-block btn-warning ml-1" onClick={ e => onClickDeleteHandler(e) } ><i class="fas fa-trash-alt"></i>&nbsp;CANCEL BOOKING</Button> {/*CANCEL*/}
							</td>
						</tr>
					</Table>


					<Form>
						<FormGroup className="mb-5">
							<h5>Are your sure you want to close booking details?</h5>
						</FormGroup>
						<div className=" d-flex justify-content-end">
							<Button className="btn btn-secondary mr-3" onClick={ () => toggle() }>CLOSE</Button>
						</div>
					</Form>
				</ModalBody>
			</Modal>
		</Fragment>
	)
}