import React from "react";
import NavBarDemo2 from '../NavBarDemo2/NavBarDemo2';
import Background from "./Background/Background";
import ClientProfile from "./ClientProfile"

const NewBackgroun = () => {
  return (
    <div style={{
      position: 'absolute',
      width: '100%',
      height: '100%',
      backgroundPosition: 'right',
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed'
    }}>
      <NavBarDemo2 />
      <Background />

      <ClientProfile/>
              
         
      

    </div>
  );
};

export default NewBackgroun;
