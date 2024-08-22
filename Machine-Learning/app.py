from flask import Flask, jsonify
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
import pandas as pd
import requests
from flask_cors import CORS

app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

def fetch_products():
    response = requests.get('http://localhost:8080/product/')
    products = response.json()
    return pd.DataFrame(products)

def get_recommendations(product_id, df, tfidf_matrix):
    cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)
    idx = df[df['productId'] == product_id].index[0]
    sim_scores = list(enumerate(cosine_sim[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[1:10]  # Get top 3 recommendations
    product_indices = [i[0] for i in sim_scores]
    return df.iloc[product_indices]

@app.route('/recommend/<int:product_id>', methods=['GET'])
def recommend(product_id):
    df = fetch_products()
    tfidf = TfidfVectorizer(stop_words='english')
    tfidf_matrix = tfidf.fit_transform(df['description'])
    recommendations = get_recommendations(product_id, df, tfidf_matrix)
    return jsonify(recommendations.to_dict('records'))

if __name__ == '__main__':
    app.run(debug=True)