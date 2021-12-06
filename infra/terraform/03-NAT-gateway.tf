# Elastic IP
resource "aws_eip" "elastic-ip-nat-gw" {
  vpc                       = true
  associate_with_private_ip = "10.0.0.5"
  depends_on                = [aws_internet_gateway.production-igw]
}

# NAT gateway
resource "aws_nat_gateway" "nat-gw" {
  allocation_id = aws_eip.elastic-ip-nat-gw.id
  subnet_id     = aws_subnet.public-subnet-1.id
  depends_on    = [aws_eip.elastic-ip-nat-gw]
}
resource "aws_route" "nat-gw-route-1" {
  route_table_id         = aws_route_table.private-route-table.id
  nat_gateway_id         = aws_nat_gateway.nat-gw.id
  destination_cidr_block = "0.0.0.0/0"
}