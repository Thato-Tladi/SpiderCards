# Create a VPC
resource "aws_vpc" "spidercards_vpc" {
  cidr_block = var.VPC_CIDR
  enable_dns_support = true
  enable_dns_hostnames = true
}

#Internet gateway
resource "aws_internet_gateway" "gw" {
  vpc_id = aws_vpc.spidercards_vpc.id
}

#Route table
resource "aws_route_table" "route_table" {
  vpc_id = aws_vpc.spidercards_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.gw.id
  }
}

# Create Subnets
resource "aws_subnet" "subnet1" {
  vpc_id     = aws_vpc.spidercards_vpc.id
  cidr_block = var.PUB_SUB1_CIDR
  availability_zone = var.ZONE1
}

resource "aws_subnet" "subnet2" {
  vpc_id     = aws_vpc.spidercards_vpc.id
  cidr_block = var.PUB_SUB2_CIDR
  availability_zone = var.ZONE2
}

#Route table association
resource "aws_route_table_association" "route_table_asso" {
  subnet_id      = aws_subnet.subnet1.id
  route_table_id = aws_route_table.route_table.id
}

resource "aws_route_table_association" "route_table_asso1" {
  subnet_id      = aws_subnet.subnet2.id
  route_table_id = aws_route_table.route_table.id
} 

# Create a security group
resource "aws_security_group" "database_sg" {
  name        = "database-sg"
  description = "SQL server security group"

  ingress {
    from_port   = 1433
    to_port     = 1433
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 65535
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  vpc_id = aws_vpc.spidercards_vpc.id
}

# Elastic beanstalk security group
resource "aws_security_group" "spidercards-instance-sg" {
  name        = "webserver_sg"
  description = "Allow inbound SSH and HTTP traffic"
  vpc_id      = aws_vpc.spidercards_vpc.id

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    from_port   = 80
    to_port     = 8888
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    from_port   = 5000
    to_port     = 5000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
  tags = {
    Name = "Web-traffic"
  }
}

resource "aws_db_subnet_group" "sql_subnet_group" {
    name       = "sqlsubgroup"
    subnet_ids = [aws_subnet.subnet1.id, aws_subnet.subnet2.id]

    tags = {
        Name = "SQL server subnet group"
    }
}


# RDS SQL Server database instance
resource "aws_db_instance" "spidercards-rds" {
  allocated_storage = 20
  storage_type = "gp2"
  engine = "sqlserver-ex"
  instance_class = "db.t3.micro"
  username = jsondecode(data.aws_secretsmanager_secret_version.creds.secret_string)["username"]
  password = jsondecode(data.aws_secretsmanager_secret_version.creds.secret_string)["password"]
  skip_final_snapshot = true // required to destroy
  publicly_accessible= true
  identifier = "spidercards"
  multi_az = false
  db_subnet_group_name = aws_db_subnet_group.sql_subnet_group.name
  vpc_security_group_ids = [aws_security_group.database_sg.id]
}


#Application creation
resource "aws_elastic_beanstalk_application" "spidercards-beanstalk-app" {
  name        = "spidercards-application"
  description = "Spidercards application built on NodeJs"
}


#Environment creation
resource "aws_elastic_beanstalk_environment" "spidercards-elastic-beanstalk-env" {
  name                = "spidercards-env"
  application         = aws_elastic_beanstalk_application.spidercards-beanstalk-app.name
  solution_stack_name =  "64bit Amazon Linux 2023 v6.1.3 running Node.js 18"
  cname_prefix        = "spidercards-app"

  setting {
    namespace = "aws:ec2:vpc"
    name      = "VPCId"
    value     = aws_vpc.spidercards_vpc.id
  }

  setting {
    namespace = "aws:ec2:vpc"
    name      = "AssociatePublicIpAddress"
    value     = true
  }

  setting {
    namespace = "aws:autoscaling:launchconfiguration"
    name      = "IamInstanceProfile"
    value     = "aws-elasticbeanstalk-role"
  }

  setting {
    namespace = "aws:ec2:vpc"
    name      = "Subnets"
    value     = "${aws_subnet.subnet1.id},${aws_subnet.subnet2.id}"
  }

  setting {
    namespace = "aws:ec2:vpc"
    name      = "ELBSubnets"
    value     = "${aws_subnet.subnet1.id},${aws_subnet.subnet2.id}"
  }

  setting {
    namespace = "aws:elbv2:loadbalancer"
    name      = "SecurityGroups"
    value     = aws_security_group.spidercards-instance-sg.id
  }

  setting {
    namespace = "aws:elasticbeanstalk:application:environment"
    name      = "SERVER_PORT"
    value     = "5000"
  }

  setting {
    namespace = "aws:elasticbeanstalk:command"
    name      = "DeploymentPolicy"
    value     = "AllAtOnce"
  }

  setting {
    namespace = "aws:elasticbeanstalk:environment:process:default"
    name      = "MatcherHTTPCode"
    value     = "200"
  }

  depends_on = [aws_security_group.spidercards-instance-sg, aws_security_group.database_sg]
}

#Setting up resources for S3 static wbesite
# S3 bucket for frontend
resource "aws_s3_bucket" "spidercards_frontend" {
  bucket = "spidercards-frontend-${formatdate("YYYYMMDD", timestamp())}"

  tags = {
    Name        = "SpiderCards Frontend"
    Environment = "Production"
  }
}

# Enabling versioning on it
resource "aws_s3_bucket_versioning" "spidercards_versioning" {
  bucket = aws_s3_bucket.spidercards_frontend.id

  versioning_configuration {
    status = "Enabled"
  }
}

# Configuring it for static website hosting
resource "aws_s3_bucket_website_configuration" "spidercards_website_config" {
  bucket = aws_s3_bucket.spidercards_frontend.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "404.html"
  }
}

# Managing access settings
resource "aws_s3_bucket_public_access_block" "spidercards_access_block" {
  bucket = aws_s3_bucket.spidercards_frontend.id

  block_public_acls   = false
  block_public_policy = false
  ignore_public_acls  = false
  restrict_public_buckets = false
}

output "website_url" {
  description = "The website URL of the S3 bucket"
  value       = "http://${aws_s3_bucket.spidercards_frontend.bucket_regional_domain_name}"
}


#S3 Bucket to store images
resource "aws_s3_bucket" "spidercards-images" {
  bucket = "spidercards-images-${formatdate("YYYYMMDD", timestamp())}"
  #acl    = "public-read"

  tags = {
    Name        = "SpiderCards Images"
    Environment = "Production"
  }
}