/**
 * Representa a lógica central do jogo de Nim.
 */
export class NimGame {
    constructor(initialPiles = [3, 4, 5], vsCPU = false) {
        this.DEFAULT_PILES = initialPiles;
        this.piles = [...initialPiles];
        this.currentPlayer = 1;
        this.vsCPU = vsCPU;
        this.gameOver = false;
    }

    /**
     * Reinicia o jogo com as pilhas fornecidas.
     */
    reset(piles = this.DEFAULT_PILES) {
        this.piles = [...piles];
        this.currentPlayer = 1;
        this.gameOver = false;
    }

    /**
     * Remove as peças de uma pilha
     */
    removeTokens(pileIndex, removeCount) {
        if (this.gameOver || removeCount <= 0 || removeCount > this.piles[pileIndex]) return false;
        this.piles[pileIndex] -= removeCount;
        if (this.checkWin()) this.gameOver = true;
        else this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
        return true;
    }

    /**
     * Verifica se todas as pilhas estão vazias (fim de jogo)
     */
    checkWin() {
        return this.piles.every(p => p === 0);
    }

    /**
     * Executa a jogada do bot com base no cálculo do nim-sum
     */
    cpuMove() {
        if (this.gameOver) return;
        let nimSum = this.piles.reduce((a, b) => a ^ b, 0);

        if (nimSum !== 0) {
            for (let i = 0; i < this.piles.length; i++) {
                const target = this.piles[i] ^ nimSum;
                if (target < this.piles[i]) {
                this.piles[i] = target;
                break;
                }
            }
        } else {
            for (let i = 0; i < this.piles.length; i++) {
                if (this.piles[i] > 0) {
                this.piles[i] -= 1;
                break;
                }
            }
        }
        if (this.checkWin()) this.gameOver = true;
        else this.currentPlayer = 1;
    }
}