
//Chama o módulo Remote para conversar entre processosmódulos
const electron = require('electron');
const Store = require('electron-store');
const {ipcRenderer} = electron;
const dataBase = new Store();
let count;

//Adiciona um Listener ao Botao de Adicionar Estratégia
document.querySelector('#IdBotaoAdicionarEstrategia').addEventListener('click', AbrirAddEstrategia);

//Adiciona um Listener ao Botão de Fechar a Janela
document.querySelector('#IdBotaoFechar').addEventListener('click',FecharJanela);

//Função para enviar para o mainRenderer uma informação, uma mensagem
function AbrirAddEstrategia(e){

    e.preventDefault();            
    ipcRenderer.send('AbrirAddEstrategia'); //Envia mensagem para o mainRenderer
}

function FecharJanela(e){

    e.preventDefault();            
    ipcRenderer.send('FecharJanela'); //Envia mensagem para o mainRenderer
}


function geraString() {
    
    //Declaração de String que irá ser transmitida
    let stringFinal = [];
    //TODO: pegar os valores a partir dos comboBox
    stringFinal[0] = document.getElementById('IdPreEstrategia').value;
    stringFinal[1] = document.getElementById('IdEstrategiaInicial').value;;
    stringFinal[2] = document.getElementById('IdEstrategiaPadrao').value;
   
    //Complementa a String com os valores o Input do HTML
    var stringVelBusca = document.getElementById('IdInputVelAtq').value;
    stringFinal[3] = '0';
    stringFinal[4] = stringVelBusca[0];
    stringFinal[5] = stringVelBusca[1];

    var stringVelAtq = document.getElementById('IdInputVelBusca').value;
    stringFinal[6] = '0';
    stringFinal[7] = stringVelAtq[0];
    stringFinal[8] = stringVelAtq[1];

    var stringGiro = document.getElementById('IdInputGiro').value;
    stringFinal[9] = '0';
    stringFinal[10] = stringGiro[0];
    stringFinal[11] = stringGiro[1];
    
    var stringTempoInicial = document.getElementById("IdTempoInicial").value;
    stringFinal[12] = '0';
    stringFinal[13] = stringTempoInicial[0];
    stringFinal[14] = stringTempoInicial[1];
    stringFinal[15] = stringTempoInicial[2];
    stringFinal[16] = stringTempoInicial[3];
    
    window.alert(stringFinal);


    
}

function Check_Strat(ValorEstrategia)
{
    switch(ValorEstrategia)
    {
       case 0: document.getElementById('IdPreEstrategia').innerHTML = "Null"; document.getElementById('IdPreEstrategia').value = "0"; document.getElementById('IdTitleGiro').style.visibility = "hidden"; document.getElementById('IdInputGiro').style.visibility = "hidden"; break;
       case 1: document.getElementById('IdPreEstrategia').innerHTML = "Giro"; document.getElementById('IdPreEstrategia').value = "1"; document.getElementById('IdTitleGiro').style.visibility = "visible"; document.getElementById('IdInputGiro').style.visibility = "visible"; break;
       case 2: document.getElementById('IdPreEstrategia').innerHTML = "Trás Reto"; document.getElementById('IdPreEstrategia').value = "2"; document.getElementById('IdTitleGiro').style.visibility = "hidden"; document.getElementById('IdInputGiro').style.visibility = "hidden"; break;
       case 3: document.getElementById('IdEstrategiaInicial').innerHTML = "Busca Agressiva"; document.getElementById('IdEstrategiaInicial').value = "0"; break;
       case 4: document.getElementById('IdEstrategiaInicial').innerHTML = "Arco"; document.getElementById('IdEstrategiaInicial').value = "1"; break;
       case 5: document.getElementById('IdEstrategiaInicial').innerHTML = "Twister"; document.getElementById('IdEstrategiaInicial').value = "2"; break;
       case 6: document.getElementById('IdEstrategiaInicial').innerHTML = "Pulso"; document.getElementById('IdEstrategiaInicial').value = "3"; break;
       case 7: document.getElementById('IdEstrategiaPadrao').innerHTML = "Busca Agressiva"; document.getElementById('IdEstrategiaPadrao').value = "0"; break;
       case 8: document.getElementById('IdEstrategiaPadrao').innerHTML = "Twister"; document.getElementById('IdEstrategiaPadrao').value = "1"; break;

    }

}

function Check_Debugging(ValorDebugging)
{
    switch(ValorDebugging)
    {
        case 0: document.getElementById('IdDebugging').innerHTML = "Sim"; document.getElementById('IdDebugging').value = "0"; break;
        case 1: document.getElementById('IdDebugging').innerHTML = "Não"; document.getElementById('IdDebugging').value = "1"; break;
    }
}

    ipcRenderer.on('initialize:strats',function(e){

        console.log("Inicialização de Estratégias");
    });

    //Executa rotina quando clica em adicionar uma estratégia
     ipcRenderer.on('item:add', function(e, mensagem){

        let div; //Declara Div em que a estratégia será adicionada

        //Switch para inicializar a div corretamente para receber a estratégia
        switch(mensagem[2])
        {
            case 'IdPreEstrategia': div = document.querySelector('#DivPreEstrategia'); break;
            case 'IdEstrategiaInicial': div = document.querySelector('#DivEstrategiaInicial'); break;
            case 'IdEstrategiaPadrao': div = document.querySelector('#DivEstrategiaPadrao'); break;
        }
        
    
        const a = document.createElement('A');
        a.className = 'w3-bar-item w3-button';
        const itemText = document.createTextNode(mensagem[0]);
        a.appendChild(itemText);
        div.appendChild(a);

        a.onclick = function()
        {
            document.getElementById(mensagem[2]).innerHTML = mensagem[0]; 
            document.getElementById(mensagem[2]).value = mensagem[1]; 
            document.getElementById('IdTitleGiro').style.visibility = "hidden"; 
            document.getElementById('IdInputGiro').style.visibility = "hidden";
        };  
    });

    //Função Para Salvar uma informação 
    function saveData()
    {
        dataBase.set('estrategia.1',1);
        dataBase.set('estrategia.2',2);
        dataBase.set('estrategia.3',3);
        dataBase.set('estrategia.4',4);
        dataBase.set('estrategia.r',5);
        console.log(dataBase.get('estrategia'));
    }

    function showData()
    {
        for (let value in dataBase.get('estrategia')) {
            console.log(dataBase.get('estrategia.'+ value));
        }
    }

    function deleteData()
    {
        dataBase.delete('estrategia');
    }


    function inicializaEstrategias()
    {
        for(let i = 1;i<=count;i++)
        {
        let charStrat = i.toString();
        let div; //Declara Div em que a estratégia será adicionada
        let mensagem  = [];
        mensagem[0] = dataBase.get('estrategia.'+ charStrat +'.nome');
        mensagem[1] = dataBase.get('estrategia.'+ charStrat +'.valor');
        mensagem[2] = dataBase.get('estrategia.'+ charStrat +'.tipo');

        //Switch para inicializar a div corretamente para receber a estratégia
        switch(mensagem[2])
        {
            case 'IdPreEstrategia': div = document.querySelector('#DivPreEstrategia'); break;
            case 'IdEstrategiaInicial': div = document.querySelector('#DivEstrategiaInicial'); break;
            case 'IdEstrategiaPadrao': div = document.querySelector('#DivEstrategiaPadrao'); break;
        }
        
        const a = document.createElement('A');
        a.className = 'w3-bar-item w3-button';
        const itemText = document.createTextNode(mensagem[0]);
        a.appendChild(itemText);
        div.appendChild(a);

        a.onclick = function()
        {
            document.getElementById(mensagem[2]).innerHTML = mensagem[0]; 
            document.getElementById(mensagem[2]).value = mensagem[1]; 
            document.getElementById('IdTitleGiro').style.visibility = "hidden"; 
            document.getElementById('IdInputGiro').style.visibility = "hidden";
        };  
    }
}

    function countData()
    {
        count = 0;
        for (let value in dataBase.get('estrategia')) {
            count = count+1;
        }

        dataBase.set('numeroEstrategias',count);
    }