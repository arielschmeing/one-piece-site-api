const id_request = document.querySelector('#id_request')
const btn_search = document.querySelector('#btn_search')
const btn_more = document.querySelector('#btn_more')
const btn_theme = document.querySelector('#btn_theme')

const section_father = document.querySelector('#father')
const content = document.querySelector('#content')
const loadbox = document.querySelector('#preload')

const fetchAPI = (value) => {

    const result = fetch(`https://api.api-onepiece.com/v2/characters/en/${value}`)
        .then((response) => response.json())
        .then((personagem) => {
            return personagem
        })
    return result
}

btn_search.addEventListener('click', async (event) => {

    // Requesting API
    loadbox.style.display = 'block'
    document.body.style.cursor = 'progress'
    
    // Clear Div
    content.textContent = ''

    event.preventDefault()
    const result = await fetchAPI(id_request.value)
    
    // Clear Div Again
    content.textContent = ''

    document.body.style.cursor = 'auto'
    loadbox.style.display = 'none'

    // On API
    const character_propries = Array.from({
        length: 8
    },() => document.createElement('p'))

    // Object is valid or not
    if(result == null || id_request.value == '') {
        
        window.alert('ID Inválido coloque novamente')
        id_request.value = ''
        id_request.focus()

    }else {
        
        character_propries[0].textContent = `Nome: ${result.name}`
    
        // Using Logic Operations for String result
        character_propries[1].textContent = `Tamanho: ${result.size || 'desconhecido'}`
        character_propries[2].textContent = `Idade: ${result.age || 'desconhecida'}`
        character_propries[4].textContent = `Recompensa: ${result.bounty || 'desconhecida'}`

        // Concat Age
        if(character_propries[2].textContent == `Idade: ${result.age}`) {

            character_propries[2].textContent = (() => {

                let last_letters = character_propries[2].textContent.slice(
                    0, character_propries[2].textContent.length-3
                )
    
                return last_letters + ' anos'
    
            })()

        }

        character_propries[6].textContent = `Trabalho: ${result.job}`
    
        if(result.status == 'living') {
            character_propries[5].textContent = 'Status: Vivo'
        }else {
            character_propries[5].textContent = 'Status: Morto'
        }

        character_propries[7].textContent = `É Imperador? ${result.crew.is_yonko ? 'Sim' : 'Não'}`


        try {
    
            character_propries[3].textContent = `Fruta: ${result.fruit.roman_name || result.fruit.name}`
    
        } catch (error) {
    
            character_propries[3].textContent = `Fruta: não possui`
    
        }
    
        // Add propries for html in content
        for(let i=0; i < character_propries.length ;i++) {
    
            content.appendChild(character_propries[i])
    
        }

        id_request.focus()

        // Button Read More
        btn_more.addEventListener('click', () => {

            
            section_father.classList.toggle('active_btn')

            if(section_father.classList.contains('active_btn')) {

                btn_more.setAttribute('value','Ler menos')

            }else {

                btn_more.setAttribute('value','Ler mais')

            }

        })

    }
    
})

btn_theme.addEventListener('click', () => {

    section_father.classList.toggle('alter_theme')

    if(section_father.classList.contains('alter_theme')) {
        btn_theme.setAttribute('value','Mudar tema claro')
        document.documentElement.style.setProperty('--main-blue', '#2c2f33')
        document.documentElement.style.setProperty('--main-blue2', '#23272a')
        document.documentElement.style.setProperty('--main-black', '#7289da')
        document.documentElement.style.setProperty('--main-white', '#ffffff')
    }else {
        btn_theme.setAttribute('value','Mudar tema escuro')
        document.documentElement.style.setProperty('--main-blue', 'rgb(122, 185, 236)')
        document.documentElement.style.setProperty('--main-blue2', 'rgb(92, 159, 214)')
        document.documentElement.style.setProperty('--main-black', 'rgb(58, 58, 58)')
        document.documentElement.style.setProperty('--main-white', 'rgb(228, 228, 228)')
    }

})