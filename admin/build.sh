#!/bin/bash
set -e

commit_id=`git log -1 --pretty=format:"%h"`
tag=meedu-backend:$commit_id
dist=`pwd`/dist
echo "will build $tag to $dist"

rm -rf $dist
docker build ./ -t $tag

mkdir -p $dist
docker run --rm -v $dist:/app/meedu-backend/dist:rw $tag

echo "build success @ $dist"