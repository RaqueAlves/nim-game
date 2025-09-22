/**
 * Responsável pela renderização do tabuleiro do Nim na tela.
 */

export class NimRenderer {
    constructor(game, rootSelector = '#nim-board') {
        this.game = game;
        this.board = document.querySelector(rootSelector);
    }

    render(onTokenClick) {
        this.board.innerHTML = '';
        this.game.piles.forEach((count, pileIndex) => {
        const pileEl = document.createElement('div');
        pileEl.className = 'nim-pile';
        pileEl.dataset.pile = pileIndex;

        const label = document.createElement('div');
        label.className = 'nim-pile-label';
        label.textContent = `Pilha ${pileIndex + 1} (${count})`;

        const tokens = document.createElement('div');
        tokens.className = 'nim-tokens';

        for (let i = 0; i < count; i++) {
            const token = document.createElement('button');
            token.className = 'nim-token';
            token.textContent = '●';

            token.addEventListener('click', () => onTokenClick(pileIndex, count - i));
            token.addEventListener('mouseenter', () => {
            [...tokens.children].slice(i).forEach(t => t.classList.add('preview'));
            });
            token.addEventListener('mouseleave', () => {
            [...tokens.children].forEach(t => t.classList.remove('preview'));
            });

            tokens.appendChild(token);
        }

        pileEl.appendChild(label);
        pileEl.appendChild(tokens);
        this.board.appendChild(pileEl);
        });
    }
}