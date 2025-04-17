import { describe, it, expect, beforeEach } from 'vitest';
import { dealHands, generateDeck, shuffle } from '../src/game/engine/deck';
import { Card, Value, Color } from '../src/game/engine/types/card.types';

describe('generateDeck', () => {
    const deck = generateDeck();

    it('should return exactly 108 cards', () => {
        expect(deck.length).toBe(108);
    });

    it('should include 2 copies of each color-number pair', () => {
        const redThrees = deck.filter(
            (card: Card) => card.color === Color.Red && card.value === Value.Three
        );
        expect(redThrees.length).toBe(2);
    });

    it('should include 8 wilds and 4 skips', () => {
        const wilds = deck.filter(c => c.value === Value.Wild);
        const skips = deck.filter(c => c.value === Value.Skip);

        expect(wilds.length).toBe(8);
        expect(skips.length).toBe(4);
    });

    it('should have unique IDs', () => {
        const ids = deck.map(c => c.id);
        const uniqueIds = new Set(ids);
        expect(uniqueIds.size).toBe(deck.length);
    });
});

describe('shuffle', () => {
	it('should randomize the deck', () => {
		const originalDeck = generateDeck();
		const shuffledDeck = shuffle([...originalDeck]);

		expect(shuffledDeck).not.toEqual(originalDeck);
	});

	it('should not lose or duplicate any cards', () => {
		const originalDeck = generateDeck();
		const shuffledDeck = shuffle([...originalDeck]);

		expect(shuffledDeck.length).toBe(originalDeck.length);

		const originalCardIds = originalDeck.map(card => card.id).sort();
		const shuffledCardIds = shuffledDeck.map(card => card.id).sort();
		expect(shuffledCardIds).toEqual(originalCardIds);
	});
});

describe('dealHands', () => {
	let deck: Card[];
  
	beforeEach(() => {
		deck = generateDeck();
		shuffle(deck);
	});
  
	it('should deal 10 cards to each player', () => {
		const playerCount = 3;
		const { hands, remainingDeck } = dealHands(deck, playerCount);

		expect(hands.length).toBe(playerCount);
		hands.forEach(hand => {
			expect(hand.length).toBe(10);
		});
	});
  
	it('should have the correct number of remaining cards after dealing', () => {
	  const playerCount = 3;
	  const { hands, remainingDeck } = dealHands(deck, playerCount);
  
	  expect(remainingDeck.length).toBe(108 - 30);
	});
  
	it('should not include dealt cards in the remaining deck', () => {
	  const playerCount = 3;
	  const { hands, remainingDeck } = dealHands(deck, playerCount);
  
	  const dealtCards = hands.flat();
	  const dealtCardIds = new Set(dealtCards.map(card => card.id));
  
	  remainingDeck.forEach(card => {
		expect(dealtCardIds.has(card.id)).toBe(false);
	  });
	});
  
	it('should handle the case with 1 player correctly', () => {
	  const playerCount = 1;
	  const { hands, remainingDeck } = dealHands(deck, playerCount);
  
	  expect(hands.length).toBe(1);
	  expect(hands[0].length).toBe(10);
	  expect(remainingDeck.length).toBe(108 - 10);
	});
  
	it('should handle the case with 5 players correctly', () => {
	  const playerCount = 5;
	  const { hands, remainingDeck } = dealHands(deck, playerCount);
  
	  expect(hands.length).toBe(5);
	  hands.forEach(hand => {
		expect(hand.length).toBe(10);
	  });
	  expect(remainingDeck.length).toBe(108 - 50);
	});
  });
