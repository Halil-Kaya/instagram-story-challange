import { Job, Queue } from 'bull';
import { config } from '../../config';

const Bull = require('bull');

const queues = new Map<String, Queue>();

export const getQueue = (queueName: string): Queue => {
    if (queues.get(queueName)) {
        return queues.get(queueName);
    }
    const newQueue = new Bull(queueName, {
        redis: config.redis
    });
    queues.set(queueName, newQueue);
    return newQueue;
};

export const getJobById = async <T>(queueName: string, jobName: string): Promise<Job<T>> => {
    const queue: Queue = getQueue(queueName);
    return queue.getJob(jobName);
};

export const runJob = async (job: Job): Promise<void> => {
    const QUEUE_NAME = job.queue.name;
    const JOB_NAME = job.name;
    const queue: Queue = getQueue(QUEUE_NAME);
    await job.remove();
    await queue.add(JOB_NAME, job.data, {
        ...job.opts,
        delay: 0
    });
};
