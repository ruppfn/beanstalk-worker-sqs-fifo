variable "tasks" {
  type = list(
    object({
      name     = string
      url      = string
      schedule = string
    })
  )
}

variable "lambda_arn" {
  type        = string
  description = "ARN of the Lambda that will send messages to the SQS"
}
