import { createContext, useState } from "react";
import { runChat } from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input,setInput] = useState("");
  const [recentPrompt,setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([])
  const [showResult,setShowResult] = useState(false)
  const [loading,setLoading] = useState(false)
  const[resultData, setResultData] = useState("")

  const delayPara =(index,nextword)=>{
    setTimeout( function () {
      setResultData(prev=>prev+nextword)
    }, 75*index);
  }

  const onSent = async (prompt) => {
    setResultData("")
    setLoading(true)
    setRecentPrompt(input)
    setPrevPrompts(prev=>[...prev,input])
    setShowResult(true)
    const response = await runChat(input);
    let responseArray = response.split("**");
    let newResponse ="";
    for(let i =0;i<responseArray.length;i++){
       if(i%2==1){
         newResponse+= "<b>"+responseArray[i]+"</b>"
       }else{
        newResponse+=responseArray[i];
       }
    }
    let newResponse2 = newResponse.split("*").join("</br>")
    let newResponseArray = newResponse2.split(" ");
    for (let i = 0; i < newResponseArray.length; i++) {
      const nextword = newResponseArray[i];
      delayPara(i,nextword+" ")
      
    }
    
    setLoading(false);
    setInput("")
    
  };

 
  
  const contextValue = {
    onSent,
    input,setInput,
    recentPrompt,setRecentPrompt,
    prevPrompts,setPrevPrompts,
    showResult,setShowResult,
    loading,setLoading,
    resultData,setResultData
  };
  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};
export default ContextProvider;
