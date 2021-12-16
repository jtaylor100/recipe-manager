import { Typography, Container, Paper, Stack, TextField, Fab, Button } from '@mui/material'
import Layout from '../components/Layout'
import SaveAltIcon from '@mui/icons-material/SaveAlt'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react'


export default function Add() {
  const [ingredientRows, setIngredientRows] = useState([{
    name: '',
    quantity: '',
  }]);

  return (
    <Layout>
      <Container sx={{ py:4 }}>
        <Typography mb={2} variant="h3">Add New Recipe</Typography>
        <Typography mt={4} mb={2} variant="h4">Details</Typography>
        <TextField label="Recipe Name" variant="filled" />
        <Typography mt={4} variant="h4">Ingredients</Typography>
        <>
        {ingredientRows.map((row, index) =>  
          <Stack key={index} direction="row" spacing={2} my={2}>
            <TextField label="Ingredient name" variant="filled" 
              value={row.name} 
              onChange={(e) => handleIngredientNameChange(index, e.target.value, ingredientRows, setIngredientRows)}
              onKeyDown={(e) => e.code == "Enter" && addIngredientRow(index+1, ingredientRows, setIngredientRows)} 
            /> 
            <TextField label="Quantity" variant="filled" 
              value={row.quantity} 
              onChange={(e) => handleIngredientQuantityChange(index, e.target.value, ingredientRows, setIngredientRows)}
              onKeyDown={(e) => e.code == "Enter" && addIngredientRow(index+1, ingredientRows, setIngredientRows)}
            />
            <Button color="secondary" onClick={(e) => deleteIngredientRow(index, ingredientRows, setIngredientRows)}><DeleteIcon /></Button>
          </Stack>
        )}
        </>
        <Button color="secondary" variant="outlined" startIcon={<AddIcon />} 
          onClick={() => addIngredientRow(ingredientRows.length, ingredientRows, setIngredientRows)}>
            Add Ingredient
        </Button>
        <Typography mt={4} mb={2} variant="h4">Method</Typography>
        <TextField  multiline label="Write your recipe here!" fullWidth variant="filled" rows={5} />
      </Container>
      <Fab color="secondary" variant="extended" aria-label="save" className="bottomRightAnchor">
        <SaveAltIcon sx={{ mr: 1}} /> Save
      </Fab>
    </Layout>
  );
}

function handleIngredientNameChange(index, newName, ingredientRows, setIngredientRows) {
  ingredientRows[index].name = newName 
  setIngredientRows(ingredientRows.slice())
}

function handleIngredientQuantityChange(index, newQuantity, ingredientRows, setIngredientRows) {
  ingredientRows[index].quantity= newQuantity
  setIngredientRows(ingredientRows.slice())
}

function addIngredientRow(atIndex, ingredientRows, setIngredientRows) {
  ingredientRows.splice(atIndex, 0, { name: '', quantity: ''})
  setIngredientRows(ingredientRows.slice())
}

function deleteIngredientRow(index, ingredientRows, setIngredientRows) {
  ingredientRows.splice(index, 1)
  setIngredientRows(ingredientRows.slice())
}
