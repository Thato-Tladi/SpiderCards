terraform {
  backend "s3" {
    bucket = "spidercards-levelup-bucket"
    key = "spidercards/terraform.tfstate"
    region = "eu-west-1"
  }
}