data "archive_file" "lambda_zip" {
  type        = "zip"
  source_file = "./lambda/index.js"
  output_path = "./dist/lambda.zip"
}

resource "aws_lambda_function" "lambda" {
  function_name = local.lambda_name
  role          = aws_iam_role.lambda_role.arn

  handler = "index.handler"

  filename         = data.archive_file.lambda_zip.output_path
  source_code_hash = data.archive_file.lambda_zip.output_base64sha256

  runtime = "nodejs16.x"

  environment {
    variables = {
      SQS_QUEUE_URL = var.sqs_url
    }
  }
}

resource "aws_lambda_permission" "tasks" {
  for_each      = module.events.rules_arn
  statement_id  = "AllowExecutionFromCloudWatch-${each.key}"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.lambda.function_name
  principal     = "events.amazonaws.com"

  source_arn = each.value
}
