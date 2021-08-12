const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
	try {
		const tagData = await Tag.findAll({
			include: [{ model: Product }],
		});
		if (!tagData) {
			res.status(404).json({ message: 'No tag(s)' });
			return;
		}
		res.status(200).json(tagData);
	} catch (e) {
		res.status(500).json(e);
	}
});

router.get('/:id', async (req, res) => {
	try {
		const tagData = await Tag.findByPk(req.params.id, {
			include: [{ model: Product }],
		});
		if (!tagData) {
			res.status(404).json({ message: 'No category found' });
			return;
		}
		res.status(200).json(tagData);
	} catch (e) {
		res.status(500).json(e);
	}
});

router.post('/', async (req, res) => {
	// create a new tag
	try {
		const tagData = await Tag.create(req.body);
		res.status(200).json(tagData);
	} catch (e) {
		res.status(500).json(e);
	}
});

router.put('/:id', async (req, res) => {
	try {
		const tagData = await Tag.update(req.body, {
			where: {
				id: req.params.id,
			},
		});
		res.status(200).json(tagData);
	} catch (e) {
		res.status(500).json(e);
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const tagData = await Tag.destroy({
			where: {
				id: req.params.id,
			},
		});
		res.status(200).json(tagData);
	} catch (e) {
		res.status(500).json(e);
	}
});

module.exports = router;
