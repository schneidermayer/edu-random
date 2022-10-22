#!/bin/bash

cd "`cygpath $devfolder`/inndevs-core/fleissaufgabe"

git pull


# commits
COMMITS=$(($RANDOM % 8 + 1))
echo " "
echo -e " \033[44m\033[37m creating $COMMITS commits \033[0m "
echo " "


rm ./*.java || true


for i in `seq $COMMITS`
do
	touch $(date '+%s-%N').java
	git add .
	git commit -m "adding file"
	git push
done


# open issues
ISSUES_TO_OPEN=$(($RANDOM % 25 + 1))
echo " "
echo -e " \033[44m\033[37m opening $ISSUES_TO_OPEN issues \033[0m "
echo " "
for i in `seq $ISSUES_TO_OPEN`
do
	gh issue create --assignee @me --body "Bitte fixen" --title "Bug in #$(($RANDOM % 9999 + 1))"
	# get the issue number


done



echo " "
echo -e " \033[44m\033[37m DONE :-) \033[0m "
echo " "

