git branch | grep "* master" > /dev/null
if [ $? -ne 0 ]
then
  echo "Branch is not master, aborting deploy" >&2
#  exit
fi

git status | grep "nothing to commit" > /dev/null
if [ $? -ne 0 ]
then
  echo "Branch is dirty, aborting deploy" >&2
#  exit
fi

yarn build
#source creds.sh
aws s3 sync --size-only --acl public-read  build/ s3://covid-actnow/
echo Done deploying
