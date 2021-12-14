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
  etag   = filemd5("bundle.zip")
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

data "aws_iam_policy_document" "instance-assume-role-policy" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["ec2.amazonaws.com"]
    }
  }
}

data "aws_iam_policy" "AWSElasticBeanstalkWebTier" {
  name = "AWSElasticBeanstalkWebTier"
}

resource "aws_iam_instance_profile" "instance_profile" {
  name = "RecipeManagerInstanceProfile"
  role = aws_iam_role.instance_profile.name
}

resource "aws_iam_role" "instance_profile" {
  name               = "RecipeManagerInstanceProfile"
  assume_role_policy = data.aws_iam_policy_document.instance-assume-role-policy.json
}

resource "aws_iam_role_policy_attachment" "instance_profile" {
  role       = aws_iam_role.instance_profile.name
  policy_arn = data.aws_iam_policy.AWSElasticBeanstalkWebTier.arn
}

resource "aws_elastic_beanstalk_environment" "recipe_manager" {
  name                = "development"
  application         = aws_elastic_beanstalk_application.recipe_manager.name
  solution_stack_name = "64bit Amazon Linux 2 v5.4.8 running Node.js 14"
  version_label       = aws_elastic_beanstalk_application_version.recipe_manager_main.name

  setting {
    namespace = "aws:autoscaling:launchconfiguration"
    name      = "IamInstanceProfile"
    value     = aws_iam_instance_profile.instance_profile.name
  }

  depends_on = [
    aws_iam_role_policy_attachment.instance_profile,
  ]
}

output "environment_id" {
  value = aws_elastic_beanstalk_environment.recipe_manager.id
}

output "version_label" {
  value = aws_elastic_beanstalk_application_version.recipe_manager_main.name
}

