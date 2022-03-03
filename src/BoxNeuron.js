
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField'
import { useState } from "react";
import axios from 'axios'

const estadoInicialPrimerFormulario = {
  error: 0,
  learning_factor: 0,
  weight1: 0,
  weight2: 0
}

const estadoInicialSegundoformulario = {
  w1: 0,
  w2: 0,
  x1: 0,
  x2: 0,
  counterAdjust: 0,
  error: 0
}

const urlCalcular = 'https://node-perceptron.herokuapp.com/calculate';
const urlValidar = 'https://node-perceptron.herokuapp.com/validate'

function BoxNeuron() {

  const [estadoPrimerForm, setEstadoPrimerForm] = useState(estadoInicialPrimerFormulario);
  const [estadoSegundoForm, setEstadoSegundoForm] = useState(estadoInicialSegundoformulario);

  const changeForm1 = (name, value) => {
    setEstadoPrimerForm({ ...estadoPrimerForm, [name]: value });
  };

  const changeForm2 = (name, value) => {
    setEstadoPrimerForm({ ...estadoSegundoForm, [name]: value });
  };

  const validarData = () => {

    axios.post(urlCalcular, estadoPrimerForm).then((respuesta) => {
      console.log(respuesta.data)
      setEstadoSegundoForm(respuesta.data)
      console.log("esta es la respuesta y estado 2", estadoInicialSegundoformulario)
    })
  }

  const calculeteData = () => {

    axios.post(urlCalcular, estadoSegundoForm).then((respuesta) => {
      console.log(respuesta.data)
      console.log("res2", estadoInicialSegundoformulario)
    })
  }


  return (
    <div >
      <Box
        sx={{
          display: "flex",
          m: 1,
          p: 1,
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "#101010" : "#fff",
          border: "2px solid",
          borderColor: (theme) =>
            theme.palette.mode === "dark" ? "grey.800" : "grey.300",
          borderRadius: 2,
          fontSize: "0.875rem",
          fontWeight: "700",
        }}
      >
        <TextField value={estadoPrimerForm.error} onChange={(v) => { changeForm1("error", v.target.value) }} required label='Error' />
        <TextField value={estadoPrimerForm.learning_factor} onChange={(v) => { changeForm1("learning_factor", v.target.value) }} required label='Factor de Aprendizaje' />
        <TextField value={estadoPrimerForm.weight1} onChange={(v) => { changeForm1("weight1", v.target.value) }} required label='Peso Uno' />
        <TextField value={estadoPrimerForm.weight2} onChange={(v) => { changeForm1("weight2", v.target.value) }} required label='Peso Dos' />
        <Button
          style={{ marginRight: "10px" }}
          onClick={validarData}
        >
          VALIDAR
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          m: 1,
          p: 1,
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "#101010" : "#fff",
          border: "2px solid",
          borderColor: (theme) =>
            theme.palette.mode === "dark" ? "grey.800" : "grey.300",
          borderRadius: 2,
          fontSize: "0.875rem",
          fontWeight: "700",
        }}
      >
        <TextField value={estadoSegundoForm.w1} label='W1' />
        <TextField value={estadoSegundoForm.w2} label='W2' />
        <TextField value={estadoSegundoForm.counterAdjust} label='INTENTOS'  />
        <TextField value={estadoSegundoForm.error} label='Error' />
        <TextField value={estadoSegundoForm.x1} onChange={(v) => { changeForm2("x1", v.target.value) }} label='x1' />
        <TextField value={estadoSegundoForm.x2} onChange={(v) => { changeForm2("x2", v.target.value) }} label='x2'  />
        <Button
          style={{ marginRight: "10px" }}
          onClick={
            calculeteData}
        >
          CALCULAR
        </Button>
      </Box>
    </div>
  );
}

export default BoxNeuron;