const AWS = require('aws-sdk');

AWS.config.update({region: 'us-east-1'});

const sqs = new AWS.SQS({apiVersion: '2012-11-05'});

const SQS_QUEUE_URL = process.env.SQS_QUEUE_URL;

const params = {
    MessageAttributes: {
        "app-path": {
            DataType: "String",
            StringValue: "/ping"
        }
    },
    MessageBody: "Information about current NY Times fiction bestseller for week of 12/11/2016.",
    MessageDeduplicationId: "TheWhistler",  // Required for FIFO queues
    MessageGroupId: "Group1",  // Required for FIFO queues
    QueueUrl: SQS_QUEUE_URL
};

exports.handler =  async function(event, context) {
    console.log("EVENT: \n" + JSON.stringify(event, null, 2));
    console.log("CONTEXT: \n" + JSON.stringify(context, null, 2));
    await sqs.sendMessage(params).promise();
    return context.logStreamName;
}
