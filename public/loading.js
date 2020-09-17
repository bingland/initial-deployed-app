let loading = document.querySelector('#loader')
let counter = 0

let clock = setInterval(() => {
    loading = document.querySelector('#loader')

    if (loading == null) { 
        console.log('cleared timout')
        clearInterval(clock)
    }
    else if (counter === 3) {
        loading.innerHTML = 'Loading.'
        counter = 0
        console.log('counter reached 3')
    } else {
        loading.innerHTML += '.'
        counter += 1
        console.log('adding dot')
    }
}, 500)