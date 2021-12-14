terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.27"
    }
  }

  required_version = ">= 0.14.9"

  backend "s3" {
    bucket = "terraform-state-recipe-manager"
    key    = "recipe-manager"
    region = "eu-west-2"
  }
}

provider "aws" {
  profile = "default"
  region  = "eu-west-2"
}

resource "aws_s3_bucket" "recipe_manager_deployment" {}
resource "aws_s3_bucket_object" "recipe_manager_deployment" {
  bucket = aws_s3_bucket.recipe_manager_deployment.bucket
  key    = "recipe_manager_deployment"
  source = "bundle.zip"
}

resource "aws_elastic_beanstalk_application" "recipe_manager" {
  name        = "Recipe Manager"
  description = "Created as an exercise for NextJS"
}

resource "aws_elastic_beanstalk_application_version" "recipe_manager_main" {
  name        = "recipe_manager_main"
  application = aws_elastic_beanstalk_application.recipe_manager.name
  bucket      = aws_s3_bucket.recipe_manager_deployment.id
  key         = aws_s3_bucket_object.recipe_manager_deployment.id
}

resource "aws_elastic_beanstalk_environment" "recipe_manager" {
  name                = "development"
  application         = aws_elastic_beanstalk_application.recipe_manager.name
  solution_stack_name = "64bit Amazon Linux 2 v5.4.8 running Node.js 14"
  version_label       = aws_elastic_beanstalk_application_version.recipe_manager_main.name
}

