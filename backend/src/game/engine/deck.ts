import { getRandomValues, randomInt } from "crypto";
import { Color, Value, Card } from "./types/card.types";

/**
 * Generates a full Rummy Rounds deck of 108 cards.
 *
 * The deck consists of:
 * - Two copies of each colored number card (1–12) for each color (Red, Yellow, Green, Blue).
 * - Eight Wild cards.
 * - Four Skip cards.
 *
 * Each card is given a unique `id` in the format: `${color}-${value}-${index}`.
 *
 * @returns {Card[]} An array of Card objects representing a full Phase 10 deck.
 */
export function generateDeck(): Card[] {
	let deck: Card[] = [];

	const colors = [Color.Red, Color.Yellow, Color.Green, Color.Blue];
	const values = [
		Value.One, Value.Two, Value.Three, Value.Four, Value.Five, Value.Six,
		Value.Seven, Value.Eight, Value.Nine, Value.Ten, Value.Eleven, Value.Twelve
	];

	for (const color of colors) {
		for (const value of values) {
			addCards(deck, color, value, 2);
		}
	}

	addCards(deck, Color.Wild, Value.Wild, 8);
	addCards(deck, Color.Wild, Value.Skip, 4);

	return deck;
}

/**
 * Shuffles a deck of cards in place using the Fisher-Yates algorithm.
 * 
 * @param {Card[]} deck An array representing the deck of cards to be shuffled.
 * @returns {Card[]} The shuffled deck of cards.
 */
export function shuffle(deck: Card[]): Card[] {
	const n = deck.length;

	for (let index = n - 1; index > 0; index--) {
		let roll = randomInt(index + 1);

		let temp = deck[index];
		deck[index] = deck[roll];
		deck[roll] = temp;
	}

	return deck;
}

/**
 * Deals 10 cards to each player in a round-robin manner.
 * 
 * @param {Card[]} deck - The deck of cards from which the cards will be dealt.
 * @param {number} playerCount - The number of players to deal cards to (e.g., 2, 3, 4, 5).
 * @returns {{ hands: Card[][], remainingDeck: Card[] }} An object containing:
 *   - `hands`: A 2D array, where each sub-array represents a player's hand (an array of 10 cards).
 *   - `remainingDeck`: The deck of cards that were not dealt, after dealing cards to all players.
 */
export function dealHands(deck: Card[], playerCount: number): { hands: Card[][], remainingDeck: Card[] } {
	let hands: Card[][] = Array(playerCount).fill([]).map(() => []);

	const fullDeckSize = deck.length;
	let currentPlayer = 0;
	while (deck.length > 0 && deck.length > fullDeckSize - (playerCount * 10)) {
		hands[currentPlayer].push(deck.shift()!);
		currentPlayer = (currentPlayer + 1) % playerCount;
	}

	return { hands, remainingDeck: deck };
}

// export function drawCard(deck: Card[], discardPile: Card[]): { card: Card, updatedDeck: Card[] } {}

/**
 * Helper function to add a specific number of cards with the same value and color.
 * 
 * @param deck The deck to add cards to.
 * @param color The color of the card.
 * @param value The value of the card.
 * @param count The number of copies of this card to add.
 */
function addCards(deck: Card[], color: Color, value: Value, count: number): void {
	for (let index = 0; index < count; index++) {
		deck.push({
			id: `${color}-${value}-${index}`,
			color: color,
			value: value
		});
	}
}
