variable "project" {}
variable "region" {}
variable "zone" {}

provider "google" {
  project = var.project
  region  = var.region
  zone    = var.zone
}

resource "google_storage_bucket" "terraform-state-store" {
  name     = "t4r0-blog-terraform-state-bucket"
  location = "us-west1"
  storage_class = "REGIONAL"

  versioning {
    enabled = true
  }

  lifecycle_rule {
    action {
      type = "Delete"
    }
    condition {
      num_newer_versions = 5
    }
  }
}

terraform {
  backend "gcs" {
    bucket  = "t4r0-blog-terraform-state-bucket"
  }
}