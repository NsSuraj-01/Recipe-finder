import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import styled from "styled-components";
import React from "react";
import Image from "../Image";

const RecipeComponent = ({ recipeObj }) => {
  const [open, setOpen] = React.useState(false);

  const RecipeContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 30px;
    width: 300px;

    box-shadow: 0 3px 10px 0 #aaa;
  `;

  const RecipeName = styled.span`
    font-size: 18px;
    font-weight: bold;
    color: black;
    margin: 10px 0;
  `;

  const IngredientsText = styled.span`
    font-size: 18px;
    border: solid 1px #557b83;
    font-weight: bold;
    cursor: pointer;
    padding: 10px 15px;
    border-radius: 4px;
    color: green;
    text-align: center;
    margin-bottom: 12px;
  `;

  const SeeMoreText = styled(IngredientsText)`
    color: red;
    border: solid 1px #f68989;
  `;

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Ingredients
        </DialogTitle>
        <DialogContent>
          <table>
            <thead>
              <th>Ingredients</th>
              <th>Weight</th>
            </thead>
            <tbody>
              {recipeObj.ingredients.map((ingredientObj) => (
                <tr>
                  <td>{ingredientObj.text}</td>
                  <td>{ingredientObj.weight}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </DialogContent>
        <DialogActions>
          <IngredientsText onClick={() => window.open(recipeObj.url)}>
            See More
          </IngredientsText>
          <SeeMoreText onClick={() => setOpen("")}>Close</SeeMoreText>
        </DialogActions>
      </Dialog>
      <RecipeContainer>
        <Image url={recipeObj.image} />
        <RecipeName>{recipeObj.label}</RecipeName>
        <IngredientsText onClick={() => setOpen(true)}>
          Ingredients
        </IngredientsText>
        <SeeMoreText onClick={() => window.open(recipeObj.url)}>
          Complete Recipe
        </SeeMoreText>
      </RecipeContainer>
    </>
  );
};

export default RecipeComponent;
