from flask import Flask
app = Flask(__name__)

import nltk
from nltk import FreqDist

nltk.download('gutenberg')
from nltk.corpus import gutenberg

    

@app.route("/")
def count_words():
    # Grab Sense and Sensibility; tokenize; get frequency distribution 
    tokens = gutenberg.words('austen-sense.txt')
    tokens = [word.lower() for word in tokens if word.isalpha()]
    fdist = FreqDist(tokens)

    # words and associated frequencies for 500 most common 
    common = fdist.most_common(500)
    words = []
    for word, frequency in common:
       words.append(word)
    words.sort()

    #html output; base on highest count, working down 
    highCount = common[0][1]

    html = "<html>" + \
              "<head>" + \
	          "<title>Word Cloud</title>" + \
	      "</head>" + \
	      "<body>" + \
	          "<h1>Most Common Words in Sense and Sensibility</h1>"
    
    for word in words: 
        size = str(int(15 + fdist[word] / float(highCount) * 150))
    colour = str(hex(int(0.8 * fdist[word]/float(highCount) * 256**3)))
    colour = colour[-(len(colour) - 2):]
    while len(colour) < 6:
	    colour = "0" + colour
    html = html + "<span style=\"font-size: " + size + \
	              "px; color: #" + colour + "\">" + \
		      word + "</span> "

    html = html + "</body>" + "</html>"
    return html 

if __name__ == "__main__":
    app.run()
