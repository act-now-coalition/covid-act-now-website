git branch | grep "* main" > /dev/null
if [ $? -ne 0 ]
then
  echo "Branch is not main, aborting deploy" >&2
  exit
fi

git status | grep "nothing to commit" > /dev/null
if [ $? -ne 0 ]
then
  echo "Branch is dirty, aborting deploy" >&2
  exit
fi

yarn build
source creds.sh
aws s3 sync --acl public-read  build/ s3://covidactnow.org/
echo Done deploying
