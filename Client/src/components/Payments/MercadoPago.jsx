import React, { useEffect, useState } from 'react';
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";
// import { config } from 'dotenv';
import { useSelector } from 'react-redux';


// config();

// const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PUBLIC_KEY = "TEST-50156f30-252b-4623-bbba-ed453620d49f";


function mercadoPago({price, description, userData, detail}) {

    const [preferenceId, setPreferenceId] = useState(null);
    const [descriptionBuy, setDescriptionBuy] = useState("Gracias por la compra!")
    const [servicePrice, setServicePrice] = useState(1);
    const [cargandoSiNo, setCargandoSiNo] = useState("");
    const [walletVisible, setWalletVisible] = useState(false);

    const [userDataOk, setUserDataOk] = useState(null);
    const [detailProf, setDetailProf] = useState(null);

    // const detailPr = detail;



    useEffect(() => {
        if (preferenceId) {
          setCargandoSiNo("");
          setWalletVisible(true);   //Evito que se repita el botón repetido de MP
        }
      }, [preferenceId]);
    
      useEffect(() => {
        if (price) setServicePrice(price);
        if (description) setDescriptionBuy(description);
        if (userData) setUserDataOk(userData);
        if (detail) setDetailProf(detail);

        if (detailProf && detailProf.detail) {
            console.log("DETAIL-PROF", detailProf.detail._id);
          } else {
            console.log("Cargando DETAIL...");
          }

      }, [price, description, userData, detail]);
     
    

    initMercadoPago(PUBLIC_KEY);

    //Mercado Pago functions
    const createPreference = async ()=>{
        
        try {
            const response = await axios.post("https://connectifyback-dp-production.up.railway.app/create_preference", 
            // const response = await axios.post("http://localhost:3001/create_preference", 
            {   
                idProfessional: detailProf.detail._id,
                userName: userDataOk.nickname,
                description: descriptionBuy,
                price:detail.detail.price,
                quantity: 1,
            })

            const { id } = response.data;
            return id;


        } catch (error) {
            console.log("Error en solicitud MercadoPago... ",error);
        }
    }


    const handleButton = async ()=>{
        setCargandoSiNo("Cargando pago...");
        const id = await createPreference();
        if (id) {
            setPreferenceId(id);
        }
    };

    

  return (
    <>
        
        <button className='donate-link' onClick={handleButton}>Contratar</button>
        <p>{cargandoSiNo}</p>

        {   
            
            walletVisible && preferenceId && <Wallet initialization={{ preferenceId }}/>
            
        }


    </>
  )
}

export default mercadoPago;