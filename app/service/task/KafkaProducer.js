const kafka = require('kafka-node');
const kafkaConf = require('../../../config/webConf').kafkaConf;
const logger = require('../../logger');
const KafkaDao = require('../../dao/KafkaDao');

const KafkaProducer = {};

const client = new kafka.Client(kafkaConf.zkHost);
const producer = new kafka.Producer(client);

producer.on('ready', () => {
	logger.info('Producer is ready');
});

logger.info('connecting kafka');

KafkaProducer.produce = async (message, cb) => {
	await KafkaDao.addTask({
		topic: kafkaConf.topic,
		partition: 0,
		offset: 0,
		status: 'waiting',
		task_no: JSON.parse(message).task_no,
		message: message
	});

	const payloads = [
		{topic: kafkaConf.topic, messages: message}
	];

	producer.send(payloads, (err, data) => {
		if (!!err) {
			logger.info('producer error:', err);
		}
		cb(data);
	});
};

module.exports = KafkaProducer;