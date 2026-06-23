const router = require('express').Router();
const { getAllSigns, getSignById, saveHistory, getHistory } = require('../controllers/signController');

router.get('/', getAllSigns);
router.get('/history', getHistory);
router.get('/:id', getSignById);
router.post('/history', saveHistory);

module.exports = router;
