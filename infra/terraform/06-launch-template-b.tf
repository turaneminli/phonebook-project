resource "aws_launch_template" "nodejs_backend" {
    name = "backend-service"
    instance_type = "t2.micro"
    depends_on = [aws_db_instance.production]
    image_id = "ami-021d4c80b337fb883"
    instance_initiated_shutdown_behavior = "terminate"

    update_default_version = true


    network_interfaces {
        associate_public_ip_address = true

        security_groups = [
            aws_security_group.internet_interfacing_sg.id
            # aws_security_group.internal_sg.id
        ]
    }

    placement {
    availability_zone = "us-east-1a"
  }

    tag_specifications {
        resource_type = "instance"

        tags = {
            Name = "my-backend-app"
        }
    }

    user_data = filebase64("files/user_data.sh")
}

