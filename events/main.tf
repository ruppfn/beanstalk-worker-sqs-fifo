resource "aws_cloudwatch_event_rule" "periodic_tasks" {
  for_each = {
    for task in var.tasks : task.name => task
  }

  name = "schedule-${each.value.name}"

  schedule_expression = "cron(${each.value.schedule})"
}

resource "aws_cloudwatch_event_target" "sqs" {
  for_each = {
    for task in var.tasks : task.name => task
  }

  arn   = var.lambda_arn
  rule  = aws_cloudwatch_event_rule.periodic_tasks[each.key].name
  input = <<EOF
  {
    "url": "${each.value.url}"
  }
  EOF
}

output "rules_arn" {
  value = {
    for index, rule in aws_cloudwatch_event_rule.periodic_tasks : index => rule.arn
  }
}
