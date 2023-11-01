import React, { useEffect, useState } from 'react';
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";

import { useSelector } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';


// config();
// const PUBLIC_KEY = process.env.PUBLIC_KEY;



function mercadoPago() {
    // USER es el Usuario registrado
    const {user} = useAuth0();

    // DETAIL es el detalle del Professional
    const detail = useSelector((state) => state.detail);

    const PUBLIC_KEY = "TEST-50156f30-252b-4623-bbba-ed453620d49f";
  
    console.log("PAKAPAKA...", detail)

    const [preferenceId, setPreferenceId] = useState(null);
    const [descriptionBuy, setDescriptionBuy] = useState("Gracias por la compra!")
    const [servicePrice, setServicePrice] = useState(1);
    const [cargandoSiNo, setCargandoSiNo] = useState("");
    const [walletVisible, setWalletVisible] = useState(false);

    const [userDataOk, setUserDataOk] = useState(null);
    const [detailProf, setDetailProf] = useState(null);

    // const detailPr = detail;
    
    useEffect(()=>{
      setUserDataOk(user);
    },[user])

    useEffect(()=>{
      console.log("USER-DATA...", userDataOk);
    },[userDataOk])
    

    useEffect(() => {
      if (preferenceId) {
        setCargandoSiNo("");
        setWalletVisible(true);   //Evito que se repita el botón repetido de MP
      }
    }, [preferenceId]);
    
      useEffect(() => {
        if (detail.detail.price) setServicePrice(detail.detail.price);
        if (detail.detail.title) setDescriptionBuy(detail.detail.title);
        // if (price) setServicePrice(price);
        // if (description) setDescriptionBuy(description);
        // if (userData) setUserDataOk(userData);
        // if (detail) setDetailProf(detail);

        // if (detailProf && detailProf.detail) {
        //     console.log("DETAIL-PROF", detailProf.detail._id);
        //   } else {
        //     console.log("Cargando DETAIL...");
        //   }

      }, [userDataOk, detail]);
     
    

    initMercadoPago(PUBLIC_KEY);

    //Mercado Pago functions
    const createPreference = async ()=>{
        
        try {
            // const response = await axios.post("https://connectifyback-dp-production.up.railway.app/create_preference", 
            const response = await axios.post("http://localhost:3001/create_preference", 
            {   
              idProf:detail.detail.creator[0]._id,//detailProf.detail._id,
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