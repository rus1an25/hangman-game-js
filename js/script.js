window.addEventListener('DOMContentLoaded', () => {

    //Initilizations
    //===========================================================
    const welcomeScreen = document.querySelector('#welcome_screen');
    const gameScreen = document.querySelector('#game_screen');
    const successFinishScreen = document.querySelector('#success_finish_screen');
    const looseFinishScreen = document.querySelector('#loose_finish_screen');
    const hiddenWord = document.querySelector('.hidden_word');
    const promptToWord = document.querySelector('.prompt_to_word');
    const btnInput = document.querySelector('.input');
    const btnTry = document.querySelectorAll('.try');
    const letters = document.querySelector('.letters');

    const RUS = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';
    const ENG = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    let isWin = isLoose = false;

    let lang = ENG;
    let word = prompt = '';
    let countTrue = countError = 0;

    let regexWord = /^[a-zA-Z]{0,12}$/i;

    paintingGallows();

    //Functions
    //===========================================================
    const generateAlphabet = lang => {
        lang.split('').map(letter => {
            const div = document.createElement('div');
            div.classList.add('letter');
            div.innerHTML = letter;
            return letters.appendChild(div);
        });
    }

    const deleteAlphabet = () => {
        letters.replaceChildren();
    }

    const generateTask = () => {
        document.querySelector('.word').innerHTML = '';

        word.split('').map(letter => {
            const div = document.createElement('div');
            div.classList.add('letter_word');
            const span = document.createElement('span');
            span.classList.add('letter_span');
            span.innerHTML = letter;
            div.appendChild(span);
            return document.querySelector('.word').appendChild(div);
        });

        const promptParagraph = document.createElement('p');
        promptParagraph.classList.add('prompt');
        if (prompt === '') {
            promptParagraph.innerHTML = 'Without prompting';
        } else {
            promptParagraph.innerHTML = `Prompt: <span>${prompt}</span>`;
        }
        document.querySelector('.word').appendChild(promptParagraph);
    }

    const changeScreen = (current, next) => {
        let time = 500;
        if (next === successFinishScreen || next === looseFinishScreen) time = 2500;
        if (current === successFinishScreen || current === looseFinishScreen) {
            clearMan();
            deleteAlphabet();
            word = prompt = '';
            isWin = isLoose = false;
        };
        setTimeout(() => {
            countTrue = countError = 0;
            removeClasses(letters.childNodes);
            hiddenWord.value = promptToWord.value = '';
            current.style.opacity = 0;
            current.style.zIndex = 0;
            next.style.opacity = 1;
            next.style.zIndex = 10;
        }, time);
    }

    const showFinishResult = result => {
        if (result) {
            changeScreen(gameScreen, successFinishScreen);
        } else {
            changeScreen(gameScreen, looseFinishScreen);
        }
    }

    const removeClasses = elements => {
        elements.forEach(el => el.classList.remove('true', 'error'));
    }

    //Events
    //===========================================================
    hiddenWord.addEventListener('change', e => {
        word = e.target.value.toUpperCase();
        if (word.match(regexWord) === null) {
            lang = RUS;
            generateAlphabet(lang);
        } else {
            lang = ENG;
            generateAlphabet(lang);
        }
    });

    promptToWord.addEventListener('change', e => {
        prompt = e.target.value;
    });

    btnInput.addEventListener('click', () => {
        if (word !== '') {
            generateTask();
            changeScreen(welcomeScreen, gameScreen);
        }
    });

    btnTry.forEach(btn => {
        btn.addEventListener('click', e => {
            if (e.target.parentNode.id === 'success_finish_screen') {
                changeScreen(success_finish_screen, welcomeScreen);
            } else {
                changeScreen(loose_finish_screen, welcomeScreen);
            }
        });
    })

    letters.addEventListener('click', e => {
        if (e.target.classList.contains('letter')) {
            if (word.includes(e.target.textContent) && !isLoose) {
                e.target.classList.add('true');
                document.querySelectorAll('.letter_word').forEach(item => {
                    if (item.textContent === e.target.textContent) {
                        countTrue++;
                        item.querySelector('span').style.opacity = 1;
                    }
                });
                if (countTrue === word.length) {
                    isWin = true;
                    showFinishResult(true);
                }
            } else {
                if (!e.target.classList.contains('error') && countError < 6 && !isWin) {
                    countError++;
                    e.target.classList.add('error');
                    paintingMan(countError);
                    if (countError === 6) {
                        isLoose = true;
                        showFinishResult(false);
                    }
                }
            }
        }
    });
});