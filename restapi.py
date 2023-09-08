from flask import Flask, request, jsonify

app = Flask(__name__)

# Initialize a variable to store the highest alphabet globally
highest_alphabet = None

@app.route('/api', methods=['GET', 'POST'])
def api():
    global highest_alphabet

    if request.method == 'GET':
        # GET method endpoint, just returns an operation_code
        return jsonify({"operation_code": "your_operation_code_here"})

    elif request.method == 'POST':
        try:
            data = request.get_json()
            user_id = data.get('user_id')
            college_email = data.get('college_email')
            roll_number = data.get('roll_number')
            numbers = data.get('numbers', [])
            alphabets = data.get('alphabets', [])

            # Calculate the highest alphabet in the input array of alphabets
            if alphabets:
                highest_alphabet = max(alphabets)

            response = {
                "status": "success",
                "user_id": user_id,
                "college_email": college_email,
                "roll_number": roll_number,
                "numbers": numbers,
                "alphabets": alphabets,
                "highest_alphabet": highest_alphabet
            }
            return jsonify(response), 200

        except Exception as e:
            return jsonify({"status": "error", "message": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
