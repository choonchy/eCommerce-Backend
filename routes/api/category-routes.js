const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
	try {
		const categoryData = await Category.findAll({
			include: { model: Product },
		});
		if (!categoryData) {
			res.status(404).json({ message: 'No categories' });
			return;
		}
		res.status(200).json(categoryData);
	} catch (e) {
		res.status(500).json(e);
	}
});

router.get('/:id', async (req, res) => {
	try {
		const categoryData = await Category.findByPk(req.params.id, {
			include: { model: Product },
		});
		if (!categoryData) {
			res.status(404).json({ message: 'No category found' });
			return;
		}
		res.status(200).json(categoryData);
	} catch (e) {
		res.status(500).json(e);
	}
});

router.post('/', async (req, res) => {
	try {
		const categoryData = await Category.create(req.body);
		res.status(200).json(categoryData);
	} catch (e) {
		res.status(500).json(e);
	}
});

router.put('/:id', async (req, res) => {
	try {
		const categoryData = await Category.update(req.body, {
			where: {
				id: req.params.id,
			},
		});
		if (!categoryData) {
			res.status(404).json({ message: 'No category found' });
			return;
		}
		res.status(200).json(categoryData);
	} catch (e) {
		res.status(500).json(e);
	}
});

router.delete('/:id', async (req, res) => {
	// delete a category by its `id` value
	try {
		const categoryData = await Category.destroy({
			where: {
				id: req.params.id,
			},
		});
		if (!categoryData) {
			res.status(404).json({ message: 'No category found' });
			return;
		}
		res.status(200).json(categoryData);
	} catch (e) {
		res.status(500).json(e);
	}
});

module.exports = router;
