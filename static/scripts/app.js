showAllCupcakes()

async function showAllCupcakes() {
    res = await axios.get('/api/cupcakes')
    cupcakes = res.data.cupcakes
    clearAndAppend(cupcakes)  
}

async function showSearchResults(term) {
    res = await axios.post('/api/cupcakes/search', {term})
    cupcakes = res.data.cupcakes
    if (cupcakes.length) {
        clearAndAppend(cupcakes)
    } else {
        $gallery.empty().append('<h3>Whoops! No matching results.</h3>')
    }
    
}

async function showDetails(id) {
    res = await axios.get(`/api/cupcakes/${id}`)
    cupcake = res.data.cupcake
    clearAndAppendDetails(cupcake)
}

async function addCupcake() {
    let flavor = $('#add-form input[name=flavor]').val()
    let size = $('#add-form input[name=size]').val()
    let rating = $('#add-form input[name=rating]').val()
    let image = $('#add-form input[name=image]').val()

    data = {
        flavor: flavor,
        size: size,
        rating: rating,
        image: image
    }

    console.log(data)
    
    await axios.post('/api/cupcakes', data)
}

async function updateCupcake(id, data) {
    await axios.post(`/api/cupcakes/${id}`, data)
}

async function deleteCupcake(id) {
    await axios.delete(`/api/cupcakes/${id}`)
}


// EVENT HANDLERS


$('#add-form').on('submit', async function cupcakeAddHandler(e) {
    e.preventDefault()
    await addCupcake()
    await showAllCupcakes()
    $(':input', '#add-form').val('')
})

$('#search-form').on('submit', async function searchHandler(e) {
    e.preventDefault()
    let term = $('#search-form input[name=term]').val()
    await showSearchResults(term)
    $(':input', '#search-form').val('')
})

$gallery.on('click', '.update-submit', async function cupcakeUpdateHandler(e) {
    e.preventDefault()
    let id = $(this).parent().parent().parent().data('id') 
    let flavor = $('#update-form input[name=flavor]').val()
    let size = $('#update-form input[name=size]').val()
    let rating = $('#update-form input[name=rating]').val()
    let image = $('#update-form input[name=image]').val()

    data = {
        flavor: flavor,
        size: size,
        rating: rating,
        image: image
    }

    console.log(id, data)

    await updateCupcake(id, data)
    await showAllCupcakes()
    $(':input', '#update-form').val('')
})

$gallery.on('click', '.update-btn', async function cupcakeUpdateHandler(){
    const id = $(this).parent().parent().parent().data('id')
    await showDetails(id)
})

$gallery.on('click', '.cancel-btn', async function cupcakeCancelHandler(e){
    await showAllCupcakes()
})

$gallery.on('click', '.delete-btn', async function cupcakeDeleteHandler() {
    const id = $(this).parent().parent().parent().data('id')
    await deleteCupcake(id)
    $(this).parent().parent().parent().parent().remove()
})