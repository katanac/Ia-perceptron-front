import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import axios from "axios";

const estadoInicialPrimerFormulario = {
  error: 0,
  learning_factor: 0,
  weights: [0, 0, 0, 0],
};

const estadoInicialSegundoformulario = {
  weights: [0, 0, 0, 0],
  array_x: [0, 0, 0, 0],
  counterAdjust: 0,
  error: 0,
};

const estadoInicialResultadoCalculo = {
  number: 0,
};

const urlCalcular = "https://node-perceptron-four.herokuapp.com/calculate";
const urlValidar = "https://node-perceptron-four.herokuapp.com/validate";

function BoxNeuron() {
  const [estadoPrimerForm, setEstadoPrimerForm] = useState(
    estadoInicialPrimerFormulario
  );
  const [estadoSegundoForm, setEstadoSegundoForm] = useState(
    estadoInicialSegundoformulario
  );
  const [resultadoCalculo, setResultadoCalculo] = useState(
    estadoInicialResultadoCalculo
  );

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
    axios
      .post(urlCalcular, {
        error:
          estadoPrimerForm.error === "" ? 0 : Number(estadoPrimerForm.error),
        learning_factor:
          estadoPrimerForm.learning_factor === ""
            ? 0
            : Number(estadoPrimerForm.learning_factor),
        weights: Number(estadoInicialPrimerFormulario.weights),
      })
      .then((respuesta) => {
        setEstadoSegundoForm({
          weights: respuesta.data.weights,
          counterAdjust: respuesta.data.counterAdjust,
          error: respuesta.data.error,
          array_x: respuesta.data.array_x,
        });
      });
  };

  const calculeteData = () => {
    axios
      .post(urlValidar, {
        weights:
          estadoSegundoForm.weights === ""
            ? 0
            : Number(estadoSegundoForm.weights),
        array_x:
          estadoSegundoForm.array_x === ""
            ? 0
            : Number(estadoSegundoForm.array_x),
        counterAdjust:
          estadoSegundoForm.counterAdjust === ""
            ? 0
            : Number(estadoSegundoForm.counterAdjust),
        error:
          estadoSegundoForm.error === "" ? 0 : Number(estadoSegundoForm.error),
      })
      .then((respuesta) => {
        console.log("respuesta 2", respuesta.data.number);
        setResultadoCalculo({ number: respuesta.data.number });
      });
  };

  return (
    <div>
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
        <TextField
          value={estadoPrimerForm.error}
          onChange={(v) => {
            changeForm1("error", v.target.value);
          }}
          required
          label="Error"
        />
        <TextField
          value={estadoPrimerForm.learning_factor}
          onChange={(v) => {
            changeForm1("learning_factor", v.target.value);
          }}
          required
          label="Factor de Aprendizaje"
        />
        <TextField
          value={estadoPrimerForm.weights[0]}
          onChange={(v) => {
            changeForm1("weight1", v.target.value);
          }}
          required
          label="Peso Uno"
        />
        <TextField
          value={estadoPrimerForm.weights[1]}
          onChange={(v) => {
            changeForm1("weight2", v.target.value);
          }}
          required
          label="Peso Dos"
        />
        <TextField
          value={estadoPrimerForm.weights[2]}
          onChange={(v) => {
            changeForm1("weight3", v.target.value);
          }}
          required
          label="Peso Tres"
        />
        <TextField
          value={estadoPrimerForm.weights[3]}
          onChange={(v) => {
            changeForm1("weight4", v.target.value);
          }}
          required
          label="Peso Cuatro"
        />
        <Button style={{ marginRight: "10px" }} onClick={validarData}>
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
        <TextField value={estadoSegundoForm.weights[0]} label="W1" disabled />
        <TextField value={estadoSegundoForm.weights[1]} label="W2" disabled />
        <TextField value={estadoSegundoForm.weights[2]} label="W3" disabled />
        <TextField value={estadoSegundoForm.weights[3]} label="W4" disabled />
        <TextField
          value={estadoSegundoForm.counterAdjust}
          label="INTENTOS"
          disabled
        />
        <TextField value={estadoSegundoForm.error} label="Error" disabled />
        <TextField
          onChange={(v) => {
            changeForm2("weights", v.target.value);
          }}
          label="x1"
        />
        <TextField
          onChange={(v) => {
            changeForm2("x2", v.target.value);
          }}
          label="x2"
        />
        <Button style={{ marginRight: "10px" }} onClick={calculeteData}>
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
        <TextField
          value={resultadoCalculo.number}
          label="Numero calculado"
          disabled
        />
      </Box>
    </div>
  );
}

export default BoxNeuron;
