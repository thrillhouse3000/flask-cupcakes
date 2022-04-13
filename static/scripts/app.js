showAllCupcakes()

async function showAllCupcakes() {
    res = await axios.get('/api/cupcakes')
    cupcakes = res.data.cupcakes
    clearAndAppend(cupcakes)  
}

async function showSearchResults(term) {
    res = await axios.post('/api/cupcakes/search', {term})
    cupcakes = res.data.cupcakes
    clearAndAppend(cupcakes)
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
    res = await axios.post('/api/cupcakes', data)
}

async function updateCupcake() {
    const flavor = $('#edit-form input[name=flavor]').val()
    const size = $('#edit-form input[name=size]').val()
    const rating = $('#edit-form input[name=rating]').val()
    const image = $('#edit-form input[name=image]').val()
    res = await axios.patch('/api/cupcakes', {flavor: flavor, size: size, rating: rating, image: image})
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

$gallery.on('click', '.update-btn', async function cupcakeUpdateHandler(){
    const id = $(this).parent().parent().data('id')
    await showDetails(id)
})

$('#edit-form').on('submit', async function cupcakeUpdateHandler(e) {
    e.preventDefault()
    await updateCupcake()
    await showAllCupcakes()
    $(':input', '#add-form').val('')
})

$gallery.on('click', '.cancel-btn', async function cupcakeCancelHandler(e){
    await showAllCupcakes()
})

$gallery.on('click', '.delete-btn', async function cupcakeDeleteHandler() {
    const id = $(this).parent().parent().data('id')
    await deleteCupcake(id)
    $(this).parent().parent().parent().remove()
})