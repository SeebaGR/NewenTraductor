import React, { useState, useEffect } from 'react';
import './App.css';
import MaterialTable from "material-table";
import firebase from './firebase';
import {Modal, TextField, Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Navbar from './Navbar/Navbar'

const columns= [
  { title: 'Palabra', field: 'palabra' },
  { title: 'Significado', field: 'significado' }
];




const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  iconos:{
    cursor: 'pointer'
  }, 
  inputMaterial:{
    width: '100%'
  }
}));

function Traductor() {
  const styles= useStyles();
  const [entries, setData]= useState([]);
  const [modalInsertar, setModalInsertar]= useState(false);
  const [modalEditar, setModalEditar]= useState(false);
  const [modalEliminar, setModalEliminar]= useState(false);
  const [palabraSeleccionada, setPalabraSeleccionada]=useState({
    palabra: "",
    significado: ""
  })


  
  
  
  const logout = () => {
  
      firebase.auth().signOut();
  }


  const handleChange=e=>{
    const {name, value}=e.target;
    setPalabraSeleccionada(prevState=>({
      ...prevState,
      [name]: value
    }));
  }

  
  const crearPalabra = () => {


    //Falta optimizar este codigo para que sea a traves de api RESt

    var palabra = palabraSeleccionada.palabra;
    var significado = palabraSeleccionada.significado;

    const RefTra = firebase.database().ref('Traductor');

    const Ez = { palabra, significado };

    RefTra.push(Ez);
    console.log(Ez);
    abrirCerrarModalInsertar();

  };


  const ActualizarPalabra = () =>{

    var psn = palabraSeleccionada.id;
    var palabra = palabraSeleccionada.palabra;
    var significado = palabraSeleccionada.significado;
    const Ez = { palabra, significado };
    

    const RefTra = firebase.database().ref('Traductor').child(psn);
    

    RefTra.update(Ez);
    console.log(RefTra);
    abrirCerrarModalEditar();

  }


    const BorrarPalabra = () => {
      
      //Mejorar codigo para su mejor efectividad
     var psn = palabraSeleccionada.id;
     console.log(psn);
     const RefTra = firebase.database().ref('Traductor').child(psn);
     RefTra.remove();
     abrirCerrarModalEliminar();
      }





  const seleccionarPalabra=(artista, caso)=>{
    setPalabraSeleccionada(artista);
    (caso==="Editar")?abrirCerrarModalEditar()
    :
    abrirCerrarModalEliminar()
  }

  const abrirCerrarModalInsertar=()=>{
    setModalInsertar(!modalInsertar);
  }

  
  const abrirCerrarModalEditar=()=>{
    setModalEditar(!modalEditar);
  }

  const abrirCerrarModalEliminar=()=>{
    setModalEliminar(!modalEliminar);
  }

  useEffect(() => {
    
    const RefTra = firebase.database().ref('Traductor');
    RefTra.on('value', (snapshot) =>  {

      const traduc = snapshot.val();
      const entries  = []; 
      for ( let id in traduc ) {
        entries.push( {id, ...traduc[id]})
      }
      setData(entries);

    })
}, []);

  const bodyInsertar=(
    <div className={styles.modal}>
      <h3>Agregar nueva palabra</h3>
      <TextField className={styles.inputMaterial} label="Palabra" name="palabra" onChange={handleChange}/>
      <br />
      <TextField className={styles.inputMaterial} label="Significado" name="significado" onChange={handleChange}/>          
<br />

      <div align="right">
        <Button color="primary" onClick={crearPalabra}>Insertar</Button>
        <Button onClick={()=>abrirCerrarModalInsertar()}>Cancelar</Button>
      </div>
    </div>
  )

  const bodyEditar=(
    <div className={styles.modal}>
      <h3>Editar Palabra</h3>
      <TextField className={styles.inputMaterial} label="Palabra" name="palabra" onChange={handleChange} value={palabraSeleccionada&&palabraSeleccionada.palabra}/>
      <br />
      <TextField className={styles.inputMaterial} label="Significado" name="significado" onChange={handleChange} value={palabraSeleccionada&&palabraSeleccionada.significado}/>          
<br />

      <div align="right">
        <Button color="primary" onClick={ActualizarPalabra}>Editar</Button>
        <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const bodyEliminar=(
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar la palabra? <b>{palabraSeleccionada && palabraSeleccionada.palabra}</b>? </p>
      <div align="right">
        <Button color="secondary" onClick={BorrarPalabra}>Sí</Button>
        <Button onClick={()=>abrirCerrarModalEliminar()}>No</Button>

      </div>

    </div>
  )

  return (
    <div className="App">
        <Navbar/>
        <br />
    

<div>
  
    </div>
      <br />
      <Button onClick={()=>abrirCerrarModalInsertar()}>Insertar Palabra</Button>
      <br /><br />
     <MaterialTable
          columns={columns}
          data={entries}
          title="Ingreso de palabras Newen Traductor"  
          actions={[
            {
              icon: 'edit',
              tooltip: 'Editar Artista',
              onClick: (event, rowData) => seleccionarPalabra(rowData, "Editar")
            },
            {
              icon: 'delete',
              tooltip: 'Eliminar Artista',
              onClick: (event, rowData) => seleccionarPalabra(rowData, "Eliminar")
            }
          ]}
          options={{
            actionsColumnIndex: -1,
          }}
          localization={{
            header:{
              actions: "Acciones"
            }
          }}
        />

        <br />
        <button class="btn btn-success" onClick={logout}>Logout</button>


        <Modal
        open={modalInsertar}
        onClose={abrirCerrarModalInsertar}>
          {bodyInsertar}
        </Modal>

        
        <Modal
        open={modalEditar}
        onClose={abrirCerrarModalEditar}>
          {bodyEditar}
        </Modal>

        <Modal
        open={modalEliminar}
        onClose={abrirCerrarModalEliminar}>
          {bodyEliminar}
        </Modal>
    </div>
  );
}

export default Traductor;