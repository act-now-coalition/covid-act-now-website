#!/bin/bash
#
# deploy-s3.sh - Deploys the website to an S3 bucket, deploying files in the right order, and
# applying appropriate Cache-Control headers.

set -o nounset
set -o errexit
set -o xtrace

CMD=$0

# Checks command-line arguments, sets variables, etc.
prepare () {
  # Parse args if specified.
  if [ $# -ne 2 ]; then
    exit_with_usage
  else
    BUILD_DIR=$1
    S3_PATH=$2
  fi

  if [[ -z ${AWS_ACCESS_KEY_ID:-} || -z ${AWS_SECRET_ACCESS_KEY:-} ]]; then
    echo "Error: AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY must be set to valid S3 credentials."
    exit 1
  fi
}

exit_with_usage () {
  echo "Usage: $CMD <build-dir> <s3-path>"
  exit 1
}

execute () {
  # Increase concurrency since we're uploading tons of small files. Using 30 is ~2x as fast as the
  # default of 10, and I couldn't get consistent improvement experimenting with nearby values.
  aws configure set default.s3.max_concurrent_requests 30

  DEFAULT_OPTIONS="--acl public-read --no-progress"
  CP_CMD="aws s3 cp --region us-west-1 --recursive ${DEFAULT_OPTIONS} ${BUILD_DIR} ${S3_PATH}"

  # static/ files are immutable, so cache for a year.
  ${CP_CMD} --exclude "*" --include "static/*" \
      --cache-control "max-age=31536000"

  # CMS images can change but not super often, so cache for 1 day.
  ${CP_CMD} --exclude "*" --include "images_cms/*" \
      --cache-control "max-age=86400"

  # Copy anything else (excluding html files which are last) with default cache
  # settings (leave it to the browser)
  ${CP_CMD} --exclude "static/*" --exclude "images_cms/*" --exclude "*.html"

  # HTML files change multiple times a day and are small, so only cache for 5 minutes.
  # NOTE: We copy *.html files last so that everything referenced is live by the time the html is
  # updated, avoiding temporary site breakages after deploys.
  ${CP_CMD} --exclude "*" --include "*.html" \
      --cache-control "max-age=300"

  echo "Done."
  exit 0
}

prepare "$@"
execute
