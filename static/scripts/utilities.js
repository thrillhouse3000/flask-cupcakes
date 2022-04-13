let $gallery = $('#cupcake-gallery')

function makeHtml(cupcake) {
    return `<div class="col-4">
                <div class="card d-flex mb-3" style="width: 12rem; height: auto;" data-id="${cupcake.id}">
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

function clearAndAppend(arr) {
    $gallery.empty()
    for (let i = 0; i < arr.length; i++) {
        el = makeHtml(arr[i])
        $gallery.append(el) 
    }    
}

function clearAndAppendDetails(el) {
    $gallery.empty()
    elDetails = makeDetailsHtml(el)
    $gallery.append(elDetails)
}