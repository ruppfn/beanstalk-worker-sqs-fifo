locals {
  lambda_name = "sqs-worker-${var.environment}"
  region      = "us-east-1"
}

provider "aws" {
  region = "us-east-1"
}

data "aws_caller_identity" "current" {}
