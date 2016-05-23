#Visualizing Twitter Verbal Abuse Speech
![alt text](https://raw.githubusercontent.com/yanyatong/yanyatong.github.io/master/screen.png )

![alt text](https://raw.githubusercontent.com/yanyatong/yanyatong.github.io/master/screen2.png )

**Authors**: Heng Wu ([flyingmeat](https://github.com/flyingmeat)), Sutong Feng ([Sutong92](https://github.com/Sutong92)), Yatong Yan ([yanyatong](https://github.com/yanyatong))

##Description
This visualization tool is mainly to monitor real time streaming data of tweets containing abusive keywords and then analyze them. By classifying our selected keywords into five categories, users can also view the abusive speech on twitter by group.There are also hashtags, associated words, live tweets content, bar charts of historical data and line charts of historical data. Through our tools we hope users can find some interesting points of twitter verbal abuse.


**Video**: https://vimeo.com/167394641

**Demo**: https://verbal-abuse-twitter.herokuapp.com/

**Document**: https://docs.google.com/document/d/1y57aaV9IRXpLmCcHHbF7ZWVV1FJ7pTr9ObZZ_OlpLMM/edit?usp=sharing

##Install instructions
###Requirements 
The systems has the following dependences:

1. **elasticsearch**: to https://www.elastic.co/downloads/elasticsearch 
2. **Nodejs 6+**: to https://nodejs.org/en/

###Running
1. Start the elasticsearch server: cd to elasticsearch's directory and run ./bin/elasticsearch
2. On the terminal run `node app.js`
3. Access `http://localhost:4000`

