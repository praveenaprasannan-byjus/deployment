import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Input, Label, Container, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';

import "../icons";

toast.configure();

export default function ViewWeekOff() {
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalupdate, setModalupdate] = useState(false);
  const [newdate, setNewdate] = useState(null);
  const [clickedEmail, setclickedEmail] = useState('');
  const [clickedDate, setclickedDate] = useState('');
  const [info, setInfo] = useState(false);
  const [historyData, setHistoryData] = useState([]);

  const [limit, setLimit] = useState(4);
  const [skip, setSkip] = useState(0);
  const [disable, setDisable] = useState(true);
  


  const nextPage = () => {
    setData('');
    setDisable(false);
    setSkip(skip + limit)
}

const previousPage = () => {
    setData('');
    setSkip(skip - limit)
    if(skip <= 4){
      setDisable(true);
    }
}


  useEffect(() => {
    fetchWeekOffData(skip,limit)
  }, [skip,limit])

  function onClickInfo(emailId, date) {
    axios.get(`http://localhost:5000/weekoff/getInfo/${emailId}/${date}`)
      .then((result) => {
        setHistoryData(result.data);
        setInfo(true);
      })
      .catch((error) => console.log('error', error));
  }

  function OnClickCancelInfo() {
    setInfo(false);
  }


  function fetchWeekOffData(skip,limit) {
    fetch(`http://localhost:5000/weekoff/viewweekoff?skip=${skip}&limit=${limit}`)
      .then((response) => response.json())
      .then((result) => setData(result))
      .catch((error) => console.log("error", error));
  }

  function toggle() {
    setModal(!modal);
  }

  function toggleupdate(emailId, date) {
    var todayDate = new Date();
    var selectedDate = new Date(date);
    if(selectedDate < todayDate){
      alert(`Past date is not possible to edit`);
    }
    else{
    setclickedDate(date);
    setclickedEmail(emailId);
    setModalupdate(!modalupdate);
    }
  }

  function confirmDelete(emailId) {
    const deleteRecord = { "emailId": emailId };
    axios.delete(`http://localhost:5000/weekoff/deleteweekoff`, { data: deleteRecord })
      .then((response) => {
        setData(response.data.weekOffData)
      })
      .catch((error) => console.log("error", error));
    setModal(!modal);

    if (data) {
      deletenotify();
    }
  }

  const deletenotify = () => {
    toast.error('Deleted Successfully', { autoClose: 1000 })
  }

  function confirmUpdate(skip,limit) {
    if (newdate == null) {
      alert(`Please enter the Date`);
      return;
    }
    else {
      axios.put(`http://localhost:5000/weekoff/updateweekoff?skip=${skip}&limit=${limit}`, {
        clickedEmail,
        clickedDate,
        newdate
      })
        .then((response) => {
          if(response.data.message === "WeekOff already exist"){
            errornotify();
          }
          else{
            setData(response.data.weekOffData) 
            if (data) {
              updatenotify();
            }
          }  
        })
        .catch((error) => console.log("error", error));
        setModalupdate(!modalupdate);
        setNewdate(null);
    }
  }

  const updatenotify = () => {
    toast.success('Updated Successfully', { autoClose: 1000 })
  }
  const errornotify = () => {
    toast.error('WeekOff Date already exist', { autoClose: 10000 })
  }

  return (
    <div className="App ml-4">
      <h1 className="text-center m-4">Employees Week Off Table</h1>
      <Container className="m-4">
        <Table className="table table-bordered table-striped">
          <thead>
            <tr class="bg-light">
              <th>Date</th>
              <th>Employee Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data && data.length &&
              data.map((weekoff) => {
                return (
                  <tr key={weekoff.emailId}>
                    <td >{weekoff.date}</td>
                    <td>{weekoff.emailId}</td>
                    <td >
                      <Button className="mr-2" color="secondary" onClick={() => onClickInfo(weekoff.emailId, weekoff.date)}><span><FontAwesomeIcon icon="info"></FontAwesomeIcon></span></Button>
                      <Modal isOpen={info}>
                        <ModalHeader>Update History</ModalHeader>
                        <ModalBody>
                          {historyData.length > 0 ? historyData.map((field) => {
                            return (
                              <h6>From : {field.from} To : {field.to}</h6>
                            );
                          }) : <h4>No History Associated</h4>}
                        </ModalBody>
                        <ModalFooter>
                          <Button onClick={OnClickCancelInfo} color="danger">Cancel</Button>
                        </ModalFooter>
                      </Modal>
                      <Button className="mr-2" color="info" onClick={() => toggleupdate(weekoff.emailId, weekoff.date)}><span><FontAwesomeIcon icon="edit"></FontAwesomeIcon></span></Button>
                      <Modal isOpen={modalupdate} toggle={toggleupdate} >
                        <ModalHeader toggle={toggleupdate}>Update Week-Off Date</ModalHeader>
                        <ModalBody>
                          <Label>Email Id</Label>
                          <Input
                            disabled value={clickedEmail}
                          />
                          <br />
                          <Label>Select Date</Label>
                          <input type="date" required="required" min={new Date().toISOString().split('T')[0]} onChange={e => {
                            setNewdate(e.target.value)
                          }}></input>
                          <br />
                        </ModalBody>
                        <ModalFooter>
                          <Button color="primary" onClick={() => confirmUpdate(skip,limit)}>Confirm</Button>{' '}
                          <Button color="secondary" onClick={toggleupdate}>Cancel</Button>
                        </ModalFooter>
                      </Modal>
                      <Button color="danger" onClick={toggle}><span><FontAwesomeIcon icon="times"></FontAwesomeIcon></span></Button>
                      <Modal isOpen={modal} toggle={toggle}>
                        <ModalHeader toggle={toggle}>Confirm Delete</ModalHeader>
                        <ModalBody>
                          Are you sure you want to delete?
                        </ModalBody>
                        <ModalFooter>
                          <Button color="primary" onClick={() => confirmDelete(weekoff.emailId)}>Confirm</Button>{' '}
                          <Button color="secondary" onClick={toggle}>Cancel</Button>
                        </ModalFooter>
                      </Modal>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
        <div> 
            <div> 
            <button className="bg-info float-left" disabled ={disable} onClick={previousPage}> Previous Page </button>
            <button className="bg-success float-right" onClick={nextPage} > Next Page </button> 
        </div> 
        </div>
        <br />
        <br />
        <br />
      </Container>
    </div>
  );
}
