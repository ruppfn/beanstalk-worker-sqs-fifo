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
