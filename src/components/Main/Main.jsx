import React, { useContext } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../Context/Context";
const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);
  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, Dev.</span>
              </p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              <div onClick={() => setInput("Suggest some cool places for summer trip")} className="card">
                <p> Suggest some cool places for summer trip</p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div onClick={() => setInput("Summarize the concept of Urban Planning")} className="card">
                <p>Summarize the concept of Urban Planning</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div onClick={() => setInput("Brainstorming team bonding activites for our work retreat")} className="card">
                <p>Brainstorming team bonding activites for our work retreat</p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div onClick={() => setInput("Improve the readibility of the following code")} className="card">
                <p>Improve the readibility of the following code</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
              {loading 
              ? <div className="loader">
                <hr />
                <hr />
                <hr />
              </div>
              :<p dangerouslySetInnerHTML={{__html:resultData}} ></p>
              }
              
            </div>

          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter a prompt here"
            />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
             {input ? <img onClick={() => onSent()} src={assets.send_icon} alt="" /> :null } 
            </div>
          </div>
          <p className="bottom-info">
            Gemini may display inaccurate info, including about people,so double
            check its responses.Your privacy and Gemini Apps
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
