#!/bin/bash
#
# send-alert-emails.sh - Triggers the github action to send alert emails for
# the specified snapshot.

set -o nounset
set -o errexit

CMD=$0

# Checks command-line arguments, sets variables, etc.
prepare () {
  # Parse args if specified.
  if [ $# -lt 1 ] || [ $# -gt 3 ]; then
    exit_with_usage
  else
    SNAPSHOT_ID=$1
    FIREBASE_ENV=${2:-dev}
    SEND_EMAILS=${3:-false}
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
  echo "Usage: $CMD <snapshot-id> [dev|staging|prod (default: dev)]"
  echo
  echo "Examples:"
  echo "$CMD 123            # Sends a dry one of alert emails for snapshot 123, using covidactnow-dev data."
  echo "$CMD 123 true       # Sends alert emails for snapshot 123, using covidactnow-dev data."
  echo "$CMD 123 prod true  # Sends alert emails for snapshot 123, using covidactnow-prod data."
  exit 1
}

execute () {
  curl -H "Authorization: token $GITHUB_TOKEN" \
      --request POST \
      --data "{\"event_type\": \"send-alert-emails\", \"client_payload\": { \"firebase_env\": \"${FIREBASE_ENV}\", \"snapshot_id\": \"${SNAPSHOT_ID}\" \"send_emails\": \"${SEND_EMAILS}\" } }" \
      https://api.github.com/repos/covid-projections/covid-projections/dispatches

  echo "Alerts sending requested. Go to https://github.com/covid-projections/covid-projections/actions to monitor progress."
}

prepare "$@"
execute
