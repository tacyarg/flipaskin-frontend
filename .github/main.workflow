workflow "Build Docker Image" {
  on = "push"
  resolves = ["Docker Registry", "Build Cointainer"]
}

action "Build Cointainer" {
  uses = "actions/docker/cli@c08a5fc9e0286844156fefff2c141072048141f6"
  args = "build -t tacyarg/flipaskin-frontend ."
}

action "Docker Registry" {
  uses = "actions/docker/login@c08a5fc9e0286844156fefff2c141072048141f6"
  needs = ["Build Cointainer"]
  secrets = ["DOCKER_USERNAME", "DOCKER_PASSWORD"]
}
