resource "aws_autoscaling_group" "my-app-asg" {
  name = "asg-app"

  desired_capacity = 2
  max_size         = 10
  min_size         = 2
  vpc_zone_identifier       = [aws_subnet.public-subnet-1.id, aws_subnet.public-subnet-2.id]

  target_group_arns = [
    aws_lb_target_group.app_target_group.arn
  ]

  health_check_grace_period = 60

  protect_from_scale_in = false

  launch_template {
    id      = aws_launch_template.react_frontend.id
    version = "$Latest"
  }

  tag {
    key                 = "sg"
    propagate_at_launch = true
    value               = "asg-app"
  }
}

resource "aws_autoscaling_policy" "scale_app" {
  name        = "requests_count_scaling_policy_frontend"
  policy_type = "TargetTrackingScaling"

  autoscaling_group_name = aws_autoscaling_group.my-app-asg.name

  target_tracking_configuration {
    predefined_metric_specification {
      predefined_metric_type = "ALBRequestCountPerTarget"
      resource_label = format("%s/%s", aws_lb.pubic_alb.arn_suffix, aws_lb_target_group.app_target_group.arn_suffix)
    }

    target_value = 30
  }
}
