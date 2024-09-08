let informacoes = document.querySelector(".info");
let btnEnviar = document.querySelector(".enviar");
let btnRemMaior = document.querySelector(".remMaiorIMC");
let btnRemMenor = document.querySelector(".remMenorIMC");
let nome = informacoes.children[0];
let peso = informacoes.children[1];
let altura = informacoes.children[2];
peso.addEventListener("input",() => {
    let valor = peso.value;
    if (valor < 0){
        peso.value = "";
    }
})
altura.addEventListener("input",() => {
    let valor = altura.value;
    if (valor < 0){
        altura.value = "";
    }
})
btnEnviar.addEventListener("click",() => {
    let imc = (peso.value/Math.pow(altura.value,2)).toFixed(2);
    if (checarNumero(peso.value) && checarNumero(altura.value)){
        let table = document.querySelector("table");
        let tr = document.createElement("tr");
        let valores = Array(nome.value,parseFloat(peso.value).toFixed(2),parseFloat(altura.value).toFixed(2),imc,definirStatus(imc));
        for (let val of valores){
            let td = document.createElement("td");
            td.innerHTML = val;
            tr.append(td);
        }
        let td = document.createElement("td");
        let btnExcluir = document.createElement("button");
        btnExcluir.setAttribute("class", "excluir");
        btnExcluir.innerText = "Excluir";
        btnExcluir.addEventListener("click", () => {
            btnExcluir.parentElement.parentElement.remove();
        })
        td.innerHTML = "<button class='maisPeso'>+ Peso</button><button class='menosPeso'>- Peso</button>";
        td.style.display = "inline-flex";
        tr.append(td);
        table.append(tr);
        nome.value = "";
        peso.value = "";
        altura.value = "";
    }
    else{
        alert("Valores inválidos");
    }
})
function checarNumero(valor){
    if (valor > 0.00 && valor < 300.00){
        return true;
    }
}
function definirStatus(imc){
    if(imc < 18.5) {
        return "<span class='magreza'>Magreza</span>";
    }else if(imc < 25.0){
        return "<span class='saudavel'>Saudável</span>";
    }else if(imc < 30.0){
        return "<span class='sobrepeso'>Sobrepeso</span>";
    }else if(imc < 35.0){
        return "<span class='obesidade1'>Obesidade I</span>";
    }else if(imc < 40.0){
        return "<span class='obesidade2'>Obesidade II</span>";
    }else{
        return "<span class='obesidade3'>Obesidade III</span>";
    }
}