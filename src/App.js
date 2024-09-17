import React, { useState } from "react";
import "./styles.css";
import Axios from "axios";
import styled from "styled-components";
import MicIcon from "@mui/icons-material/Mic";
import FastfoodTwoToneIcon from "@mui/icons-material/FastfoodTwoTone";
import LocalDiningTwoToneIcon from "@mui/icons-material/LocalDiningTwoTone";
import {
  Header,
  AppNameComponent,
  SearchComponent,
  SearchInput
} from "./components/Header";
import RecipeComponent from "./components/RecipeItem";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const RecipeListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 20px;
  justify-content: space-evenly;
`;

export default function App() {
  const APP_KEY = "4111a87cb02666e5a3ed5623f99a5adf";
  const APP_ID = "b0ea88e4";

  const [speech, setSpeech] = useState("");
  const [recipeList, setRecipeList] = useState([]);
  const [timeOutId, setTimeOutId] = useState();

  const fetchRecipe = async (searchItem) => {
    const url = `https://api.edamam.com/search?q=${searchItem}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=3&calories=591-722&health=alcohol-free`;
    const res = await Axios.get(url);
    setRecipeList(res.data.hits);
  };

  function handleChange(event) {
    const setSearch = event.target.value;
    clearTimeout(timeOutId);
    const timeout = setTimeout(() => fetchRecipe(setSearch), 500);
    setTimeOutId(timeout);
  }

  function startListening() {
    var SpeechRecognition = window.webkitSpeechRecognition;

    var recognition = new SpeechRecognition();

    recognition.continuous = true;

    recognition.start();

    recognition.onresult = function (event) {
      var current = event.resultIndex;

      var transcript = event.results[current][0].transcript;
      setSpeech(transcript);
      console.log(transcript);
      recognition.stop();
    };

    recognition.onstart = function () {
      console.log("listening");
      clearTimeout(timeOutId);
      const timeout = setTimeout((recognition) => fetchRecipe(speech), 1000);
      setTimeOutId(timeout);
      setSpeech("");
    };

    recognition.onspeechend = function () {
      console.log("ended");
    };

    recognition.onerror = function (event) {
      if (event.error === "no-speech") {
        console.log("error occured");
      }
    };

    // setTimeout((recognition) => {}, 5000);
  }

  return (
    <Container>
      <Header>
        <AppNameComponent>
          <LocalDiningTwoToneIcon
            style={{ fontSize: "40px", margin: "15px" }}
          />
          Recipe Finder
        </AppNameComponent>
        <SearchComponent>
          <MicIcon
            type="submit"
            onClick={startListening}
            style={{ color: "gray" }}
          />
          <SearchInput
            type="text"
            placeholder="Search"
            onChange={handleChange}
          />
        </SearchComponent>
      </Header>

      <RecipeListContainer>
        {recipeList.length ? (
          recipeList.map((recipeObj) => (
            <RecipeComponent recipeObj={recipeObj.recipe} />
          ))
        ) : (
          <FastfoodTwoToneIcon
            style={{ fontSize: "400px", margin: "15px", opacity: "50%" }}
          />
        )}
      </RecipeListContainer>
    </Container>
  );
}
