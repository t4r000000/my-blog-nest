variable "aws_access_key" {}
variable "aws_secret_key" {}
variable "oidc_client_secret" {}

resource "google_secret_manager_secret" "aws-secret" {
  secret_id = "aws-secret"

  labels = {
    label = "aws"
  }

  replication {
    automatic = true
  }
}

resource "google_secret_manager_secret_version" "aws-secret-version" {
  secret = google_secret_manager_secret.aws-secret.id

  secret_data = var.aws_secret_key 
}

resource "google_secret_manager_secret" "aws-access" {
  secret_id = "aws-access"

  labels = {
    label = "aws"
  }

  replication {
    automatic = true
  }
}

resource "google_secret_manager_secret_version" "aws-access-version" {
  secret = google_secret_manager_secret.aws-access.id

  secret_data = var.aws_access_key
}

resource "google_secret_manager_secret" "oidc-client-secret" {
  secret_id = "oidc-client-secret"

  labels = {
    label = "oidc"
  }

  replication {
    automatic = true
  }
}

resource "google_secret_manager_secret_version" "oidc-client-secret-version" {
  secret = google_secret_manager_secret.oidc-client-secret.id

  secret_data = var.oidc_client_secret
}