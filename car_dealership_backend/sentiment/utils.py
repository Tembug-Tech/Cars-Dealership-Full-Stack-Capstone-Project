def analyze_sentiment(text):
    """
    Simple rule-based sentiment analysis.
    Returns: 'positive', 'negative', or 'neutral'
    """
    text = text.lower()
    
    positive_words = {
        'good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic', 
        'awesome', 'love', 'perfect', 'best', 'outstanding', 'brilliant',
        'superb', 'magnificent', 'delightful', 'happy', 'satisfied', 'impressed',
        'recommend', 'exceptional'
    }
    
    negative_words = {
        'bad', 'terrible', 'awful', 'horrible', 'worst', 'hate', 'dislike',
        'poor', 'worse', 'disappointed', 'disappointing', 'disgusted', 'angry',
        'useless', 'waste', 'broken', 'fail', 'failed', 'never', 'wrong',
        'issue', 'problem', 'complaint', 'unhappy'
    }
    
    positive_count = sum(1 for word in positive_words if word in text)
    negative_count = sum(1 for word in negative_words if word in text)
    
    if positive_count > negative_count:
        return 'positive'
    elif negative_count > positive_count:
        return 'negative'
    else:
        return 'neutral'
