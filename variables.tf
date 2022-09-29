variable "environment" {
  default = "dev"
}

variable "lambda_role_arn" {
  description = "ARN of the IAM Role that the Lambda will use"
}

variable "sqs_arn" {
  description = "ARN of the SQS that will receive the messages"
}

variable "sqs_url" {
  description = "URL of the SQS that will receive the messages"
}
