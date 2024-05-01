terraform {
  backend "s3" {
    bucket = "spidercards-levelup-bucket"
    key = "spidercards/terraform.tfstate"  # Specify the path/key for your state file
    region = "eu-west-1"
  }
}