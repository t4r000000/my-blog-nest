data "google_project" "project" {}

resource "google_cloudbuild_trigger" "cloudrun-trigger" {
  github {
    owner = "ninginx"
    name="my-blog-nest"

    push {
      branch="master"
    }
  }

  # substitutions = {
  #   _FOO = "bar"
  #   _BAZ = "qux"
  # }

  filename = "cloudbuild.yaml"
}

//ここら辺なんで必要なのか理由描きたい
resource "google_project_iam_binding" "cloudbuild_add_runadmin" {

  role   = "roles/run.admin"
  members = [
    "serviceAccount:${data.google_project.project.number}@cloudbuild.gserviceaccount.com",
  ]
}

resource "google_project_iam_binding" "cloudrun_need_getIamAccessToken" {
  role   = "roles/run.serviceAgent"
  members = [
    "serviceAccount:service-${data.google_project.project.number}@serverless-robot-prod.iam.gserviceaccount.com",
  ]
}
//secret manger用のサービスアカウントを追加
resource "google_project_iam_binding" "cloudbuild_add_secretmanageraccessor" {

  role   = "roles/secretmanager.secretAccessor"
  members = [
    "serviceAccount:${data.google_project.project.number}@cloudbuild.gserviceaccount.com",
  ]
}


