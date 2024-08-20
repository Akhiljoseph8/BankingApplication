import React, { useEffect } from 'react'
import Buttons from '@mui/material/Button';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { updateBalance,getBalance } from '../services/allApis';
import Header from '../components/Header';

function User() {
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);
    const [amount, setAmount] = useState(0);
    const [balance,setBalance] = useState(0)
    const [history, setHistory] = useState([])
    const handleClose = () =>{ setShow(false)
      setAmount(0)
        setShow2(false), setShow3(false)
    };
    var data={}
   
    if(!sessionStorage.username){
      window.location.href=("/")
    }
 useEffect(() => {
    total()
 }, [show,show2])

    const handleWithdraw = async() =>{
        setShow(true);
        var bal=0
        bal=balance-amount
        if(bal<0){
          alert("You have not enough balance")
        }else{
          if(amount>0){
          data={balance:bal,history:" - "+amount}
        setAmount(0)
        const header = {"Authorization":`Bearer ${sessionStorage.getItem('token')}`}
        const result = await updateBalance(data,header);
        setShow(false)
          }
        }
    }
    const handleDeposit = async() =>{
        setShow2(true);
        var bal=0
        bal=eval(balance+parseInt(amount))
        if(amount>0){
        data={balance:bal,history:" + "+amount}
        setAmount(0)
        const header = {"Authorization":`Bearer ${sessionStorage.getItem('token')}`}
        const result = await updateBalance(data,header);
        setShow2(false)
        }
    
    }
    const total = async() =>{
            const header = {"Authorization":`Bearer ${sessionStorage.getItem('token')}`}
              const res = await getBalance(header);
              setBalance(res.data.balance);
    }

    const getHistory = async() =>{
      const header = {"Authorization":`Bearer ${sessionStorage.getItem('token')}`}
      const res = await getBalance(header);
      setHistory(res.data.history)
      setShow3(true)
}

  return (
    <>
<Header/>
<Modal show={show} onHide={handleClose} animation={false} centered>
        <Modal.Header closeButton>
          <Modal.Title>Enter amount</Modal.Title>
        </Modal.Header>
        <Modal.Body><input onChange={(e)=>setAmount(e.target.value)} type='number'></input></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleWithdraw}>
           Withdraw
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={show2} onHide={handleClose} animation={false} centered>
        <Modal.Header closeButton>
          <Modal.Title>Enter amount</Modal.Title>
        </Modal.Header>
        <Modal.Body><input onChange={(e)=>setAmount(e.target.value)} type='number'></input></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleDeposit}>
            Deposit
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={show3} onHide={handleClose} animation={false} centered scrollable>
        <Modal.Header closeButton>
          <Modal.Title>Transaction History</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {history.map((item)=>(
         <li>{item}</li>
        ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>


    <div className='bg-dark w-100 d-flex justify-content-center align-items-center' style={{height:'100vh'}}>
       <div className='w-50 bg-light border rounded p-5'>
          <h5>Account Balance</h5>
          <div style={{backgroundColor:'yellow', width:'100%'}} className='text-center border rounded p-5 shadow'><h3>₹ {balance}</h3></div>
         
             <div className='d-flex justify-content-between mt-5'>
             <Buttons onClick={handleWithdraw}  variant="contained" style={{width:"20%", backgroundColor:"red" }}>Withdraw</Buttons>
             <Buttons onClick={getHistory}  variant="contained" style={{width:"20%",backgroundColor:"blue"}}>History</Buttons>
             <Buttons onClick={handleDeposit}  variant="contained" style={{width:"20%",backgroundColor:"green"}}>Deposit</Buttons>
             </div>
         
       </div>
    </div>
    </>
  )
}

export default User