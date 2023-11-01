import React from 'react'
import style from './ViewsPayments.module.css';
const VITE_API_BASE = import.meta.env.VITE_API_BASE
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import PaymentsCard from '../PaymentsCard/PaymentsCard';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

import Navbar from "../Navbar/Navbar";

function ViewsPayments() {
  const { user, isAuthenticated } = useAuth0();

<<<<<<< HEAD
    const {user, isAuthenticated} = useAuth0();
    
    const { pathname, search } = useLocation(); // ( pathname: url - search: Querys )

    console.log("PATH: ", pathname.split("/")[2]);
    console.log("SEARCH: ", search);

    const path = pathname.split("/")[2];
    
    const detail = useSelector((state) => state.detail);
    
    const [paymentData, setPaymentData] = useState(null); 
    const [userName, setUserName] = useState(""); 
    const [saved, setSaved] = useState(false);
    const [professionalID, setProfessionalID] = useState(null);

    useEffect(()=>{
        
    //     //Si fue autenticado en google (Por los segundos que tarda en cargar el usuario)
    //     if (isAuthenticated) {
    //       setUserName(user.nickname); 
    //     }
    //     const idPro = detail.detail.creator[0]._id;    
        
    //     setProfessionalID(idPro);   
    },[pathname, search]);
=======
  const { pathname, search } = useLocation(); // ( pathname: url - search: Querys )

  const detail = useSelector((state) => state.detail);

  const [paymentData, setPaymentData] = useState(null);
  const [userName, setUserName] = useState("");
  const [saved, setSaved] = useState(false);
  const [professionalID, setProfessionalID] = useState(null);

  useEffect(() => {
    //Si fue autenticado en google (Por los segundos que tarda en cargar el usuario)
    if (isAuthenticated) {
      setUserName(user.nickname);
    }
    const idPro = detail.detail.creator[0]._id;

    setProfessionalID(idPro);
  }, [user, isAuthenticated, detail]);

  useEffect(() => {
    if (search) {
      //! Si hay search => tiene query (VENGO DE PAGAR)
      //!  GUARDO DATOS EN DB
      const dataMP = search.split("&");

      const valuesMP = {
        paymentIDD: dataMP[2].split("=")[1],
        status: dataMP[3].split("=")[1],
        paymentType: dataMP[5].split("=")[1],
      };

      const fetchData = async () => {
        try {
          //Veo si ya existe el ID de pago para evitar copias
          const checkPayment = await axios.get(
            VITE_API_BASE + `/payments/check/${valuesMP.paymentIDD}`
          );
          if (checkPayment.data.exists) {
            searchData();
          } else {
            const response = await axios.post(
              VITE_API_BASE + `/payments/register`,
              {
                professionalId: professionalID,
                paymentID: valuesMP.paymentIDD,
                userName: userName,
                isCompleted: valuesMP.status,
              }
            );
            searchData();
          }
        } catch (error) {
          console.log("Error ViewPayments,", error);
        }
      };
>>>>>>> 8ceec2519fa62db2971e7768c7c02dc5b3d94b1d

      fetchData();
    } else {
      searchData();
    }
  }, [search, userName]);

<<<<<<< HEAD
    useEffect(() => { 
        
        setUserName(path)


        if (search) {   //! Si hay search => tiene query (VENGO DE PAGAR)
                        //!  GUARDO DATOS EN DB 

                    
            const dataMP = search.split("&");
                    
            console.log("PUP...", dataMP);
                    
            const valuesMP = {
                profIDID: dataMP[0].split("=")[1],
                paymentIDD: dataMP[3].split("=")[1],
                status: dataMP[4].split("=")[1],
                paymentType: dataMP[6].split("=")[1],
            }

            console.log("POPO...", valuesMP);
            console.log("POPOPO...", valuesMP.profIDID);


            const fetchData = async () => {
                try {
                    //Veo si ya existe el ID de pago para evitar copias
                    const checkPayment = await axios.get(`http://localhost:3001/payments/check/${valuesMP.paymentIDD}`);
                    if (checkPayment.data.exists) {
                        searchData();
                    } else {

                        const response = await axios.post("http://localhost:3001/payments/register", {
                            professionalId: valuesMP.profIDID,  //professionalID,  
                            paymentID: valuesMP.paymentIDD,
                            userName: userName,
                            isCompleted: valuesMP.status,
                        });
                        searchData();
                        
                    }
                } catch (error) {
                    console.log("Error ViewPayments,", error);
                }
            };
        
            fetchData(); 
        
        } 
        else {
            searchData();            
        }
    }, [search, userName]); 

    // Leyendo datos por userName de la DB -----------------------------------------------------
    const searchData = async () => {
            try {
                const resp = await axios.get(`http://localhost:3001/payments/search/${userName}`);
                setPaymentData(resp.data); 
                
            } catch (error) {
                console.log("Error AxiosGet in ViewPayments,", error);
            }
    };

       
=======
  // Leyendo datos por userName de la DB -----------------------------------------------------
  const searchData = async () => {
    try {
      const resp = await axios.get(
        VITE_API_BASE + `/payments/search/${userName}`
      );
      setPaymentData(resp.data);
    } catch (error) {
      console.log("Error AxiosGet in ViewPayments,", error);
    }
  };
>>>>>>> 8ceec2519fa62db2971e7768c7c02dc5b3d94b1d

  return (
    <div className={style.contentAll}>
      <Navbar />
      <div className={style.contentAll}>
        <div className={style.contTitle}>
          <h3>Mis pagos...</h3>

          <h4>
            {paymentData && paymentData[0] && paymentData[0].userName
              ? `User: ${paymentData[0].userName}`
              : "Cargando..."}
          </h4>

           {paymentData
            ? paymentData.map((data, id) => (
                <PaymentsCard key={id} data={data} />
              ))
            : "Cargando..."}
        </div>
      </div>
    </div>
  );
}

export default ViewsPayments;
