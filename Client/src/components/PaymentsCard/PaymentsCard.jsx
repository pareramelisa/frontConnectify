import React, { useEffect, useState } from 'react'
import style from './PaymentsCard.module.css';
import { useDispatch, useSelector } from 'react-redux';



function PaymentsCard(data) {
    
    console.log("Estoy en CARD y data es...", data.data.isCompleted)
    const profData = data.data.professionalId;
    const bDate = data.data.date.split("T")[0];
    const bState = data.data.isCompleted.toString();
    
    const [professionalData, setProfessionalData] = useState(null)
    const [buyDate, setBuyDate] = useState(null)
    const [buyState, setBuyState] = useState(null)
    
    useEffect(()=>{
       setProfessionalData(profData);
       setBuyDate(bDate);
       setBuyState(bState);
    },[profData, bDate, bState])

  return (
    <div className={style.contentAll}>
        
        
        <div className={style.roundMask}>
            {professionalData && professionalData.image && <img src={professionalData.image} alt="Image" />}    
        </div>
            

        <div className={style.dates}>
            {professionalData && professionalData.profession && <h4>{`${professionalData.profession}`}</h4>}
            {professionalData && professionalData.name && <h5>{`${professionalData.name} ${professionalData.lastName}`}</h5>}
        </div>
        <div className={style.date}>
            {buyDate && <h4>Fecha:</h4>}
            {buyDate && <h5>{buyDate}</h5>}
        </div>
        <div className={style.state}>
            {buyState && <h4>Estado:</h4>}
            {buyState && <h5>{buyState}</h5>}
        </div>
    
     
    
    </div>
  )
}

export default PaymentsCard;




