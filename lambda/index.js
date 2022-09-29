const AWS = require('aws-sdk');

AWS.config.update({region: 'us-east-1'});

const sqs = new AWS.SQS({apiVersion: '2012-11-05'});

const SQS_QUEUE_URL = process.env.SQS_QUEUE_URL;

const makeParams = (url, deduplicationId) => ({
    MessageAttributes: {
        "app-path": {
            DataType: "String",
            StringValue: url
        }
    },
    MessageBody: "a", // Requires at least 1 char
    MessageDeduplicationId: deduplicationId,  // Required for FIFO queues
    MessageGroupId: url,  // Required for FIFO queues
    QueueUrl: SQS_QUEUE_URL
});

exports.handler =  async function(event) {
    const url = event.url;
    if (!url) throw new Error("url is not provided");

    const deduplicationId = `${url}-${new Date().getMinutes()}`;
    const params = makeParams(url, deduplicationId);

    await sqs.sendMessage(params).promise();

    console.log(`Finished. url: ${url} | deduplicationId: ${deduplicationId}`);

}
