//import Timestamp from './Timestamp';
/**
 * Jogo de encontrar o maior número
 * 
 * A dificuldade deve aumentar com o tempo
 * -aumentando o número de alternativas (numberOfOptions)
 * -diminuindo o intervalo máximo e mínimo (threshold)
 * -aumentando número de casas decimais (decimalDigits)
 * -aumentando número de dígitos inteiros (integerDigits) (valor mínimo)
 */
export default class MathTrainer {
    constructor(){
        this.boxes = [],
        this.numbers = [],
        this.container,

        this.min,
        this.max,
        this.hits = 0,

        this.numberOfOptions = 2,
        this.threshold = 1000,
        this.decimalDigits = 0,
        this.intergerDigits = 1,
        this.timeout = 5000,

        this.timeoutTimer,
        this.startTime,
        this.endTime;
    }
    
    init() {
        document.querySelector('.countdownBar').style.animationDuration = this.timeout/1000 + 's';
        this.container = document.querySelector('#options');

        this.min = Math.pow(10,this.intergerDigits-1) - 1;
        this.max = this.min + this.threshold;
        this.restart();
    }
    
    increaseDifficulty() {
        if(this.hits > 10 && this.numberOfOptions < 4) {
            this.numberOfOptions++;
            this.hits = 0;
        }

        if(this.hits > 3 && this.threshold > 10) {
            this.threshold -= 10;
            this.hits = 0;
        }

        if(this.hits > 15 && this.decimalDigits < 4) {
            this.decimalDigits++;
            this.hits = 0;
        }

        if(this.hits > 20 && this.decimalDigits<3) {
            this.intergerDigits++;
            this.hits = 0;
        }

        this.min = Math.pow(10,this.intergerDigits-1) - 1;
        this.max = this.min + this.threshold;
        console.log(this.hits, this.max, this.min);
    }

    restart() {
        this.numbers = [];
        this.boxes = [];
        
        for(let i=0; i< this.numberOfOptions; i++) {
            this.numbers.push(this.getRandomArbitrary(this.min, this.max));
            this.boxes.push(this.createOptionBox(this.numbers[i]));
        }
        
        this.showOptions();
    }
    
    verifyAnswer(option) {
        document.querySelector('.countdownBar').classList.remove('active');
        clearTimeout(this.timeoutTimer);
        this.endTime = new Date();

        document.querySelector('body').classList.add('--pointer-events-none');
        if(option == Math.max(...this.numbers)) {
            this.hits++;
            document.querySelector('body').classList.add('success');
        }
        else {
            // this.hits--;
            document.querySelector('body').classList.add('error');
        }
        this.increaseDifficulty();
        setTimeout(() => {this.restart()} , 1000);
    }

    showOptions() {
        this.container.innerHTML = "";
        this.boxes.forEach(box => {       
            this.container.appendChild(box);  
        });
        
        document.querySelector('body').classList.remove('--pointer-events-none');
        document.querySelector('body').classList.remove('success');
        document.querySelector('body').classList.remove('error');

        document.querySelector('.countdownBar').classList.add('active');
        this.startTime = new Date();
        this.timeoutTimer = setTimeout(() => {
            console.log('fim do tempo');
            this.verifyAnswer(null);
        } , this.timeout);
    }

    getRandomArbitrary(min, max) {
        return (Math.random() * (max - min) + min).toFixed(this.decimalDigits);
    }

    createOptionBox(value) {
        const box = document.createElement('button');
        box.classList.add('option');
        box.innerHTML = value;
        box.setAttribute('data-value', value);
        box.addEventListener('click', () => {
            this.verifyAnswer(value);
        });
        return box;
    }
}
