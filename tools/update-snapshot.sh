#!/bin/bash
#
# update-snapshot.sh - Updates the website to a new data snapshot and
# regenerates summary files, etc.

set -o nounset
set -o errexit

CMD=$0

# Checks command-line arguments, sets variables, etc.
prepare () {
  # Parse args if specified.
  if [ $# -lt 1 ] || [ $# -gt 2 ]; then
    exit_with_usage
  else
    SNAPSHOT_ID=$1
    BRANCH=${2:-develop}
  fi

  if ! [[ $SNAPSHOT_ID =~ ^[0-9]+$ ]] ; then
    echo "Error: Specified Snapshot ID ($SNAPSHOT_ID) should be a plain number."
    echo
    exit_with_usage
  fi

  if [[ -z ${GITHUB_TOKEN:-} ]]; then
    echo "Error: GITHUB_TOKEN must be set to a personal access token. See:"
    echo "https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line"
    exit 1
  fi
}

exit_with_usage () {
  echo "Usage: $CMD <snapshot-id> [branch (default: develop)]"
  echo
  echo "Examples:"
  echo "$CMD 123                # Points the develop branch at snapshot 123."
  echo "$CMD 123 feature/abc    # Points the feature/abc branch at snapshot 123."
  exit 1
}

execute () {
  curl -H "Authorization: token $GITHUB_TOKEN" \
      --request POST \
      --data "{ \"ref\": \"${BRANCH}\", \"inputs\": { \"snapshot_id\": \"${SNAPSHOT_ID}\" } }" \
      https://api.github.com/repos/covid-projections/covid-projections/workflows/update-snapshot.yml/dispatches

  echo "Snapshot update requested. Go to https://github.com/covid-projections/covid-projections/actions to monitor progress."
}

prepare "$@"
execute
