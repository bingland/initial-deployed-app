let loading = document.querySelector('#loader')
let counter = 0

let clock = setInterval(() => {
    loading = document.querySelector('#loader')

    if (loading == null) { 
        clearInterval(clock)
    }
    else if (counter === 3) {
        loading.innerHTML = 'Loading.'
        counter = 0
    } else {
        loading.innerHTML += '.'
        counter += 1
    }
}, 500)