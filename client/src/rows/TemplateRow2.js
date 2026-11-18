let payment = ""
if(booking.isPaid == false) {
  payment = (
   <td><Button className="mb-1 btn btn-sm btn-warning btn-block mx-1" onClick={ e => onClickPaymentHandler(e) } disabled={disabledBtn}> UNPAID </Button></td>
  )
} else if(booking.isPaid == true) {
  payment = (
   <td><Button className="mb-1 btn btn-sm btn-secondary btn-block mx-1" onClick={ e => onClickPaymentHandler(e) } disabled> PAID </Button></td>
  )
}

let complete = ""
if(booking.isCompleted == false) {
  complete = (
     <td><Button className="mb-1 btn btn-sm btn-warning btn-block mx-1" onClick={ e => onClickCompletedHandler(e) } disabled={disabledBtn}> ON-GOING </Button></td>
  )
} else {
  complete = (
     <td><Button className="mb-1 btn btn-sm btn-secondary btn-block mx-1" onClick={ e => onClickCompletedHandler(e) } disabled>  COMPLETED </Button></td>
  )
}

let archival = ""
if(booking.isArchived == false) {
   archival = (
    <td><Button className="mb-1 btn btn-sm btn-success btn-block mx-1" onClick={ e => onClickArchiveHandler(e) } > ACTIVE </Button></td>
  )
} else {
  archival =(
   <td><Button className="mb-1 btn btn-sm btn-secondary btn-block mx-1" onClick={ e => onClickArchiveHandler(e) } disabled>  ARCHIVED </Button></td>
  )
}

let approval = ""
if(booking.statusId.name == "pending") {
  approval = (
    <td><Button className="mb-1 btn btn-sm btn-success btn-block mx-1" disabled>{booking.statusId.name.toUpperCase()}</Button></td>
  )
} else if(booking.statusId.name == "approved") {
  approval = (
    <td><Button className="mb-1 btn btn-sm btn-secondary btn-block mx-1" disabled>{booking.statusId.name.toUpperCase()}</Button></td>
  )
} else if(booking.statusId.name == "declined") {
  approval = (
    <td><Button className="mb-1 btn btn-sm btn-secondary btn-block mx-1" disabled>{booking.statusId.name.toUpperCase()}</Button></td>
  )
} 


let tableData = "";
if(roleId == 1) {
   tableData = (
    <Fragment className="d-flex">
      <th className="text-center">{index}</th>
      <td className="text-center">
        {booking.userId.firstName.toUpperCase()} {booking.userId.lastName.toUpperCase()}
        <br/>
        {booking.userId.email}
        <br/>
        {booking._id}
      </td>


      <td className="text-right">
        <em> Created: </em>
        <br/>
        {F1}
        <br/>
        {T1}
      </td>

       <td className="text-left">
        {moment(booking.createdAt).fromNow()}
        <br/>
        {moment(booking.startDate).format('MMMM DD, YYYY')}
        <br/>
        {T2}
      </td>
      
      <td className="text-center">
        SLOT {booking.parkingId.name.toUpperCase()}       
        {/*<br/>         
        {booking.parkingId.isAvailable.toString().toUpperCase() === true  ? "SLOT AVAILABLE" : "SLOT BOOKED"*} */}
        <br/>
        {booking.buildingId.name.toUpperCase()}
        <br/>
        {booking.locationId.name.toUpperCase()}
      </td>
      { payment }
      { complete }
      { approval }
      { archival }
      <td className="text-center">
        <Button className="mb-1 btn btn-sm btn-info ml-1" onClick={ e => onClickApproveHandler(e) } ><i class="far fa-thumbs-up"></i></Button> {/*APPROVE*/}
        <Button className="mb-1 btn btn-sm btn-warning ml-1" onClick={ e => onClickDeclineHandler(e) }><i class="fas fa-ban"></i></Button> {/*DECLINE*/}
        <Button className="mb-1 btn btn-sm btn-secondary ml-1" onClick={ e => onClickPendingHandler(e) }><i class="fas fa-wrench"></i></Button> {/*PENDING*/}
      </td>
      <td className="text-center">
        <Button className="mb-1 btn btn-sm btn-success ml-1" onClick={ e => onClickPaymentHandler(e) }><i class="fas fa-credit-card"></i></Button> {/*PAY*/}
        <Button className="mb-1 btn btn-sm btn-info ml-1" onClick={ e => onClickCompletedHandler(e) }><i class="fas fa-check-square"></i></Button> {/*COMPLETE*/}
        {/* <Button className="mb-1 btn btn-sm btn-info ml-1" onClick={()=> toggle(_id)}><i class="fas fa-pen-square"></i></Button> UPDATE*/}
        <Button className="mb-1 btn btn-sm btn-secondary ml-1" onClick={ e => onClickArchiveHandler(e) }><i class="fas fa-archive"></i></Button> {/*ARCHIVE*/}
        <Button className="mb-1 btn btn-sm btn-warning ml-1" onClick={ e => onClickDeleteHandler(e) } ><i class="fas fa-trash-alt"></i></Button> {/*CANCEL*/}
        {/*<Button className="mb-1 btn btn-sm btn-success ml-1" onClick={() => toggle(_id) } ><i class="fas fa-trash-alt"></i></Button>  {/*CANCEL*/}
      </td>
    </Fragment>
  )
} else if(roleId == 2) {
   tableData = (
    <Fragment className="d-flex">
      <th className="text-center">{index}</th>
      <td className="text-center">
        {booking.userId.firstName.toUpperCase()} {booking.userId.lastName.toUpperCase()}
        <br/>
        {booking.userId.email}
        <br/>
        {booking._id}
      </td>
      <td className="text-right">
        <em> Created: </em>
        <br/>
        {F1}
        <br/>
        {T1}
      </td>

       <td className="text-left">
        {moment(booking.createdAt).fromNow()}
        <br/>
        {moment(booking.startDate).format('MMMM DD, YYYY')}
        <br/>
        {T2}
      </td>
      <td className="text-center">
        SLOT {booking.parkingId.name.toUpperCase()}
        {/*<br/>         
        {booking.parkingId.isAvailable.toString().toUpperCase() === true  ? "SLOT AVAILABLE" : "SLOT BOOKED"*} */}
        <br/>
        {booking.buildingId.name.toUpperCase()}
        <br/>
        {booking.locationId.name.toUpperCase()}
      </td>
      { payment }
      { complete }
      { approval }
      { archival }
      <td>
        <StripeForm email={booking.userId.email} amount={amount}/>
      </td>
      <td className="text-center">
        <Button className="mb-1 btn btn-sm btn-info ml-1" onClick={ e => onClickApproveHandler(e) } disabled={disabledBtn}><i class="far fa-thumbs-up"></i></Button> {/*APPROVE*/}
        <Button className="mb-1 btn btn-sm btn-warning ml-1" onClick={ e => onClickDeclineHandler(e) } disabled={disabledDeclineBtn}><i class="fas fa-ban"></i></Button> {/*DECLINE*/}
        {/*<Button className="mb-1 btn btn-sm btn-success ml-1" onClick={() => toggle(_id) } ><i class="fas fa-trash-alt"></i></Button>  CANCEL*/}
      </td>


    </Fragment>
  )
}