const kafka = require('kafka-node');
const kafkaConf = require('../../../config/webConf').kafkaConf;
const logger = require('../../logger');
const TaskService = require('./TaskService');
const path = require('path');
const KafkaDao = require('../../dao/KafkaDao');

const KafkaConsumer = {};


const options = {
	host: kafkaConf.zkHost,
	sessionTimeout: 30000,
	outOfRangeOffset: 'earliest',
	groupId: 'test-consumer-group',
};

const consumer = new kafka.ConsumerGroup(options, [kafkaConf.topic]);

KafkaConsumer.consume = () => {
	let count = 0;
	consumer.on('message', message => {
		count++;
		try {
			if (count == kafkaConf.maxCount) {
				consumer.pause();
			}
			let task_no = JSON.parse(message.value).task_no;
			KafkaDao.updateTask({
				status: 'running'
			}, task_no);
			TaskService.addTask(JSON.parse(message.value)).then(taskNo => {
				getTaskStatus(taskNo, ret => {
					count--;
					consumer.resume();
				});
			}).catch(err => console.info(err));
		} catch (e) {
			logger.error('[KafkaConsumer.consume]:', e);
		}
	});
};

function getTaskStatus(taskNo, cb) {
	let t = null,
		timeout = 60 * 1000,   // 60S 超时
		start = new Date().getTime();
	let f = async function () {
		if (new Date().getTime() - start >= timeout) {
			clearTimeout(t);
			logger.error('getTaskStatus err: timeout');
			return;
		}
		let ret = await TaskService.getTaskRsp(taskNo).catch(err => logger.info('[getTaskStatus TaskService.getTaskRsp]:', err));
		if (ret && ret.status == 1) {
			t = setTimeout(f, 1000);
		} else {
			clearTimeout(t);
			cb(ret);
		}
	};
	t = setTimeout(f, 1000);
}

consumer.on('error', err => {
	logger.info('kafka-consumer error:', err);
});

process.once('SIGINT', () => {
	consumer.close(true, () => {
	});
});


module.exports = KafkaConsumer;