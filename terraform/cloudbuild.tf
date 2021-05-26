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