terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.27"
    }
  }

  required_version = ">= 0.14.9"
}

provider "aws" {
  profile = "default"
  region  = "eu-west-2"
}

resource "aws_s3_bucket" "recipe_manager_deployment" {}
resource "aws_s3_bucket_object" "recipe_manager_deployment" {
  bucket = aws_s3_bucket.recipe_manager_deployment.bucket
  key    = "recipe_manager_deployment"
}

