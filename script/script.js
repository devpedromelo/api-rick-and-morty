const characterId = document.getElementById('characterId');
const btn = document.getElementById('btn-go');
const btnReset = document.getElementById('btn-clear');
const containerShow = document.getElementById('show-result');
const content = document.getElementById('content');
const img = document.getElementById('img');

//acessando a API
const fetchApi = (value) => {
    const result = fetch(`https://rickandmortyapi.com/api/character/${value}`)
    .then((response) => response.json())
    .then((data) => {
        return data //armazena no result
    });
    
    return result;//armazena no parâmetro
};

const keys = ['name', 'status', 'species', 'gender', 'origin'];
const keysWords = {
    name : 'Nome',
    status : 'Status',
    species : 'Espécie',
    gender : 'Gênero',
    origin : 'Planeta de Origem'
}

const buildResult = (result) => {
    return keys.map((key) => document.getElementById(key))
        .map((elem) => {
            if(elem.checked && (elem.name === 'origin')){
                const newElem = document.createElement('p');
                newElem.innerHTML = `${keysWords[elem.name]} : ${result[elem.name].name}`;
                content.appendChild(newElem);
            }else if(elem.checked && typeof(result[elem.name]) !== 'object'){
                const newElem = document.createElement('p');
                newElem.innerHTML = `${keysWords[elem.name]} : ${result[elem.name]}`;
                content.appendChild(newElem);
            }
        });
}

btn.addEventListener('click', async (e) => {
    e.preventDefault();

    if(characterId.value === ''){
        return content.innerHTML = 'É necessário realizar a filtragem';
    }

    const result = await fetchApi(characterId.value);
    if(content.firstChild === null){
        containerShow.classList.add("show-result")
        img.src = `${result.image}`
        buildResult(result);
    }else{
        content.innerHTML = ''
        containerShow.classList.add("show-result")
        img.src = `${result.image}`
        buildResult(result);
    }
    // content.innerText = `${JSON.stringify(result, undefined, 2)}`
});

btnReset.addEventListener("click", () => location.reload());

// Caso usar os episódios
//
//
//else if(elem.checked && (Array.isArray(result[elem.name])) === true){
//     const arrayResult = result[elem.name].join("\r\n");
//     console.log(arrayResult);
//     const newElem = document.createElement('p');
//     newElem.innerHTML = `${elem.name} : ${result[elem.name]}`;
//     content.appendChild(newElem);
// }else