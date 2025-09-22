import { NimGame } from './game.js';
import { NimRenderer } from './renderer.js';

/**
 * Controlador principal do jogo Nim.
 * Coordena a lógica (NimGame) e a renderização (NimRenderer).
 */
class NimController {
    constructor() {
        const modeIsCPU = document.querySelector('#nim-mode')?.value === '1';
        this.game = new NimGame(undefined, modeIsCPU);
        this.renderer = new NimRenderer(this.game);
        this.status = document.querySelector('#nim-status');

        document.querySelector('#nim-set-piles').addEventListener('click', () => this.setPiles());
        document.querySelector('#nim-reset').addEventListener('click', () => this.reset());
        document.querySelector('#nim-mode').addEventListener('change', () => this.reset());

        this.reset();
    }

    /**
    * Reinicia o jogo para o estado inicial.
    */
    reset() {
        const piles = [3, 4, 5];
        this.game.vsCPU = document.querySelector('#nim-mode').value === '1';
        this.game.reset(piles);
        document.querySelector('#nim-piles-input').value = piles.join(',');
        this.update();
    }

    /**
     * Define as pilhas com base no input do usuário.
     */
    setPiles() {
        const raw = document.querySelector('#nim-piles-input').value
        .split(',')
        .map(n => parseInt(n.trim()))
        .filter(n => n > 0);
        if (raw.length === 0) {
        alert('Informe pilhas válidas (ex: 3,4,5)');
        return;
        }
        this.game.vsCPU = document.querySelector('#nim-mode').value === '1';
        this.game.reset(raw);
        this.update();
    }

    /**
     * Atualiza a renderização do tabuleiro e o status do jogo.
     */
    update() {
        this.renderer.render((pile, remove) => this.onTokenClick(pile, remove));
        this.updateStatus();
    }

    /**
     * Processa o clique do jogador em um token.
     */
    onTokenClick(pileIndex, removeCount) {
        if (!this.game.removeTokens(pileIndex, removeCount)) return;
        this.update();

        if (!this.game.gameOver && this.game.vsCPU && this.game.currentPlayer === 2) {
        setTimeout(() => {
            this.game.cpuMove();
            this.update();
        }, 600);
        }
    }
    
    /**
     * Atualiza a mensagem de status exibida na tela.
     */
    updateStatus() {
        if (this.game.gameOver) {
        const winner = this.game.currentPlayer === 1 ? 'Jogador 1' : (this.game.vsCPU ? 'CPU' : 'Jogador 2');
        this.status.textContent = `${winner} venceu! 🎉`;
        } else {
        const turnName = this.game.currentPlayer === 1 ? 'Jogador 1' : (this.game.vsCPU ? 'CPU' : 'Jogador 2');
        this.status.textContent = `Vez de: ${turnName}. Pilhas: ${this.game.piles.join(', ')}`;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => new NimController());