locals {
  crons = yamldecode(file("./cron.yaml")).cron
}

module "events" {
  source = "./events"

  tasks      = local.crons
  lambda_arn = aws_lambda_function.lambda.arn
}
