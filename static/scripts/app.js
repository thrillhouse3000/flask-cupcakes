let $gallery = $('#cupcake-gallery')

showAllCupcakes()

function makeIndexHtml(cupcake) {
    return `<div class="col-3">
                <div class="card d-flex mb-3" style="width: 10rem; height: auto;" data-id="${cupcake.id}">
                    <img src="${cupcake.image}" alt="" class="card-img-top" style="object-fit: cover; height: 10rem;">
                    <div class="card-body">
                        <p class="card-text">Flavor: ${cupcake.flavor}</p>
                        <p class="card-text">Size: ${cupcake.size}</p>
                        <p class="card-text">Rating: ${cupcake.rating}</p>
                        <button class='btn btn-info update-btn mb-2'>Update Me</button>
                        <button class='btn btn-danger delete-btn mb-2'>Delete Me</button>
                    </div>
                </div>
            </div>`
}

function makeDetailsHtml(cupcake) {
    return `<div class="col">
                <div class="card d-flex mb-3" style="width: auto; height: auto;" data-id="${cupcake.id}">
                    <img src="${cupcake.image}" alt="" class="card-img-top" style="object-fit: contain; height: 20rem">
                    <div class="card-body">
                        <form action='/api/cupcakes/${cupcake.id}' method='POST' id='update-form'>
                            <label for="flavor" class="form-label">Flavor</label>
                            <input type="text" name="flavor" class="form-control text-center" value=${cupcake.flavor}>
                            <label for="size" class="form-label">Size</label>
                            <input type="text" name="size" class="form-control text-center" value=${cupcake.size}>
                            <label for="rating" class="form-label">Rating</label>
                            <input type="number" name="rating" class="form-control text-center" value=${cupcake.rating}>
                            <label for="image" class="form-label">Image URL</label>
                            <input type="text" name="image" class="form-control text-center" value=${cupcake.image}>
                            <button class='btn btn-info update-btn mt-2 mb-2'>Update Me</button>
                        </form>
                        <button class='btn btn-danger cancel-btn mb-2'>Cancel</button>
                    </div>
                </div>
            </div>`
}

async function showAllCupcakes() {
    res = await axios.get('/api/cupcakes')
    cupcakes = res.data.cupcakes
    $gallery.empty()
    for (let i = 0; i < cupcakes.length; i++) {
        htmlCupcake = makeIndexHtml(cupcakes[i])
        $gallery.append(htmlCupcake) 
    }     
}

async function showSearchResults() {
    res = await axios.get('/api/cupcakes/search')
    cupcakes = res.data.cupcakes
    $gallery.empty()
    for (let i = 0; i < cupcakes.length; i++) {
        htmlCupcake = makeHtml(cupcakes[i])
        $gallery.append(htmlCupcake) 
    }   
}

async function showDetails(id) {
    res = await axios.get(`/api/cupcakes/${id}`)
    cupcake = res.data.cupcake
    console.log(cupcake)
    $gallery.empty()
    htmlCupcake = makeDetailsHtml(cupcake)
    $gallery.append(htmlCupcake)
}

async function addCupcake() {
    const flavor = $('#add-form input[name=flavor]').val()
    const size = $('#add-form input[name=size]').val()
    const rating = $('#add-form input[name=rating]').val()
    const image = $('#add-form input[name=image]').val()
    res = await axios.post('/api/cupcakes', {flavor: flavor, size: size, rating: rating, image: image})
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

$('#add-form').on('submit', async function cupcakeAddHandler(e) {
    e.preventDefault()
    await addCupcake()
    await showAllCupcakes()
    $(':input', '#add-form').val('')
})

$gallery.on('click', '.delete-btn', async function cupcakeDeleteHandler() {
    const id = $(this).parent().parent().data('id')
    await deleteCupcake(id)
    $(this).parent().parent().parent().remove()
})

$('#search-form').on('submit', async function searchHandler(e) {
    await showSearchResults()
    $(':input', '#search-form').val('')
})

$gallery.on('click', '.update-btn', async function cupcakeUpdateHandler(e){
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