
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

const estadoInicialResultadoCalculo = {
  number: 0
}


const urlValidar = 'https://node-perceptron.herokuapp.com/calculate';
const urlCalcular = 'https://node-perceptron.herokuapp.com/validate'

function BoxNeuron() {

  const [estadoPrimerForm, setEstadoPrimerForm] = useState(estadoInicialPrimerFormulario);
  const [estadoSegundoForm, setEstadoSegundoForm] = useState(estadoInicialSegundoformulario);
  const [resultadoCalculo, setResultadoCalculo] = useState(estadoInicialResultadoCalculo);

  const changeForm1 = (name, value) => {
    setEstadoPrimerForm({ ...estadoPrimerForm, [name]: value });
  };

  const changeForm2 = (name, value) => {
    setEstadoSegundoForm({ ...estadoSegundoForm, [name]: value });
  };

  const changeResultCalculate = (name, value) => {
    setEstadoSegundoForm({ ...resultadoCalculo, [name]: value });
  };

  const validarData = () => {
    axios.post(urlValidar, {
      error: estadoPrimerForm.error === "" ? 0 : Number(estadoPrimerForm.error),
      learning_factor: estadoPrimerForm.learning_factor === "" ? 0 : Number(estadoPrimerForm.learning_factor),
      weight1: estadoPrimerForm.weight1 === "" ? 0 : Number(estadoPrimerForm.weight1),
      weight2: estadoPrimerForm.weight2 === "" ? 0 : Number(estadoPrimerForm.weight2)
    }).then((respuesta) => {
      setEstadoSegundoForm({
        w1: respuesta.data.w1,
        w2: respuesta.data.w2,
        counterAdjust: respuesta.data.counterAdjust,
        error: respuesta.data.error
      })
    })
  }

  const calculeteData = () => {
    axios.post(urlCalcular, {
      weight1: estadoSegundoForm.w1 === "" ? 0 : Number(estadoSegundoForm.w1),
      weight2: estadoSegundoForm.w2 === "" ? 0 : Number(estadoSegundoForm.w2),
      x1: estadoSegundoForm.x1 === "" ? 0 : Number(estadoSegundoForm.x1),
      x2: estadoSegundoForm.x2 === "" ? 0 : Number(estadoSegundoForm.x2),
      counterAdjust: estadoSegundoForm.counterAdjust === "" ? 0 : Number(estadoSegundoForm.counterAdjust),
      error: estadoSegundoForm.error === "" ? 0 : Number(estadoSegundoForm.error)
    }).then((respuesta) => {
      console.log("respuesta 2", respuesta.data.number)
      setResultadoCalculo({number:respuesta.data.number})
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
        <TextField value={estadoSegundoForm.w1} label='W1' disabled />
        <TextField value={estadoSegundoForm.w2} label='W2' disabled />
        <TextField value={estadoSegundoForm.counterAdjust} label='INTENTOS' disabled />
        <TextField value={estadoSegundoForm.error} label='Error' disabled />
        <TextField onChange={(v) => { changeForm2("x1", v.target.value) }} label='x1' />
        <TextField onChange={(v) => { changeForm2("x2", v.target.value) }} label='x2' />
        <Button
          style={{ marginRight: "10px" }}
          onClick={
            calculeteData}
        >
          CALCULAR
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
        <TextField value={
          resultadoCalculo.number
        } label='Numero calculado' disabled />
      </Box>
    </div>
  );
}

export default BoxNeuron;