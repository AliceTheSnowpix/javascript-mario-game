export function loadImage(url) {
    return new Promise(resolve => {
        const image = new Image();
        image.addEventListener('load', () => {
            resolve(image);
        });
        image.src = url;
    });
}

export function loadLevel(name) {
<<<<<<< HEAD
    return fetch(`./levels/${name}.json`)
=======
<<<<<<< HEAD
    return fetch(`/levels/${name}.json`)
=======
    return fetch(`./levels/${name}.json`)
>>>>>>> b41fbc12b4e05fe7877989389a0908f6e867d99a
>>>>>>> added timer
    .then(r => r.json());
}