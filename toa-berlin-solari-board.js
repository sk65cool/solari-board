let SB;

class SolariBoard{

    constructor(container){

        let this_ = this;
        this_.container = document.getElementById(container);

        this_.alphanum = [' ','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','1','2','3','4','5','6','7','8','9','0','&'];

        this_.boards = {
            0: [ 
                ['FIND', 1, 14],
                ['CAPITAL', 2, 14],
                ['SOURCE', 3, 14],
                ['DEALS', 4, 14],
                ['BUILD AWARENESS', 5, 14],
                ['& DRIVE INNOVATION', 6, 14],
                ['FIND', 7, 14],
                ['TALENT', 8, 14],
                ['EXPLORES', 9, 14],
                ['OPPORTUNITIES', 10, 14],
                ['GETS VISIBILITY', 11, 14],
                ['& INSPIRATION', 12, 14]
            ],
            1: [
                ['LEARN FROM', 1, 14],
                ['THE BEST', 2, 14],
                ['STAY ON TOP OF', 3, 14],
                ['DEEP TECH TRENDS', 4, 14],
                ['MEET STARTUPS', 5, 14],
                ['& TALENT', 6, 14],
                ['MEET USERS', 7, 14],
                ['& SALES LEADS', 8, 14],
                ['GROWS THEIR', 9, 14],
                ['NETWORK', 10, 14],
                ['FINDS BUSINESS', 11, 14],
                ['OPPORTUNITIES', 12, 14]
            ],
            2: [
                [' ', 1, 14],
                [' ', 2, 14],
                [' ', 3, 14],
                [' ', 4, 14],
                [' ', 5, 14],
                [' ', 6, 14],
                [' ', 7, 14],
                [' ', 8, 14],
                [' ', 9, 14],
                [' ', 10, 14],
                [' ', 11, 14],
                [' ', 12, 14]
            ]
        }

        if(container)
            this_.init();

    }


    init(){

        let this_ = this;

        let board = '';
        for(let row = 1; row <= 12; row++){
            board += '<div class="solari-board-row" data-row="'+row+'">';
                for(let col = 1; col <= 31; col++){
                    board += '<div class="solari-board-cell" data-row="'+row+'" data-col="'+col+'">';
                        board += '<div class="back-top"> </div>';
                        board += '<div class="front-top"> </div>';
                        board += '<div class="front-bottom"> </div>';
                    board += '</div>';
                }
                
            board += '</div>';
        }

        this.container.innerHTML = board;

        this.placeSolariText('FOUNDERS', 1, 1);
        this.placeSolariText('INVESTORS', 3, 1);
        this.placeSolariText('CORPORATES', 5, 1);
        this.placeSolariText('STARTUPS', 7, 1);
        this.placeSolariText('TALENT', 9, 1);
        this.placeSolariText('EVERYONE', 11, 1);

        this.activeBoard = 0;
        this.boardEndedAnimations = 0;

        setTimeout(function(){
            this_.animateBoard(0);    
        }, 2000);
        

    }


    placeSolariText(text, row, col){

        let chars = text.split('');

        let row_ = document.querySelector('.solari-board-row[data-row="'+row+'"]')
        chars.forEach((char, ind) => {
            let cell = row_.querySelector('.solari-board-cell[data-col="'+ ( col + ind ) +'"]');
            cell.childNodes[1].innerHTML = char.toUpperCase();
            cell.childNodes[2].innerHTML = char.toUpperCase();
        });

    }


    animateBoard(board){

        let this_ = this;

        this.boards[board].forEach((line) => {
            let text = line[0];
            let chars = text.split('');
            let row = line[1];
            let col = line[2];

            if(chars.length < 18)/* 18 - board right side length */
                document.querySelectorAll('.solari-board-cell[data-row="'+ ( row ) +'"]').forEach((cell) => {
                    if(cell.dataset.col > col + chars.length - 1 && cell.childNodes[1].innerHTML != ' ')
                        this_.animateCell(cell, ' ', true);
                });

                chars.forEach((char, ind) => {
                    let cell = document.querySelector('.solari-board-cell[data-row="'+ ( row ) +'"][data-col="'+ ( col + ind ) +'"]');
                    this_.animateCell(cell, char);
                });
        })
    }


    animateCell(cell, to_char, clear = false){

        let this_ = this;
        
        let back_top = cell.childNodes[0];
        let front_top = cell.childNodes[1];
        let front_bottom = cell.childNodes[2];
        let current_char = front_top.textContent;
        let current_ind = this.alphanum.indexOf(current_char);
        
        let next_ind = current_ind + 1;
        if(next_ind > this.alphanum.length - 1)
            next_ind = 0;

        let next_char = this.alphanum[next_ind];

        back_top.innerHTML = next_char;

        let show_front_bottom = false;

        let speed = (clear) ? .005 : .01+.01*Math.random();
        let delay = (clear) ? 0 : 0.01*Math.random();

        gsap.to(front_top, speed, { rotateX: '90deg', delay: delay, onUpdate: function(){

            if(this.progress() > 0.5 && !show_front_bottom){
                show_front_bottom = true;
                front_bottom.innerHTML = next_char;
            }

        }, onComplete: function(){
            
            front_top.innerHTML = next_char;
            gsap.set(front_top, { rotateX: 0});

            if(next_char != to_char)
                this_.animateCell(cell, to_char);

            if(!clear){

                this_.boardEndedAnimations++;
                
                if(this_.activeBoard == 0 && this_.boardEndedAnimations == 1572)
                    setTimeout(function(){
                        this_.activeBoard = 1;
                        this_.boardEndedAnimations = 0;
                        this_.animateBoard(1);
                    }, 4000);

                if(this_.activeBoard == 1 && this_.boardEndedAnimations == 2978)
                    setTimeout(function(){
                        this_.activeBoard = 2;
                        this_.boardEndedAnimations = 0;
                        this_.animateBoard(2);
                    }, 4000);

                if(this_.activeBoard == 2 && this_.boardEndedAnimations == 2920)
                    setTimeout(function(){
                        this_.activeBoard = 0;
                        this_.boardEndedAnimations = 0;
                        this_.animateBoard(0);
                    }, 3000); 
            
            }
            
            
        }})            
    }

}


window.addEventListener('DOMContentLoaded', () => {

    SB = new SolariBoard('solari-board');

});