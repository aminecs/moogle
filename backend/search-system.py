from flask import Flask
from flask import request
import os

app = Flask(__name__)

@app.route('/')
def hello_world():
	return 'Hello, World!'

def check_file_exists(filename):
	if os.path.exists(filename):
		append_write = 'a' # append if already exists
	else:
		append_write = 'w'
		with open("log.txt", append_write) as log_info:
			log_info.write("Timestamp, UserID, TaskID, TopicID, ActionID, ActionDescription, Comment\n")
		append_write = 'a'
	return append_write

def check_results_file_exists(filename):
    if os.path.exists(filename):
        append_write = 'a' # append if already exists
    else:
        append_write = 'w'
        with open("retrieved_results.txt", append_write) as retrieved_results:
            retrieved_results.write("Timestamp, UserID, TaskID, TopicID, Term, Title, URL\n")
        append_write = 'a'
    return append_write

def check_rt_file_exists(filename):
    if os.path.exists(filename):
        append_write = 'a' # append if already exists
    else:
        append_write = 'w'
        with open("reaction-time-stats.txt", append_write) as reaction_time_stats:
            reaction_time_stats.write("Timestamp, ActionID, ActionDescription\n")
        append_write = 'a'
    return append_write

@app.route('/postLogInfo', methods=['POST'])
def post_log_info():
    print (request.is_json)
    content = request.get_json()
    print (content)
    append_write = check_file_exists("log.txt")
    with open("log.txt", append_write) as log_info:
        log_info.write('"{}", "{}", "{}", "{}", "{}", "{}", "{}"\n'.format(content.get("Timestamp"), content.get("UserID"),  content.get("TaskID"),
                                                                     content.get("TopicID"), content.get("ActionID"), content.get("ActionDescription"), content.get("Comment")))
    return 'JSON posted'

@app.route('/postRetrievedResults', methods=['POST'])
def post_retrieved_results():
    print (request.is_json)
    content = request.get_json()
    print (content)
    append_write = check_results_file_exists("retrieved_results.txt")
    with open("retrieved_results.txt", append_write) as retrieved_results:
        for result in content.get("Results"):
            retrieved_results.write('"{}", "{}", "{}", "{}", "{}", "{}", "{}"\n'.format(content.get("Timestamp"), content.get("UserID"), content.get("TaskID"),
                                                                                  content.get("TopicID"), content.get("Term"), result.get("title"), result.get("formattedUrl")))
    return 'JSON posted'

@app.route('/postReactionTimeStats', methods=['POST'])
def post_reaction_time_stats():
    print (request.is_json)
    content = request.get_json()
    print (content)
    append_write = check_rt_file_exists("reaction-time-stats.txt")
    with open("reaction-time-stats.txt", append_write) as reaction_time_stats:
        reaction_time_stats.write('"{}", "{}", "{}"\n'.format(content.get("Timestamp"), content.get("ActionID"),  content.get("ActionDescription")))
    return 'JSON posted'

if __name__ == '__main__':
    app.run(threaded=True,host='0.0.0.0')