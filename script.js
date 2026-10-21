const tabla = document.getElementById("tabela")
const anio = document.getElementById("anio")
const nroCarrera = document.getElementById("nro-carrera")
/*async function testt() {
    
const resultado = await fetch("https://api.openf1.org/v1/sessions?year=2023", {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
})

const respuesta = resultado.json()
console.log(respuesta)
}

testt()*/
fetch(
    "https://api.openf1.org/v1/sessions?session_type=Race&session_name=Race&year=2023",
  )
    .then((response) => response.json())
    .then((jsonContent) => console.log(jsonContent));