resource "aws_autoscaling_group" "my-app-asg-backend" {
  name = "asg-app-backend"

  desired_capacity = 2
  max_size         = 10
  min_size         = 2
  vpc_zone_identifier       = [aws_subnet.private-subnet-1.id, aws_subnet.private-subnet-2.id]

  target_group_arns = [
    aws_lb_target_group.app_target_group_backend.arn
  ]

  health_check_grace_period = 60

  protect_from_scale_in = false

  launch_template {
    id      = aws_launch_template.nodejs_backend.id
    version = "$Latest"
  }

  tag {
    key                 = "sg"
    propagate_at_launch = true
    value               = "asg-app"
  }
}

resource "aws_autoscaling_policy" "scale_app_backend" {
  name        = "requests_count_scaling_policy"
  policy_type = "TargetTrackingScaling"

  autoscaling_group_name = aws_autoscaling_group.my-app-asg-backend.name

  target_tracking_configuration {
    predefined_metric_specification {
      predefined_metric_type = "ALBRequestCountPerTarget"
      resource_label = format("%s/%s", aws_lb.backend_alb.arn_suffix, aws_lb_target_group.app_target_group_backend.arn_suffix)
    }

    target_value = 30
  }
}
