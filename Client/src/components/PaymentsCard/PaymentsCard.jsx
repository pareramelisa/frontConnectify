import React, { useEffect, useState } from 'react'
import style from './PaymentsCard.module.css';
import { useDispatch, useSelector } from 'react-redux';



function PaymentsCard() {
    

    const [estado, setEstado] = useState({})


    const detail = useSelector((state)=>state.detail.detail);
    // const dispatch = useDispatch;

    useEffect(()=>{
       
        setEstado(detail)
        console.log("PROBA...", estado)
    },[detail, estado])

  return (
    <div className={style.contentAll}>
        
        
        <div className={style.roundMask}>
            {estado.creator && estado.creator[0] && <img src={estado.creator[0].image} alt="Image" />}    
        </div>
            

        <div className={style.dates}>
            {estado.creator && estado.creator[0] && <h4>{`${estado.creator[0].profession}`}</h4>}
            {estado.creator && estado.creator[0] && <h5>{`${estado.creator[0].name} ${estado.creator[0].lastName}`}</h5>}
        </div>
        <div className={style.date}>
            {estado.creator && estado.creator[0] && <h4>Fecha:</h4>}
            {estado.creator && estado.creator[0] && <h5>31/10/2023</h5>}
        </div>
        <div className={style.state}>
            {estado.creator && estado.creator[0] && <h4>Estado:</h4>}
            {estado.creator && estado.creator[0] && <h5>Realizado</h5>}
        </div>
    
     
    
    </div>
  )
}

export default PaymentsCard;




