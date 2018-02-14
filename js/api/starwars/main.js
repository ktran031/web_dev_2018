const getApi = () => {
    fetch('https://swapi.co/api/people/4/')
        .then(res => res.json())
        .then(res => {
            const displayApi = () => {
                let name = res.name,
                    eyes = res.eye_color,
                    height = res.height,
                    mass = res.mass;

                const theName = document.querySelector('#name');
                const theEyes = document.querySelector('#eyes');
                const theHeight = document.querySelector('#height');
                const theMass = document.querySelector('#mass');

                theName.innerHTML = name;
                theEyes.innerHTML = eyes;
                theHeight.innerHTML = height;
                theMass.innerHTML = mass;
            };
            displayApi();
            console.log(res);
        });
};
getApi();
