// Please copy and paste your GitHub Repo on line 2 (optional)
// <GitHub Repo>

// JavaScript Assessment Rubric: https://generation.instructure.com/courses/2342/assignments/143783

// Codecademy: https://www.codecademy.com/paths/front-end-engineer-career-path/tracks/fecp-javascript-syntax-part-iii/modules/fecp-challenge-project-find-your-hat/projects/find-your-hat

// Please break down your thinking process step-by-step (mandatory)
// step 1 :



// JS Assessment: Find your hat //

const prompt = require('prompt-sync')({ sigint: true }); // This sends a SIGINT, or “signal interrupt” message indicating that a user wants to exit a program by press Crtl+c
const clear = require('clear-screen');//every turn clear the screen that meant you will not get new field in time you choose the direction
const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(field) {
        this._field = field;
        // this.positionX = 0;
        // this.positionY = 0;
        // Set the "home" position before the game starts
    }



    //print field method to make it eaier 

    // the rest of your code starts here.
    get field() {
        return this._field
    }

    set field(newField) {
        this._field = newField
    }

    play() {
        let x = 0
        let y = 0
        let moveMent;
        let isPlaying = true;
        console.log(this.print());
        while (isPlaying) {
            moveMent = prompt("Select Direction (U = up, L = left, D = down, R = Right)")
            this.field[x][y] = fieldCharacter;

            switch (moveMent.toUpperCase()) {
                case "U":
                    if (x !== 0) {
                        x -= 1
                    } else {
                        console.log("You cant go up, out of map")
                        isPlaying = false;
                    }
                    break;
                case "L":
                    if (y === 0) {
                        console.log("You cant go left, out of map")
                        break;
                    } else {
                        y -= 1
                    }
                    break;
                case "D":
                    if (x === getHeight - 1) {
                        console.log("You cant go down, out of map")
                        break;
                    } else
                        x += 1
                        break;
                case "R":
                    if (y === getWidth - 1) {
                        console.log("You cant go Right, out of map")
                        break;
                    } else {
                        y += 1
                    }
                    break;
                default:
                    console.log('Invalid Entry');
                    break;
            }
            if (this.field[x][y] == hat) {
                console.log("You've successfully retrieved the hat! You win!");
                isPlaying = false;
            } else if (this.field[x][y] === hole) {
                console.log('Game Over! You fell through the hole!');
                isPlaying = false;
                break;
            } else {
                let previousPath = //
                this.field[x][y] = pathCharacter;
                console.log(this.print());
            }
        }
    }

    print() {
        clear();
        // your print map code here
        return this._field.map(row => row.join('')).join('\n');
    }

    static generateField(width, height, percentage) {
        const mapWidth = width
        const mapHeight = height
        const field = new Array(mapWidth);
        for (let i = 0; i < mapHeight; i++) {
            field[i] = Array(mapWidth).fill(fieldCharacter)
        }
        const holeCount = Math.floor((percentage / 100) * (mapHeight * mapWidth));
        for (let i = 0; i < holeCount; i++) {
            const randomRow = Math.floor(Math.random() * mapHeight);
            const randomCol = Math.floor(Math.random() * mapWidth);
            field[randomRow][randomCol] = hole;
        }

        const randomHatHeight = Math.floor(Math.random() * height);
        const randomHatWidth = Math.floor(Math.random() * width);
        field[randomHatHeight][randomHatWidth] = hat;

        field[0][0] = pathCharacter;
        return field
    }


}

let newField = new Field()
let getHeight = prompt("How tall Map?")
let getWidth = prompt("How width Map?")
let getObstacles = prompt("Obstacles percentage?")
const generatedField = Field.generateField(Number(getWidth), Number(getHeight), Number(getObstacles));
// const generatedField = Field.generateField(10, 8, 10);
newField.field = generatedField
newField.play()