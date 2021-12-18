import React, { useEffect, useState } from "react";

export const SettingsContext = React.createContext();
function Settings(props) {
  let [numOfItems, setNum] = useState(3);
  let[display,setDisplay]=useState(false)

const handleChangeNum=(value)=>{
    setNum(value)
}
  useEffect(()=>{
  let data=JSON.parse(localStorage.getItem('configStting')) 
  if(data){
    handleChangeNum(data.numOfItems)
    setDisplay(data.display)
  }
  })
  return (
    <>
      <SettingsContext.Provider value={{numOfItems:numOfItems,handleChangeNum:handleChangeNum,setDisplay}}>
        {props.children}
      </SettingsContext.Provider>
    </>
  );
}

export default Settings;
