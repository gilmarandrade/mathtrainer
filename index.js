function getRandomArbitrary(min, max) {
    return (Math.random() * (max - min) + min).toFixed(2);
}

let box1, box2;
let num1, num2;

function init() {
    box1 = document.querySelector("#option1");
    box2 = document.querySelector("#option2");

    box1.addEventListener('click', () => {
        verify(num1, box1);
    });
    
    box2.addEventListener('click', () => {
        verify(num2, box2);
    });

    restart();
}

function verify(option, box) {
    if(option == Math.max(num1, num2))
    {
        box.classList.add('success');
    }
    else {
        box.classList.add('error');
    }

    document.querySelector('body').classList.add('loading');
    setTimeout(restart, 2000);
}

function restart() {
    num1 = getRandomArbitrary(0,10);
    num2 = getRandomArbitrary(0,10);
    
    box1.innerHTML = num1;
    box2.innerHTML = num2;

    document.querySelector('body').classList.remove('loading');
    box1.classList.remove('success', 'error');
    box2.classList.remove('success', 'error');
}

init();