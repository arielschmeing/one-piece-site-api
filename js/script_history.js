const content = document.querySelector('#content_history')
const history_characters = JSON.parse(localStorage.getItem('characters'))
const master = document.querySelector('#master')
const btn_historic = document.querySelector('#clear_historic')

const style = (c1, c2, c3, c4) => {

    document.documentElement.style.setProperty('--main-blue', c1)
    document.documentElement.style.setProperty('--main-blue2', c2)
    document.documentElement.style.setProperty('--main-black', c3)
    document.documentElement.style.setProperty('--main-white', c4)

}

if(localStorage.getItem('theme') == 'black') {

    master.classList.add('alter_theme')

    style(
        '#2c2f33',
        '#23272a',
        'rgb(58, 58, 58)',
        '#d7d4d1'
    )

}else {

    style(
        'rgb(122, 185, 236)',
        'rgb(92, 159, 214)',
        'rgb(58, 58, 58)',
        'rgb(228, 228, 228)'
    )

}

if(history_characters != null) {
    content.innerHTML = ''
}

const sections = Array.from({
    length: 10
},() => document.createElement('section'))

const character_propries = Array.from({
    length: 7
},() => document.createElement('p'))

if(history_characters != null) {

    for(let i=0; i < history_characters.length ;i++) {
    
        character_propries[i].innerHTML = `
            ID: ${history_characters[i].id} <br>
            Nome: ${history_characters[i].name}`
    
        content.appendChild(character_propries[i])
        document.body.appendChild(sections[i])
        sections[i].appendChild(character_propries[i])
        master.appendChild(sections[i])
    
        sections[i].classList.add('history_section')
    
    }

}

btn_historic.addEventListener('click', () => {

    if(history_characters == null) {
        window.alert('Você não possui um histórico para excluir')
    }

    localStorage.removeItem('characters')
    window.location.reload()

})