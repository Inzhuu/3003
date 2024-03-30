document.addEventListener('DOMContentLoaded', function () {
    showImg()
})

function uploadImg(event) {
    var reader = new FileReader()
    var name = event.target.files[0].name
    reader.addEventListener('load', function () {
        if (this.result && localStorage) {
            window.localStorage.setItem(name, this.result)
            showImg()
        } else {
            alert()
        }
    })
    reader.readAsDataURL(event.target.files[0])
}

function showImg() {
    var parentDiv = document.getElementById('view')
    parentDiv.innerHTML = ''

    var existingImg = []

    for (let i = 0; i < window.localStorage.length; i++) {
        let key = window.localStorage.key(i)
        let src = window.localStorage.getItem(key)
        existingImg.push({ name: key, src: src })
    }

    var imgJson = JSON.stringify(existingImg)
    console.log(imgJson)

    existingImg.forEach(function (image) {
        var imgElement = new Image()
        imgElement.src = image.src
        imgElement.classList.add('img')

        var deleteButton = document.createElement('button')
        deleteButton.innerHTML = 'Delete'
        deleteButton.classList.add('deleteButton')
        deleteButton.onclick = function () {
            deleteImg(image.name)
        }
        parentDiv.appendChild(imgElement)
        parentDiv.appendChild(deleteButton)
    })
}

function deleteImg(key) {
    window.localStorage.removeItem(key)
    var parentDiv = document.getElementById('view')
    var deleteImg = parentDiv.querySelector(
        `img[src="${window.localStorage.getItem(key)}"]`
    )
    if (deleteImg) {
        var deleteBtn = deleteImg.nextElementSibling
        parentDiv.removeChild(deleteImg)
        parentDiv.removeChild(deleteBtn)
    }
    showImg()
}
