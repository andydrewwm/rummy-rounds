import { Request, Response } from "express";

export const create = (req: Request, res: Response): void => {
	res.send({ message: 'Game created!' })
};

export const info = (req: Request, res: Response): void => {
	const { id } = req.params;

	if (!id || isNaN(Number(id))) {
		res.status(400).send({ message: 'Invalid or missing game ID' });
	}

	res.send({
		id: id,
		host_id: 456,
		active: true,
		current_hand_number: 0,
		created: Date.now(),
		players: [{}, {}]
	});
}
