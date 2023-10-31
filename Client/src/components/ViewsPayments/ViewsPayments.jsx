import React from 'react'
import style from './ViewsPayments.module.css';

import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import PaymentsCard from '../paymentsCard/PaymentsCard';
import { useState, useEffect } from 'react';
import axios from 'axios';

 function ViewsPayments () {

    const clientId = "653d1f54d51041342d8d855c" //! INSERT  CLIENT  ID  <<< <<<<< <<<<<<<

    const { pathname, search } = useLocation(); //? ( pathname: url - search: Querys )
    
    const idProfessional = pathname.replace('/payments/', '')
    console.log("idProfessional...", idProfessional);
    
    const [paymentData, setPaymentData] = useState(null); // Estado para almacenar los datos de la respuesta

    useEffect(() => {  
        if (search) {   //Si hay search significa que tiene query (VENGO DE PAGAR)
                        //GUARDO DATOS EN DB 
            const dataMP = search.split("&");
            
            const valuesMP = {
                paymentID: dataMP[2].split("=")[1],
                status: dataMP[3].split("=")[1],
                paymentType: dataMP[5].split("=")[1],
            }

            console.log("Datos MercadoPago...", valuesMP);

            const fetchData = async () => {
                try {
                const response = await axios.post("http://localhost:3001/payments/register", {
                    professionalId: "653bca0fe4f42ed113e6a4ce", //idProfessional,
                    clientId: "653d1f54d51041342d8d855c",
                    isCompleted: true
                });
                setPaymentData(response.status); 
                } catch (error) {
                console.log("Error ViewPayments,", error);
                }
            };
        
            fetchData(); // Llama a la función para realizar la solicitud cuando el componente se monta
        }
    }, [search, idProfessional]);

    // Leyendo datos de la DB -----------------------------------------------------
    useEffect(() => {      
    const searchData = async () => {
        try {
            const resp = await axios.get(`http://localhost:3001/payments/${clientId}`);
            setPaymentData(resp.data); 
            console.log("DATA... ", resp.data)
        } catch (error) {
            console.log("Error AxiosGet in ViewPayments,", error);
        }
    };

    searchData();
}, []);


    // useEffect(() => {
    //     const fetchData = async () => {
    //       try {
    //         const response = await axios.post("http://localhost:3001/payments/register", {
    //           professionalId: idProfessional,
    //           clientId: "653d1f54d51041342d8d855c",
    //           isCompleted: true
    //         });
    //         // console.log("AXIOSresponse...", response.status)
    //         setPaymentData(response.status); // Actualiza el estado con los datos de la respuesta
    //         // console.log("ALGO:::", response);
    //       } catch (error) {
    //         console.log("Error ViewPayments,", error);
    //       }
    //     };
    
    //     fetchData(); // Llama a la función para realizar la solicitud cuando el componente se monta
    //   }, [search]);
    










  return (
    <div className={style.contentAll}>
        <h2>Payments</h2>
        <div className={style.contentAll}>
            <div className={style.contTitle}>
                <h3>Mis pagos...</h3>

                <PaymentsCard/>


            </div>
        </div>
        
        
        
        
    </div>
  )
}

export default ViewsPayments