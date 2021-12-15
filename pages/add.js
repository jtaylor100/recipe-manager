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
      <Container>
        <Typography mt={2} variant="h3">Ingredients</Typography>
        <>
        {ingredientRows.map((row, index) =>  
          <Stack key={index} direction="row" spacing={2} my={2}>
            <TextField label="Ingredient name" variant="filled" 
              value={row.name} 
              onChange={(e) => handleIngredientNameChange(index, e.target.value, ingredientRows, setIngredientRows)}/> <TextField label="Quantity" variant="filled" 
              value={row.quantity} 
              onChange={(e) => handleIngredientQuantityChange(index, e.target.value, ingredientRows, setIngredientRows)}/>
            <Button color="secondary" onClick={(e) => deleteIngredientRow(index, ingredientRows, setIngredientRows)}><DeleteIcon /></Button>
          </Stack>
        )}
        </>
        <Button color="secondary" variant="outlined" startIcon={<AddIcon />} onClick={() => addIngredientRow(ingredientRows, setIngredientRows)}>
            Add Ingredient
        </Button>
        <Typography my={2} variant="h3">Method</Typography>
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

function addIngredientRow(ingredientRows, setIngredientRows) {
  ingredientRows.push({ name: '', quantity: ''})
  setIngredientRows(ingredientRows.slice())
}

function deleteIngredientRow(index, ingredientRows, setIngredientRows) {
  ingredientRows.splice(index, 1)
  setIngredientRows(ingredientRows.slice())
}
