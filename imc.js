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

btnRemMaior.addEventListener("click", () => {
    let listaImcs = document.querySelectorAll(".imc");
    console.log(listaImcs);
    if (listaImcs.length > 0){
        let maiorImc = parseFloat(listaImcs[0].innerHTML);
        let indexImcRemovivel = 0;
        for (let i = 0; i < listaImcs.length; i++){
            if (parseFloat(listaImcs[i].innerHTML) >= maiorImc){
                maiorImc = parseFloat(listaImcs[i].innerHTML);
                indexImcRemovivel = i;
            }
        }
        listaImcs[indexImcRemovivel].parentElement.remove();
    }else{
        alert("Sem registros na tabela");
    }
})

btnRemMenor.addEventListener("click", () => {
    let listaImcs = document.querySelectorAll(".imc");
    if (listaImcs.length > 0){
        let menorImc = listaImcs[0].innerHTML;
        let indexImcRemovivel = 0;
        for (let i = 0; i < listaImcs.length; i++){
            if (listaImcs[i].innerHTML <= menorImc){
                menorImc = listaImcs[i].innerHTML;
                indexImcRemovivel = i;
            }
        }
        listaImcs[indexImcRemovivel].parentElement.remove();
    }else{
        alert("Sem registros na tabela");
    }
})

btnEnviar.addEventListener("click",() => {
    let imc = calcularImc(peso.value,altura.value);
    if (checarNumero(peso.value, "p") && checarNumero(altura.value, "a")){
        let table = document.querySelector("table");
        let tr = document.createElement("tr");
        let valores = Array(nome.value,parseFloat(peso.value).toFixed(2),parseFloat(altura.value).toFixed(2),imc,definirStatus(imc));
        for (let i = 0; i < valores.length; i++){
            let td = document.createElement("td");
            td.innerHTML = valores[i];
            if (i == 3){
                td.setAttribute("class","imc");
            }
            tr.append(td);
        }
        let td = document.createElement("td");
        let div = document.createElement("div");
        div.setAttribute("class", "botoes");
        td.append(div);
        
        let btnExcluir = document.createElement("button");
        btnExcluir.setAttribute("class", "excluir");
        btnExcluir.innerText = "Excluir";
        btnExcluir.addEventListener("click", excluirLinha);
        div.append(btnExcluir);

        let btnMaisPeso = document.createElement("button");
        btnMaisPeso.setAttribute("class","maisPeso");
        btnMaisPeso.innerText = "+ Peso";
        btnMaisPeso.addEventListener("click", aumentarPeso);
        div.append(btnMaisPeso);
        
        let btnMenosPeso = document.createElement("button");
        btnMenosPeso.setAttribute("class","menosPeso");
        btnMenosPeso.innerText = "- Peso";
        btnMenosPeso.addEventListener("click", diminuirPeso);
        div.append(btnMenosPeso);
        
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

function checarNumero(valor, inputTestado){
    if (inputTestado == "p"){
        if (valor > 0.00 && valor <= 500.00){
            return true;
        }
    }
    if (valor > 0.00 && valor <= 3.00){
        return true;
    }
}

function calcularImc(valorP, valorA){
    return (valorP/Math.pow(valorA,2)).toFixed(2);
}

function excluirLinha(e){
    let btnExcluir = e.target;
    btnExcluir.parentElement.parentElement.parentElement.remove();
}

function aumentarPeso(e){
    let btnMaisPeso = e.target;
    let linhaEscolhida = btnMaisPeso.parentElement.parentElement.parentElement;
    let valorPeso = parseFloat(linhaEscolhida.children[1].innerText);
    let valorAltura = parseFloat(linhaEscolhida.children[2].innerText);
    if (checarNumero(valorPeso+0.5, "p")){
        linhaEscolhida.children[1].innerHTML = (valorPeso+0.5).toFixed(2);
    }else{
        alert("Peso máximo atingido");
    }
    linhaEscolhida.children[3].innerHTML = calcularImc(valorPeso+0.5, valorAltura);
    linhaEscolhida.children[4].innerHTML = definirStatus(calcularImc(valorPeso+0.5, valorAltura));
}

function diminuirPeso(e){
    let btnMenosPeso = e.target;
    let linhaEscolhida = btnMenosPeso.parentElement.parentElement.parentElement;
    let valorPeso = parseFloat(linhaEscolhida.children[1].innerText);
    let valorAltura = parseFloat(linhaEscolhida.children[2].innerText);
    if (checarNumero(valorPeso-0.5, "p")){
        linhaEscolhida.children[1].innerHTML = (valorPeso-0.5).toFixed(2);
    }else{
        alert("Peso mínimo atingido");
    }
    linhaEscolhida.children[3].innerHTML = calcularImc(valorPeso-0.5, valorAltura);
    linhaEscolhida.children[4].innerHTML = definirStatus(calcularImc(valorPeso-0.5, valorAltura));
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