import React, { useEffect, useState } from 'react';
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";
// import { config } from 'dotenv';
import { useSelector } from 'react-redux';


// config();

// const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PUBLIC_KEY = "TEST-50156f30-252b-4623-bbba-ed453620d49f";


function mercadoPago({price, description}) {

    const [preferenceId, setPreferenceId] = useState(null);
    const [descriptionBuy, setDescriptionBuy] = useState("Gracias por la compra!")
    const [servicePrice, setServicePrice] = useState(1);
    const [cargandoSiNo, setCargandoSiNo] = useState("");
    const [walletVisible, setWalletVisible] = useState(false);

    const detail = useSelector((state) => state.detail);


    useEffect(() => {
        if (preferenceId) {
          setCargandoSiNo("");
          setWalletVisible(true);   //Evito que se repita el botón repetido de MP
        }
      }, [preferenceId]);
    
      useEffect(() => {
        if (price) setServicePrice(price);
        if (description) setDescriptionBuy(description);
      }, [price, description]);
     
    

    initMercadoPago(PUBLIC_KEY);

    //Mercado Pago functions
    const createPreference = async ()=>{
        
        try {
            const response = await axios.post("https://connectifyback-dp-production.up.railway.app/create_preference", 
            {
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
        setCargandoSiNo("Cargando compra...");
        const id = await createPreference();
        if (id) {
            setPreferenceId(id);
        }
    };


    const handleChange = (event) =>{
        const value = event.target.value;
        setServicePrice(value);
    }

    

  return (
    <>
        {/* <p>Comprar...</p> */}
        {/* <div className='contentPrice'>
            <label className='price$'>$</label>
            <input type='text' className='priceValue' value={servicePrice} onChange={handleChange}/>
        </div> */}

        <button className='donate-link' onClick={handleButton}>COMPRAR</button>
        <p>{cargandoSiNo}</p>

        {   
            
            walletVisible && preferenceId && <Wallet initialization={{ preferenceId }}/>
            
        }


    </>
  )
}

export default mercadoPago;