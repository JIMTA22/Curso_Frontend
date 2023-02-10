window.onload = () => {
    const parrafo = document.getElementById("text");
    console.log(parrafo.innerText);
/*     parrafo.innerText = 'Ahora se ha actualizado el texto' */
    parrafo.innerHTML = "<li>Elemento 1</li><li>Elemento 2</li>";
}