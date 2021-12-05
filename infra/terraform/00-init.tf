provider "aws" {
    region = "us-east-1"
    profile = "default"
    # shared_credentials_file = "/Users/HP/.aws/creds"
}

resource "aws_vpc" "production-vpc" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_support   = true
  enable_dns_hostnames = true
}





