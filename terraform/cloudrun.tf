// Cloud Run Example

provider "google-beta" {
  project = var.project
}

# Variable
# variable "prefix" {
#   description = "the name prefix for load balancer resources"
#   type        = string
#   default = "backend-lb"
# }

# variable "domain" {
#   description = "The domain name of the load balancer."
#   type        = string
#   default = "backend.t4r0.me"
# }

# Cloud Run service and permissions

resource "google_cloud_run_service" "default" {
  name     = "cloudrun-backend"
  location = var.region
  project = var.project

  template {
    spec {
      containers {
        image = "gcr.io/cloudrun/hello"
      }
    }
  }
}

resource "google_cloud_run_service_iam_member" "member" {
  location = google_cloud_run_service.default.location
  project  = google_cloud_run_service.default.project
  service  = google_cloud_run_service.default.name
  role     = "roles/run.invoker"
  member   = "allUsers"
}

# # Load Balancing resources

# resource "google_compute_global_address" "default" {
#   name = "${var.prefix}-address"
# }

# resource "google_compute_global_forwarding_rule" "default" {
#   name   = "${var.prefix}-fwdrule"

#   target = google_compute_target_https_proxy.default.id
#   port_range = "80"
#   ip_address = google_compute_global_address.default.address
# }

# resource "google_compute_managed_ssl_certificate" "default" {
#   provider = google-beta

#   name = "${var.prefix}-cert"
#   managed {
#     domains = ["${var.domain}"]
#   }
# }

# resource "google_compute_backend_service" "default" {
#   name      = "${var.prefix}-backend"

#   protocol  = "HTTP"
#   port_name = "http"
#   timeout_sec = 30

#   backend {
#     group = google_compute_region_network_endpoint_group.cloudrun_neg.id
#   }
# }

# resource "google_compute_url_map" "default" {
#   name            = "${var.prefix}-urlmap"
#   default_service = google_compute_backend_service.default.id
# }

# resource "google_compute_target_https_proxy" "default" {
#   name   = "${var.prefix}-https-proxy"

#   url_map          = google_compute_url_map.default.id
#   ssl_certificates = [google_compute_managed_ssl_certificate.default.id]
# }

# resource "google_compute_region_network_endpoint_group" "cloudrun_neg" {
#   provider              = google-beta
#   name                  = "${var.prefix}-neg"
#   network_endpoint_type = "SERVERLESS"
#   region                = var.region
#   cloud_run {
#     service = google_cloud_run_service.default.name
#   }
# }

# HTTP-to-HTTPS resources

# resource "google_compute_url_map" "https_redirect" {
#   name            = "${var.prefix}-https-redirect"

#   default_url_redirect {
#     https_redirect         = true
#     redirect_response_code = "MOVED_PERMANENTLY_DEFAULT"
#     strip_query            = false
#   }
# }

# resource "google_compute_target_http_proxy" "https_redirect" {
#   name   = "${var.prefix}-http-proxy"
#   url_map          = google_compute_url_map.https_redirect.id
# }

# resource "google_compute_global_forwarding_rule" "https_redirect" {
#   name   = "${var.prefix}-fwdrule-http"

#   target = google_compute_target_http_proxy.https_redirect.id
#   port_range = "80"
#   ip_address = google_compute_global_address.default.address
# }

# Outputs

output "cloud_run_url" {
  value = element(google_cloud_run_service.default.status, 0).url
}

# output "load_balancer_ip" {
#   value = google_compute_global_address.default.address
# }