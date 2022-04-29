const huPlayer = 'x';
const aiPlayer = 'o';
const winPatterns = [
    [0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2]
]
export default class AI {

    constructor(cell_vals) {
        this.board = [0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => {
            return cell_vals['c' + (i + 1)]?cell_vals['c' + (i + 1)]:i
        });
    }


    bestNextMove() {
        return "c"+(this.minimax(this.board, aiPlayer).index+1);
    }


    emptyCells() {
        return this.board.filter(s => typeof s == 'number');
    }

    checkWin(board, player) {
        let plays = board.reduce((a, e, i) =>
            (e === player) ? a.concat(i) : a, []);
        let gameWon = null;
        for (let [index, win] of winPatterns.entries()) {
            if (win.every(elem => plays.indexOf(elem) > -1)) {
                gameWon = { index: index, player: player };
                break;
            }
        }
        return gameWon;
    }

    minimax(newBoard, player) {
        var availSpots = this.emptyCells();

        if (this.checkWin(newBoard, huPlayer)) {
            return { score: -10 };
        } else if (this.checkWin(newBoard, aiPlayer)) {
            return { score: 10 };
        } else if (availSpots.length === 0) {
            return { score: 0 };
        }
        var moves = [];
        for (var i = 0; i < availSpots.length; i++) {
            var move = {};
            move.index = newBoard[availSpots[i]];
            newBoard[availSpots[i]] = player;

            if (player == aiPlayer) {
                var result = this.minimax(newBoard, huPlayer);
                move.score = result.score;
            } else {
                var result = this.minimax(newBoard, aiPlayer);
                move.score = result.score;
            }

            newBoard[availSpots[i]] = move.index;

            moves.push(move);
        }

        var bestMove;
        if (player === aiPlayer) {
            var bestScore = -10000;
            for (var i = 0; i < moves.length; i++) {
                if (moves[i].score > bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        } else {
            var bestScore = 10000;
            for (var i = 0; i < moves.length; i++) {
                if (moves[i].score < bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        }

        return moves[bestMove];
    }
}