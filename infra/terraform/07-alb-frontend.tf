resource "aws_lb" "pubic_alb" {
  name               = "public-alb"
  internal           = false
  load_balancer_type = "application"

  security_groups    = [
    aws_security_group.internet_interfacing_sg.id
  ]

  subnets = [
    aws_subnet.public-subnet-1.id, 
    aws_subnet.public-subnet-2.id
  ]

  enable_deletion_protection = false

  tags = {
    Name        = "alb-app"
    # Environment = "production"
  }
}


resource "aws_lb_listener" "http_frontend" {
  load_balancer_arn = aws_lb.pubic_alb.arn
  port = 80
  protocol = "HTTP"
  depends_on        = [aws_lb_target_group.app_target_group]

  default_action {
    type = "forward"
    target_group_arn = aws_lb_target_group.app_target_group.arn
  }

    # default_action {
    #     type = "fixed-response"

    #     fixed_response {
    #     content_type = "text/plain"
    #     message_body = "There's nothing here"
    #     status_code  = "404"
    #     }
    # }
}

resource "aws_lb_listener_rule" "my_app_listener_rule" {
  listener_arn = aws_lb_listener.http_frontend.arn

  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.app_target_group.arn
  }

  condition {
    host_header {
      values = ["myapp.example.com"]
    }
  }
}

resource "aws_lb_target_group" "app_target_group" {
  vpc_id = aws_vpc.production-vpc.id
  name     = "tg-app-frontend"
  port     = 80
  protocol = "HTTP"
}
